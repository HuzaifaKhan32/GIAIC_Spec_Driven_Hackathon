# Research: Custom CSS Theme System - Dark & Light Mode

## Research 1: Best practices for extracting Tailwind classes from HTML and converting to custom CSS variables

*   **Decision:** The conversion process will involve a meticulous manual inspection of the provided `/design/*.html` files. For each unique Tailwind class identified, its corresponding CSS properties will be translated into standard CSS declarations. These properties will then be mapped to a system of CSS variables (e.g., `--color-bg-primary`, `--font-size-body`, `--spacing-md`). A semantic and consistent naming convention for these CSS variables will be established to enhance maintainability and readability across the codebase.
*   **Rationale:** Manual extraction guarantees precise control over the generated custom CSS, ensuring a pixel-perfect match to the design without carrying over any unused or redundant styles that might arise from automated tools. Defining a clear CSS variable system promotes reusability, simplifies theme management, and improves the clarity of the stylesheet.
*   **Alternatives considered:** Automated conversion tools for Tailwind to custom CSS (often produce verbose or less semantic CSS, potentially requiring significant post-processing), relying on Tailwind directly (violates the core feature requirement to replace Tailwind with custom CSS).

## Research 2: Strategies for creating an 'intelligent inverse' light theme from a dark theme color palette while maintaining WCAG AA contrast

*   **Decision:** The light theme color palette will be derived from the dark theme by initially applying color inversion techniques to primary background and text colors. This initial inversion will then be subject to careful manual fine-tuning to ensure the resulting colors are aesthetically pleasing, highly readable, and, most importantly, meet WCAG AA contrast ratio guidelines (minimum 4.5:1 for normal text, 3:1 for large text). Tools like WebAIM Contrast Checker will be used extensively for verification.
*   **Rationale:** A direct, purely mathematical color inversion often results in visually unappealing or inaccessible color combinations. An "intelligent inverse" approach balances design consistency with strict accessibility requirements, ensuring the light theme is as usable and professional as the dark theme.
*   **Alternatives considered:** Simple algorithmic color inversion without manual review (high risk of failing accessibility and poor aesthetics), developing a completely separate light theme color palette from scratch (doubles design and testing effort, risk of diverging from the dark theme's design language).

## Research 3: Implementing zero-flicker theme switching in Docusaurus using JavaScript and CSS variables

*   **Decision:** As established in prior research, a small, non-blocking JavaScript snippet will be strategically placed in the `<head>` section of the Docusaurus HTML, ensuring it executes as early as possible before the React application mounts. This script's responsibilities will include:
    1.  Reading the user's theme preference from `localStorage`.
    2.  If no `localStorage` preference is found, detecting the system's preferred color scheme (`prefers-color-scheme`).
    3.  Immediately applying the determined theme by setting the `data-theme="light/dark"` attribute on the `<html>` element.
*   **Rationale:** This pre-hydration, client-side approach ensures that the correct theme is applied to the DOM before the browser's paint cycle and before Docusaurus/React renders the page content. This effectively prevents the "flash of unstyled content" (FOUC) or a "flash of incorrect theme" that would otherwise occur.
*   **Alternatives considered:** Relying on Docusaurus's default theme logic (may not be customizable enough for a zero-flicker custom theme), applying the theme after React components mount (guarantees a visible flicker as the UI re-renders with the correct theme).

## Research 4: Integrating custom CSS files (global, component-specific, responsive, accessibility) within a Docusaurus project

*   **Decision:** Custom CSS files will be integrated into the Docusaurus project through its configuration (`docusaurus.config.js` or `src/css/index.css` via `@import`). The `src/css/custom.css` file (containing global variables and base styles) will be loaded first to establish the theme foundation. Specific component styles (e.g., for homepage, chapters, chatbot) will be loaded as separate stylesheets. Responsive and accessibility-specific CSS will be managed in dedicated files (`src/css/responsive.css`, `src/css/accessibility.css`) to maintain modularity and clarity.
*   **Rationale:** Docusaurus provides robust mechanisms for managing CSS, allowing for a modular and organized approach. This strategy ensures styles are loaded efficiently, promotes clear separation of concerns, and simplifies maintenance by grouping related styles.
*   **Alternatives considered:** Using a single monolithic CSS file (leads to poor organization and difficult maintenance), relying heavily on inline styles (difficult to theme and maintain consistency).

## Research 5: Techniques for implementing accessible focus states and respecting reduced motion preferences in custom CSS

*   **Decision:**
    *   **Focus States:** Implement clear and distinct visual focus states for all interactive elements (buttons, links, form inputs) using the `:focus-visible` pseudo-class. The focus indicator (e.g., `outline` property or a `box-shadow`) will be designed to contrast sufficiently with both dark and light themes, making it easily discernible.
    *   **Reduced Motion:** Utilize the `@media (prefers-reduced-motion: reduce)` CSS media query. Within this media query, all non-essential CSS `transition` and `animation` properties will be either disabled or significantly reduced (e.g., by setting `transition: none` or shortening durations) to accommodate users with vestibular disorders or motion sensitivities.
*   **Rationale:** Both visible focus states and respecting reduced motion preferences are critical requirements for WCAG 2.1 AA accessibility. Implementing these ensures a highly inclusive and comfortable user experience for all users.
*   **Alternatives considered:** Omitting clear focus states (a significant accessibility barrier for keyboard users), not addressing reduced motion preferences (can cause discomfort or physical symptoms for sensitive users).