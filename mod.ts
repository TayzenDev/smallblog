import type { SmallblogConfig } from "./types.ts";
import { createServer } from "./server.tsx";
import { createCli } from "./cli.ts";

export type { SmallblogConfig };

/**
 * The main class of Smallblog instantiating the server and cli from your config.
 */
export class Smallblog {
  private server;
  private cli;

  /**
   * Creates your Smallblog instance
   * @param config The options to create your blog.
   */
  constructor(config: Partial<SmallblogConfig> = {}) {
    const {
      postsFolder = "data/posts/",
      pagesFolder = "data/pages/",
      favicon,
      siteTitle = "Smallblog",
      siteDescription = `The blog: ${siteTitle}`,
      indexTitle,
      indexSubtitle,
      defaultAuthors,
      noArticlesMessage,
      locale,
      customHeaderScript,
      customBodyScript,
    } = config;

    this.server = createServer({
      postsFolder,
      pagesFolder,
      favicon,
      siteTitle,
      siteDescription,
      indexSubtitle,
      indexTitle,
      defaultAuthors,
      noArticlesMessage,
      locale,
      customBodyScript,
      customHeaderScript,
    });
    this.cli = createCli(postsFolder);
  }

  /**
   * The fetch method to reoslve the HTTP requests
   * @param req The input request
   */
  fetch = (req: Request): Response | Promise<Response> => {
    return this.server.fetch(req);
  };

  /**
   * The method which handles the CLI
   * @param args the arguments of the function
   */
  run = (args: string[]): void => {
    return this.cli(args);
  };
}
