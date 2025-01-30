import { Smallblog } from "./mod.ts";

export default new Smallblog({
  nav: [
    {
      name: "Github",
      path: "https://github.com/Tayzendev/smallblog",
    },
    {
      name: "JSR",
      path: "https://jsr.io/@tayzendev/smallblog",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ],
  favicon: "favicon.ico",
  siteDescription:
    "A blog to demonstrate the capabilities of smallblog, the blog engine build for smallweb",
  siteTitle: "Smallblog demo",
  indexTitle: "A blog about nothing",
  indexSubtitle: "A nice demo of smallblog",
  defaultAuthors: ["Tayzen"],
  noArticlesMessage: "<h3>Coming soon!</h3>",
});
