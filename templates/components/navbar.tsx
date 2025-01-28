/** @jsxImportSource hono/jsx */

import type { FC } from "hono/jsx";
import RssIcon from "./rss.tsx";
import ExternalIcon from "./external.tsx";

type NavbarProps = {
  title: string;
  customPages?: { name: string; path: string; external: boolean }[];
};

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const { customPages = [] } = props;
  return (
    <navbar
      hx-preserve="true"
      class={customPages.length > 0 ? "navbar-with-pages" : ""}
    >
      <a href="/" class="navbar-home" hx-boost="false">
        {props.title}
      </a>

      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="hamburger">
        &#9776;
      </label>

      <ul class={"navbar-links"}>
        {customPages.map((page) => (
          <li>
            <a href={page.path}>
              {page.name}
              {page.external && <ExternalIcon />}
            </a>
          </li>
        ))}
        <li>
          <a href="/rss.xml" hx-boost="false">
            <RssIcon /> RSS
          </a>
        </li>
        <li>
          <button id="theme-toggle"></button>
        </li>
      </ul>
    </navbar>
  );
};
