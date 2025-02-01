/** @jsxImportSource hono/jsx */

import * as path from "@std/path";
import * as fs from "@std/fs";
import { contentType } from "@std/media-types";
import { compress } from "hono/compress";
import { type Context, Hono } from "hono";
import { Index } from "./templates/index.tsx";
import {
  filterArticlesFTS,
  getArticle,
  getArticles,
  getRSS,
  getSitemap,
  isPostsFolderEmpty,
} from "./blog.ts";
import { isDirectoryEmpty, isUrl } from "./utils.ts";
import { ArticlePage } from "./templates/article.tsx";
import { Articles } from "./templates/components/articles.tsx";
import { storeArticle } from "./article_generator.ts";
import { CustomPage } from "./templates/customPage.tsx";
import { ErrorPage } from "./templates/error.tsx";
import type { SmallblogConfig } from "./types.ts";

export function createServer(config: SmallblogConfig) {
  const server = new Hono();

  const faviconIsUrl = isUrl(config.favicon || "");

  const postsFolder = path.join(config.dataFolder, config.postsFolder);

  const customPages = config.nav?.map((entry, index) => {
    return {
      ...entry,
      external:
        entry.path.startsWith("http://") || entry.path.startsWith("https://"),
      order: index,
    };
  });

  server.use(compress());

  server.get("/", async (c) => {
    const page = c.req.query("page") || 1;
    const search = c.req.query("search") || "";
    const itemsPerPage = 5;
    const posts = getArticles(postsFolder, undefined, config.defaultAuthors);

    const filteredPosts = filterArticlesFTS(posts, search);

    const hxRequest = c.req.header("hx-request");
    const hxBoosted = c.req.header("hx-boosted");

    if (hxRequest && !hxBoosted) {
      return c.html(
        <Articles
          posts={filteredPosts}
          search={search}
          page={Number(page)}
          itemsPerPage={itemsPerPage}
        />,
        200,
        {
          "HX-Push-Url": search ? "/?page=1&search=" + search : "/?page=1",
        },
      );
    }

    return c.html(
      `<!DOCTYPE html>` +
      (
        <Index
          posts={filteredPosts}
          page={Number(page)}
          itemsPerPage={itemsPerPage}
          search={search}
          siteTitle={config.siteTitle}
          indexTitle={config.indexTitle}
          indexSubtitle={config.indexSubtitle}
          url={c.req.url}
          locale={config.locale}
          description={config.siteDescription}
          noArticlesMessage={await getNoArticlesMessage(config)}
          noPosts={isPostsFolderEmpty(postsFolder)}
          bodyScript={config.customBodyScript}
          headScript={config.customHeaderScript}
          favicon={!!config.favicon}
          faviconLink={faviconIsUrl ? config.favicon : undefined}
          customPages={customPages}
        />
      ),
    );
  });

  server.get("/rss.xml", (c) => {
    const baseUrl = getBaseUrl(c);
    const articles = getArticles(postsFolder, undefined, config.defaultAuthors);
    const xml = getRSS(baseUrl, articles);
    return new Response(xml, {
      headers: {
        "content-type": "application/xml",
      },
    });
  });

  server.get("/sitemap.xml", (c) => {
    const baseUrl = getBaseUrl(c);
    const articles = getArticles(postsFolder, undefined, config.defaultAuthors);
    const xml = getSitemap(
      baseUrl,
      articles
        .map((e) => e.url)
        .concat(
          customPages?.filter((e) => !e.external).map((e) => e.path) || [],
        ),
    );
    if (xml) {
      return new Response(xml, {
        headers: {
          "content-type": "application/xml",
        },
      });
    }
    return new Response("Not found", { status: 404 });
  });

  server.get("/robots.txt", (c) => {
    const baseUrl = getBaseUrl(c);
    const robotTxt = `
      User-agent: *
      Sitemap: ${new URL("/sitemap.xml", baseUrl).href}
      `
      .replace(/  +/g, "")
      .trim();
    return new Response(robotTxt, {
      headers: {
        "content-type": "text/plain",
      },
    });
  });

  server.on("GET", ["/favicon", "/favicon.ico"], () => {
    return serveStaticFile(config.favicon);
  });

  server.get("/init", async (c) => {
    fs.ensureDirSync(postsFolder);
    if (await isDirectoryEmpty(postsFolder)) {
      storeArticle(postsFolder, "first-article.md", {
        title: "My first article",
      });
    }

    return c.redirect("/");
  });

  server.get("/:filename{.+$}", (c) => {
    const filename = c.req.param("filename");

    if (!filename) {
      // if the route is /
      return new Response("Not found", { status: 404 });
    }
    if (path.extname(filename)) {
      // if the name contains an ext this is not an article
      return serveStaticFile(filename, config.dataFolder);
    }

    const basename = path.basename(filename);
    const dirname = path.dirname(filename);
    const matchingFolder = path.join(config.dataFolder, dirname);

    return servePage(
      c,
      basename,
      matchingFolder,
      faviconIsUrl,
      customPages,
      config,
      path.resolve(matchingFolder) === path.resolve(postsFolder) ||
        matchingFolder === postsFolder,
    );
  });

  server.onError((err, c) => {
    console.error(err);
    return c.html(
      `<!DOCTYPE html>` +
      (
        <ErrorPage
          errorNumber={typeof err.cause === "number" ? err.cause : 500}
          errorMessage={err.message}
          siteTitle={config.siteTitle}
          url={c.req.url}
          locale={config.locale}
          bodyScript={config.customBodyScript}
          headScript={config.customHeaderScript}
          favicon={!!config.favicon}
          faviconLink={faviconIsUrl ? config.favicon : undefined}
          customPages={customPages}
        />
      ),
    );
  });

  server.notFound((c) => {
    return c.html(
      `<!DOCTYPE html>` +
      (
        <ErrorPage
          errorNumber={404}
          errorMessage="Not found"
          siteTitle={config.siteTitle}
          url={c.req.url}
          locale={config.locale}
          bodyScript={config.customBodyScript}
          headScript={config.customHeaderScript}
          favicon={!!config.favicon}
          faviconLink={faviconIsUrl ? config.favicon : undefined}
          customPages={customPages}
        />
      ),
    );
  });

  return server;
}

function getBaseUrl(c: Context): string {
  return new URL(c.req.url).origin;
}

function servePage(
  c: Context,
  name: string,
  folder: string,
  faviconIsUrl: boolean,
  customPages: { name: string; path: string; external: boolean }[] = [],
  opts: SmallblogConfig,
  article: boolean = true,
) {
  const {
    siteTitle = "Smallblog",
    locale,
    customHeaderScript,
    customBodyScript,
    favicon,
    defaultAuthors,
  } = opts;

  const page = getArticle(name, folder, undefined, defaultAuthors);
  const renderedPage = page.html;

  if (!renderedPage) {
    throw new Error("File not found", { cause: 404 });
  }

  if (article) {
    return c.html(
      `<!DOCTYPE html>` +
      (
        <ArticlePage
          article={page}
          siteTitle={siteTitle}
          url={c.req.url}
          locale={locale}
          bodyScript={customBodyScript}
          headScript={customHeaderScript}
          favicon={!!favicon}
          faviconLink={faviconIsUrl ? favicon : undefined}
          customPages={customPages}
        />
      ),
    );
  }
  return c.html(
    `<!DOCTYPE html>` +
    (
      <CustomPage
        article={page}
        siteTitle={siteTitle}
        url={c.req.url}
        locale={locale}
        bodyScript={customBodyScript}
        headScript={customHeaderScript}
        favicon={!!favicon}
        faviconLink={faviconIsUrl ? favicon : undefined}
        customPages={customPages}
      />
    ),
  );
}

function serveStaticFile(name?: string, folder?: string) {
  if (!name) {
    throw new Error("File not found", { cause: 404 });
  }
  try {
    let file;
    if (folder) {
      file = Deno.readFileSync(path.join(folder, name));
    } else {
      file = Deno.readFileSync(name);
    }
    return new Response(file, {
      headers: {
        "content-type":
          contentType(name.substring(name.lastIndexOf("."))) ||
          "application/octet-stream",
      },
    });
  } catch {
    throw new Error("File not found", { cause: 404 });
  }
}

async function getNoArticlesMessage(opts: SmallblogConfig) {
  const { noArticlesMessage, postsFolder } = opts;

  if (noArticlesMessage) {
    return noArticlesMessage;
  }

  const baseMessage = `<p>You have no articles yet, you can add them by creating a folder <code>${postsFolder}</code> and adding markdown files in it.</p><p>Read the README for more informations.</p>`;

  const writePermission = await Deno.permissions.query({
    name: "write",
    path: postsFolder,
  });

  if (writePermission.state === "granted") {
    return (
      baseMessage +
      `<p><a class="button" href="/init">Let smallblog do it for you!</a></p>`
    );
  }

  return baseMessage;
}
