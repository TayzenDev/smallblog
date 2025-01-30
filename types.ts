/**
 * The options to create your blog.
 */
export type SmallblogConfig = {
  /** The folder where your data (pages, images, etc...) are located (default: `data/`). Everything
   * inside this folder will correspond to a route because smallblog uses a file-based routing
   * pattern. */
  dataFolder: string;
  /** The folder where your posts are located (default: `posts/`). This path is relative to the data folder. */
  postsFolder: string;
  /** The path or URL to your favicon (default: empty). */
  favicon?: string;
  /** The configuration for the header of your blog */
  nav?: NavProps[];
  /** The title of your blog (default: `Smallblog`). */
  siteTitle: string;
  /** The description of your blog (default: `The blog: ${siteTitle}`). */
  siteDescription: string;
  /** The title of the index page (ex: `A blog about nothing`, no default). */
  indexTitle?: string;
  /** The subtitle of the index page (ex: `A nice demo of smallblog`, no default). */
  indexSubtitle?: string;
  /** The authors of the index page (ex: `["Tayzen"]`, empty list by default). */
  defaultAuthors?: string[];
  /** The message to display when there are no articles (ex: `Coming soon!`, default is a message
   * to help you starting). */
  noArticlesMessage?: string;
  /** The locale of your blog. */
  locale?: string;
  /** The script to add to the header of your blog. */
  customHeaderScript?: string;
  /** The script to add to the body of your blog. */
  customBodyScript?: string;
};

/**
 * The properties to add add an entry in the navbar of your site
 */
export type NavProps = {
  /** The name of the entry */
  name: string;
  /** The path of the entry */
  path: string;
};
