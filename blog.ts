import * as path from "@std/path";
import * as fm from "@std/front-matter";
import * as fs from "@std/fs";
import { render } from "@tayzendev/gfm";
import RSS from "rss";
import { Sitemap } from "./sitemap.ts";
import MiniSearch from "minisearch";
import loadLanguages from "npm:prismjs@1.29.0/components/index.js";

loadLanguages(); // should load all language highlightings

function getMarkdown(fileName: string, postsFolder: string) {
  const postPath = path.join(postsFolder, fileName);
  let content: string;
  try {
    content = Deno.readTextFileSync(postPath);
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
    return "";
  }
  return content;
}

export function isPostsFolderEmpty(folder: string) {
  try {
    for (const _ of fs.expandGlobSync(path.join(folder, "[!_]*.md"))) {
      return false;
    }
    return true;
  } catch (e) {
    console.error("Error while opening folder:", folder, ":", e);
    return true;
  }
}

export function getArticles(
  postsFolder: string,
  routeBase?: string,
  defaultAuthors?: string[],
): Article[] {
  let postsNames: string[] = [];
  try {
    for (const entry of fs.expandGlobSync(path.join(postsFolder, "[!_]*.md"))) {
      postsNames = postsNames.concat(entry.name);
    }
  } catch (e) {
    console.error("Error while opening folder:", postsFolder, ":", e);
    return [];
  }

  const articles: Article[] = postsNames
    .map((name) => {
      return new Article(
        postsFolder,
        name.slice(0, -3),
        getMarkdown(name, postsFolder),
        routeBase,
        defaultAuthors,
      );
    })
    .filter((article) => article.content !== "");

  return articles.sort((a, b) => {
    if (a?.metadata?.date && b?.metadata?.date) {
      return b?.metadata?.date?.getTime() - a?.metadata?.date?.getTime();
    }
    return -1;
  });
}

export function filterArticlesFTS(
  articles: Article[],
  query: string,
): Article[] {
  if (!query) {
    return articles;
  }

  const tagQuery = query.startsWith("tag::");
  if (tagQuery) {
    const tag = query.slice("tags::".length - 1);
    return filterByTag(articles, tag);
  }

  const miniSearch = new MiniSearch({
    fields: ["title", "content", "tags"], // fields to index for full-text search
    storeFields: [], // fields to return with search results
    idField: "url",
  });

  const transformedArticles = articles.map((article) => {
    return {
      ...article,
      tags: article.metadata.tags?.join(" "),
    };
  });

  miniSearch.addAll(transformedArticles);
  const searchResult = miniSearch.search(query, { prefix: true });

  const result = searchResult.flatMap((articleResult) => {
    return articles.find((article) => article.url === articleResult.id) || [];
  });

  return result || [];
}

function filterByTag(articles: Article[], tag: string): Article[] {
  return articles.filter((article) => {
    return article.metadata.tags?.includes(tag);
  });
}

export function getRSS(baseUrl: string, articles: Article[]) {
  const feed = new RSS({
    title: "Tayzen's blog",
    description: "A blog about nerdy stuffs.",
    site_url: baseUrl,
    feed_url: new URL("rss.xml", baseUrl).href,
    language: "en",
    categories: ["Technology", "Programming", "Self-hosting"],
  });
  for (const article of articles) {
    feed.item({
      title: article.title,
      description: article.metadata.description,
      url: new URL(article.url, baseUrl).href,
      date: article.metadata.date,
      categories: article.metadata.tags,
      author: article.metadata.authors?.join(", "),
      custom_elements: [{ "content:encoded": article.htmlRss }],
    });
  }
  return feed.xml();
}

export function getSitemap(baseUrl: string, articles: Article[]) {
  const sitemap: Sitemap = new Sitemap(baseUrl);

  for (const article of articles) {
    sitemap.add(article.url, {
      changefreq: "weekly",
      priority: 1,
    });
  }
  sitemap.add("/", { changefreq: "daily", priority: 0.8 });

  return sitemap.sitemap;
}

export function getArticle(
  name: string,
  postsFolder: string,
  routeBase?: string,
  defaultAuthors?: string[],
): Article {
  const article = new Article(
    routeBase || postsFolder,
    name,
    getMarkdown(name + ".md", postsFolder),
    routeBase,
    defaultAuthors,
  );
  return article;
}

function estimateTimeReadingMinutes(
  markdownSimplified: string,
): number | string {
  return Math.round(markdownSimplified.split(" ").length / 250) || "< 1";
}

type MetadataProps = {
  title?: string;
  description?: string;
  author?: string | string[];
  authors?: string | string[];
  tag?: string | string[];
  tags?: string | string[];
  date?: Date;
  modificationDate?: Date;
  redirect?: string;
  preview?: string;
  section?: string;
  order?: number;
};

export class Metadata {
  title?: string;
  description?: string;
  authors?: string[];
  tags?: string[];
  date?: Date;
  modificationDate?: Date;
  redirect?: string;
  preview?: string;
  section?: string;
  order?: number;

  constructor(
    filePath: string,
    {
      title,
      description,
      authors,
      author,
      tags,
      tag,
      date,
      modificationDate,
      redirect,
      preview,
      section,
      order,
    }: MetadataProps,
    defaultAuthors?: string[],
  ) {
    let fileStats;
    try {
      fileStats = Deno.statSync(filePath);
    } catch {
      console.error(`File ${filePath} not found`);
    }
    this.title = title;
    this.description = description;

    const actualAuthors = authors || author || defaultAuthors;
    if (typeof actualAuthors === "string") {
      this.authors = [actualAuthors];
    } else {
      this.authors = actualAuthors;
    }

    const actualTags = tags || tag;
    if (typeof actualTags === "string") {
      this.tags = [actualTags];
    } else {
      this.tags = actualTags;
    }

    this.date = date || fileStats?.birthtime || undefined;
    this.modificationDate = modificationDate || fileStats?.mtime || undefined;
    this.redirect = redirect;
    this.preview = preview;
    this.section = section;
    this.order = order;
  }
}

function convertNameToLabel(name: string) {
  const nameWithoutStartingUnderscore = name.startsWith("_")
    ? name.slice(1)
    : name;
  const nameWithSpace = nameWithoutStartingUnderscore.split("_").join(" ");
  return nameWithSpace.charAt(0).toUpperCase() + nameWithSpace.slice(1);
}

type ClearedMarkdown = {
  body: string;
  title?: string;
};

function removingTitleFromMD(markdown: string): ClearedMarkdown {
  const titleRegex = /^# +\S+[\S ]*/m;
  const titleMatched = markdown.match(titleRegex);
  if (!titleMatched) {
    return { body: markdown };
  }
  const titlePosition = markdown.indexOf(titleMatched[0]);
  if (titlePosition === undefined || titlePosition < 0) {
    return { body: markdown };
  }
  return {
    title: titleMatched[0].substring(2),
    body: markdown.substring(titlePosition + titleMatched[0].length),
  };
}

type ParsedMarkdown = {
  metadata: Metadata;
  body: string;
  title?: string;
};

function parseMd(
  markdownData: string,
  filePath: string,
  defaultAuthors?: string[],
): ParsedMarkdown {
  if (fm.test(markdownData)) {
    const data = fm.extractYaml(markdownData);
    const { title, body } = removingTitleFromMD(data.body);
    return {
      metadata: new Metadata(
        filePath,
        data.attrs as MetadataProps,
        defaultAuthors,
      ),
      body: body.trim(),
      title,
    };
  }
  const metadata = new Metadata(filePath, {}, defaultAuthors);
  const { title, body } = removingTitleFromMD(markdownData);
  return {
    metadata,
    body: body.trim(),
    title,
  };
}

function customRender(text: string, noLinks: boolean = false) {
  return render(text, {
    disableHtmlSanitization: true,
    allowIframes: true,
    allowMath: true,
    youtubeHandling: "lite",
    mermaid: true,
    noLinks,
  });
}

function rssRender(text: string) {
  return render(text, {
    disableHtmlSanitization: true,
    allowIframes: true,
    allowMath: false,
    youtubeHandling: "link",
    githubSlugger: false,
    mermaid: false,
    alerts: false,
    svgCheckboxes: false,
  });
}

export class Article {
  name: string;
  title: string;
  content: string;
  preview: string;
  html: string;
  htmlRss: string;
  metadata: Metadata;
  url: string;
  timeToReadMinutes: number | string;

  constructor(
    postsFolder: string,
    name: string,
    content: string,
    routeBase: string = path.basename(postsFolder),
    defaultAuthors?: string[],
    title?: string,
    html?: string,
    metadata?: Metadata,
    timeToReadMinutes?: number | string,
  ) {
    const {
      metadata: parsedMetadata,
      body: cleanedContent,
      title: h1Title,
    } = parseMd(content, path.join(postsFolder, name + ".md"), defaultAuthors);

    this.metadata = metadata || parsedMetadata;
    this.name = name;
    this.content = content;
    this.title =
      title || this.metadata.title || h1Title || convertNameToLabel(name);
    this.preview = this.metadata.preview
      ? customRender(this.metadata.preview, true)
      : customRender(
          cleanedContent.length > 300
            ? cleanedContent.slice(0, 300) + "..."
            : cleanedContent,
          true,
        );
    this.html = html || customRender(cleanedContent);
    this.htmlRss = rssRender(`# ${this.title}\n\n` + cleanedContent);
    this.url = path.join("/", routeBase, this.name);
    this.timeToReadMinutes =
      timeToReadMinutes || estimateTimeReadingMinutes(cleanedContent);
  }
}
