/** @jsxImportSource hono/jsx */

import { html } from "hono/html";

export const style = html`
  <style>
    :root {
      --color-text: #bfc7d5;
      --color-caution-alert: #ff5263;
    }

    main {
      max-width: 820px;
      margin: 0 auto;
      padding-left: 10px;
      padding-right: 10px;
    }

    navbar {
      display: flex;
      flex-wrap: wrap;
      -moz-column-gap: 1rem;
      column-gap: 1rem;
      row-gap: 1rem;
      justify-content: space-between;
      padding: 2rem min(5vw, 5rem);
      align-items: center;
      font-family: "Courier New", Courier, monospace;
      font-weight: 300;
    }

    .navbar-links {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      -moz-column-gap: 1.5rem;
      column-gap: 1.5rem;
      align-items: center;
    }

    navbar a {
      text-decoration: none;
      color: var(--color-fg-default);
    }

    navbar a:hover {
      color: var(--color-fg-muted);
    }

    navbar svg {
      height: 0.75rem;
      margin-right: -8px;
      color: var(--color-fg-muted);
    }

    navbar .menu-toggle {
      display: none;
    }

    navbar .hamburger {
      display: none;
      font-size: 1.5rem;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    @media (max-width: 768px) {
      .navbar-with-pages .navbar-links {
        display: flex;
        flex-direction: column;
        width: 100%;
        list-style: none;
        gap: 1rem;
        overflow: hidden;
        max-height: 0;
        transition: max-height 0.3s ease-out;
      }

      .navbar-with-pages .navbar-links > li {
        width: 100%;
        text-align: right;
      }

      .navbar-with-pages .menu-toggle:checked ~ .navbar-links {
        max-height: 500px;
        transition: max-height 0.3s ease-in;
      }

      .navbar-with-pages .menu-toggle:checked + .hamburger + .navbar-links {
        display: flex;
      }

      .navbar-with-pages .hamburger {
        display: block;
      }

      .navbar-with-pages .menu-toggle:checked ~ .hamburger {
        transform: rotate(-90deg);
      }
    }

    .page-header {
      margin-bottom: var(--row-gap-medium);

      & > p:first-child {
        margin-top: 0;
      }
    }

    .article-header {
      margin-bottom: var(--row-gap-medium);
      text-align: center;
      margin-bottom: 3em;
      margin-top: 1.5em;
    }

    .title {
      border: none;
      font-size: 2.5em;
      font-family: lato;
    }

    .markdown-body {
      margin-bottom: 50px;
      background-color: inherit;
      color: inherit;
    }

    .markdown-body h1 {
      border: none;
    }

    .markdown-body h2 {
      border: none;
    }

    .index-header {
      text-align: center;
      margin-bottom: 3em;
      margin-top: 1.5em;
    }

    .index-title {
      font-size: 2.5em;
      font-weight: bold;
      font-family: lato;
    }

    .index-subtitle {
      font-size: 1.5em;
      width: 80%;
      margin: 0 auto;
      font-family: lato;
      font-weight: 300;
      color: var(--color-fg-muted);
    }

    .search-container {
      display: flex;
      align-items: center;
      width: 75%;
      border: 1px solid var(--color-fg-muted);
      border-radius: 0.5em;
      background-color: #2b2f42;
      padding: 14px;
      transition: all 0.3s ease;
      margin: 0 auto;
      margin-bottom: 4em;
      color: var(--color-text);
    }

    .search-icon {
      width: 16px; /* Adjust width */
      height: 16px; /* Adjust height */
      margin-right: 8px;
    }

    .search-field {
      display: block;
      outline: none;
      border: none;
      background-color: inherit;
      font-size: 1.1em;
      color: var(--color-text);
      width: 100%;
    }

    .search-field::placeholder {
      color: #7b8092;
    }

    .delete-button {
      display: none;
      background: none;
      border: none;
      color: var(--color-fg-muted);
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      margin-left: 8px;
    }

    .delete-button:hover {
      color: var(--color-fg-default);
    }

    .search-field:not(:placeholder-shown) + .delete-button {
      display: block;
    }

    .search-container:hover {
      border: 4px double var(--color-fg-muted);
      padding: 11px;
    }

    .search-container:focus-within {
      border: 4px double var(--color-fg-muted);
      outline: none;
      background-color: var(--color-bg-default);
      padding: 11px;
    }

    .no-articles {
      max-width: 500px;
      text-align: center;
      margin: auto;
      margin-top: 15vh;
      font-size: 1em;
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Noto Sans,
        Helvetica,
        Arial,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji;
    }

    .no-articles .button {
      display: block;
      max-width: 300px;
      height: 25px;
      background: #4c527d;
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      color: var(--color-text);
      font-weight: bold;
      line-height: 25px;
      margin: auto;
      margin-top: 30px;
      box-shadow:
        0 4px 8px rgba(0, 0, 0, 0.2),
        0 2px 4px rgba(0, 0, 0, 0.15);
      transition:
        box-shadow 0.3s ease,
        transform 0.2s ease;
      cursor: pointer;
      text-decoration: none;
    }

    .no-articles .button:hover {
      box-shadow:
        0 8px 16px rgba(0, 0, 0, 0.25),
        0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre plus intense au survol */
      transform: translateY(-2px); /* Effet de levée */
    }

    .no-articles .button:active {
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.15),
        0 1px 2px rgba(0, 0, 0, 0.1); /* Ombre plus discrète au clic */
      transform: translateY(1px); /* Enfoncement léger */
    }

    .articles-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(5px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .fade-in {
      opacity: 0;
      animation: fadeInUp 1s ease forwards;
    }

    .article-element {
      width: 100%;
      margin-bottom: 2em;
      color: var(--color-text);
    }

    .animated-article {
      display: block;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    }

    .animated-article:hover {
      transform: scale(1.02);
    }

    .animated-article:active {
      transform: scale(0.98);
      transition: transform 0.1s ease;
    }

    .article-element hr {
      margin-top: 3em;
      width: 75%;
      color: rgba(132, 141, 151, 0.1);
      border-color: rgba(132, 141, 151, 0.1);
      background-color: rgba(132, 141, 151, 0.1);
    }

    .article-title {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 0em;
      margin-top: 0;
      font-family: lato;
    }

    .article-preview {
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Noto Sans,
        Helvetica,
        Arial,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji;
      margin: 0;
      font-weight: 300;
    }

    .article-element a {
      /* color: var(--color-fg-muted); */
      color: var(--color-text);
      text-decoration: none;
    }

    .article-element a:hover .article-title {
      color: var(--color-fg-muted);
    }

    .article-element p {
      margin-top: 5px;
      margin-bottom: 5px;
    }

    .metadata span {
      margin-right: 0.5em;
      font-style: italic;
      color: #999aa5;
    }

    .metadata span::after {
      margin-left: 0.5em;
      content: "•";
    }

    .metadata span:last-child::after {
      content: "";
      margin-left: 0em;
    }

    .tags .tag::after {
      content: "";
      margin-left: 0em;
    }

    .tags .tag {
      font-family: monospace;
      font-style: normal;
      font-size: 1.1em;
      font-weight: 500;
    }

    .tags .tag::before {
      content: "#";
    }

    .article-element .tags {
      color: #999aa5;
      margin-top: 0.3em;
      display: inline-block;
    }

    .article-element .tags-label {
      margin-right: 0.5em;
      font-family: lato;
      font-size: 1.05em;
    }

    .article-element .tags .tag {
      font-size: 1.2em;
      margin-right: 0.6em;
      color: #999aa5;
      text-decoration: underline;
    }

    .metadata a {
      color: #999aa5;
    }

    .animated-anchor:hover {
      color: var(--color-fg-muted);
    }

    .animated-anchor {
      display: inline-block;
      transition: transform 0.1s ease;
    }

    .animated-anchor:hover {
      transform: scale(1.04);
    }

    .animated-anchor:active {
      transform: scale(0.98);
      transition: transform 0.1s ease;
    }

    .non-tag-metadata {
      font-family: lato;
      font-size: 0.9em;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2em;
      margin-bottom: 3em;
      font-size: 1.2em;
      font-weight: bold;
      font-family: lato;
    }

    .pagination-previous {
      margin-right: 0.5em;
      color: var(--color-text);
    }

    .pagination-next {
      margin-left: 0.5em;
      color: var(--color-text);
    }

    .markdown-body blockquote {
      color: #999aa5;
      border-left: 0.25em solid #999aa5;
      padding: 0 1em;
    }

    .markdown-body ul:has(li[role="checkbox"]) {
      list-style-type: none;
      padding-left: 1em;
    }

    .markdown-body li[role="checkbox"] label {
      display: flex;
      align-items: center;
      gap: 0.4em; /* Space between the icon and text */
    }

    .markdown-body li[role="checkbox"] svg {
      width: 1.1em;
      height: 1.1em;
      vertical-align: sub;
    }

    .markdown-body table {
      border-collapse: collapse;
      color: #d1d2e2;
      border-radius: 6px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    }

    .markdown-body th,
    .markdown-body td {
      padding: 12px;
      text-align: left;
      border: 1px solid #2a2b3a;
    }

    .markdown-body th {
      background-color: #4c527d;
      font-weight: bold;
      color: #ffffff;
    }

    .markdown-body tr:nth-child(even) td {
      background-color: #3e415f;
    }

    .markdown-body tr:nth-child(odd) td {
      background-color: #2a2d40;
    }

    .markdown-body tr:hover td {
      background-color: #505377;
    }

    p:has(img) {
      text-align: center;
    }

    .markdown-body .mermaid svg {
      display: block;
      margin: 0 auto;
    }

    .octicon-link {
      fill: #bfc7d5;
    }

    .markdown-body .copy-code-button {
      position: absolute;
      top: 10px;
      right: 15px;
      z-index: 10;
      border: none;
      padding: 5px;
      border-radius: 5px;
      background-color: #161b22;
      white-space: normal;
      cursor: pointer;
      color: var(--color-fg-muted);
    }

    .markdown-body .copy-code-button:hover {
      background-color: #262c36;
    }

    .markdown-body .highlight:has(.copy-code-button) {
      position: relative;
    }

    .markdown-body .highlight pre {
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    }

    .markdown-body img {
      background-color: inherit;
      border-radius: 6px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
      max-width: min(100%, 600px);
      margin: 10px auto;
    }

    .markdown-body p:has(video) {
      text-align: center;
    }

    .markdown-body .youtube-embed {
      border-radius: 6px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
      display: block;
      margin: 0 auto;
      max-width: 650px;
      aspect-ratio: 16 / 9;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-color: black;
    }

    .markdown-body video {
      border-radius: 6px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    }

    .markdown-body
      .markdown-alert.markdown-alert-caution
      .markdown-alert-title {
      color: var(--color-caution-alert);
    }

    .markdown-body .markdown-alert.markdown-alert-caution {
      border-left-color: var(--color-caution-alert);
    }

    .markdown-body a[data-footnote-backref] {
      text-decoration: none;
    }
  </style>
`;
