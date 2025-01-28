import { html } from "hono/html";

export const scriptAddCodeCopyButton = html`<script defer>
  document.addEventListener("htmx:load", () => {
    document
      .querySelectorAll(".markdown-body .highlight")
      .forEach((divElement) => {
        // SVG icons
        const copyIcon = \`
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>\`;

        const checkIcon = \`
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>\`;

        // Create the copy button
        const button = document.createElement("button");
        button.classList.add("copy-code-button");
        button.setAttribute("aria-label", "copy to clipboard");
        button.innerHTML = copyIcon;

        divElement.append(button);

        // Copy functionality with icon switch and animation
        button.addEventListener("click", () => {
          // Filter out the button text and copy only the code
          const codeText = Array.from(divElement.childNodes)
            .filter((node) => node !== button)
            .map((node) => node.textContent || "")
            .join("")
            .trim();

          navigator.clipboard.writeText(codeText).then(() => {
            // Change to check icon
            button.innerHTML = checkIcon;

            // Revert to copy icon after a delay
            setTimeout(() => {
              button.innerHTML = copyIcon;
            }, 1500);
          });
        });
      });
  });
</script>`;

export const scriptThemeSwitch = html`<script type="module">
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;
  console.log("body:", body);

  toggleButton.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-color-mode");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute("data-color-mode", newTheme);

    // Save the preference to localStorage
    localStorage.setItem("theme", newTheme);
  });

  // Load theme from localStorage on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.setAttribute("data-color-mode", savedTheme);
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    document.body.setAttribute(
      "data-color-mode",
      prefersDark ? "dark" : "light",
    );
  }
</script>`;
