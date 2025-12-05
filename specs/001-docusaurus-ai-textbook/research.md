# Research: Physical AI textbook website on Docusaurus

## Research 1: Best practices for Docusaurus project setup and configuration

*   **Decision:** The Docusaurus project will be initialized using the official Docusaurus CLI (`npx create-docusaurus@latest`). Key configuration will be managed in `docusaurus.config.js`, including plugin setup for custom CSS, static asset paths, and potentially theme overrides.
*   **Rationale:** Using the official CLI ensures a standardized, up-to-date project structure and leverages Docusaurus's built-in tooling for optimal performance and maintainability. Centralizing configuration simplifies project management.
*   **Alternatives considered:** Manual project setup (prone to errors and missing best practices), using older Docusaurus versions (might miss new features or performance improvements).

## Research 2: Best practices for implementing responsive layouts in Docusaurus with custom CSS

*   **Decision:** A mobile-first approach will be used for responsive design. Standard CSS media queries will be implemented within `docusaurus/src/css/responsive.css` to target the specified breakpoints: 320px (mobile), 768px (tablet), and 1024px (desktop).
*   **Rationale:** Mobile-first design ensures that the core user experience is optimized for smaller screens first, then progressively enhanced for larger viewports. Standard CSS media queries are a robust, widely supported, and performant method for achieving responsive layouts.
*   **Alternatives considered:** Using CSS frameworks (violates the "custom CSS only, no Tailwind" constraint), JavaScript-based responsive solutions (adds unnecessary complexity and potential performance overhead).

## Research 3: Integrating React components (Header, Footer, ThemeToggle) into Docusaurus

*   **Decision:** Custom React components for the Header, Footer, and ThemeToggle will be created and placed in `docusaurus/src/components/`. Docusaurus provides mechanisms for swizzling (overriding) default theme components or injecting custom components into layouts. These components will be integrated into the main Docusaurus layout (e.g., `docusaurus/src/theme/Layout/index.tsx`) or via MDX if appropriate.
*   **Rationale:** Docusaurus is built on React, allowing seamless integration of custom React components. Overriding default theme components provides full control over the website's structure and appearance while still benefiting from Docusaurus's core features.
*   **Alternatives considered:** Directly modifying Docusaurus's core theme files (makes upgrades difficult and is not a recommended practice), only using plain HTML/CSS (loses the benefits of React's component-based development).

## Research 4: Accessibility best practices for Docusaurus websites (WCAG 2.1 AA)

*   **Decision:** Adhere strictly to WCAG 2.1 AA guidelines during all stages of UI development. Key implementation areas will include:
    *   Using semantic HTML5 elements.
    *   Providing proper ARIA attributes for dynamic content and interactive elements.
    *   Ensuring sufficient color contrast (as detailed in the `005-custom-css-theme-system` research).
    *   Implementing full keyboard navigability for all interactive elements.
    *   Ensuring screen reader compatibility for all content and interactions.
    Automated accessibility auditing tools like Lighthouse and axe-core will be integrated into the development workflow.
*   **Rationale:** Ensures inclusivity, making the website usable by individuals with a wide range of disabilities. WCAG 2.1 AA compliance is a key quality standard and demonstrates commitment to a professional platform.
*   **Alternatives considered:** Implementing only basic accessibility features (insufficient for WCAG AA compliance), relying solely on manual testing (time-consuming and prone to human error).

## Research 5: Implementing client-side theme management with `localStorage` and `prefers-color-scheme` in Docusaurus/React

*   **Decision:** A custom React hook (e.g., `useTheme.ts`) will be implemented to manage the website's theme state. This hook will prioritize reading the user's explicit preference from `localStorage`. If no preference is found, it will default to the system's color scheme preference (`prefers-color-scheme`). A small, blocking JavaScript snippet (as identified in the `005-custom-css-theme-system` research for zero flicker) will be placed in the `<head>` of the HTML to apply the `data-theme` attribute to the `<html>` element before React hydrates the page.
*   **Rationale:** This approach provides robust, persistent, and flicker-free theme management, respecting user preferences while ensuring an immediate and consistent visual experience upon page load.
*   **Alternatives considered:** Applying theme after React component mounts (causes a visible flicker), relying solely on `prefers-color-scheme` (no user override), storing theme in cookies (more complex for this use case).

## Research 6: Performance optimization techniques for Docusaurus sites (Lighthouse > 90, FCP < 2s)

*   **Decision:** Implement standard web performance optimization techniques. This includes:
    *   Optimizing and compressing all images (using modern formats like WebP where possible).
    *   Lazy-loading non-critical images and components.
    *   Minifying CSS and JavaScript assets.
    *   Using efficient font loading strategies (e.g., `font-display: swap`).
    *   Leveraging Docusaurus's built-in optimizations for static site generation.
    Regular Lighthouse audits will be performed to track performance metrics and identify areas for improvement.
*   **Rationale:** Meets the explicit performance goals (Lighthouse > 90, FCP < 2s) outlined in the feature specification, providing a fast and smooth user experience.
*   **Alternatives considered:** Ignoring performance during development (leads to a slow, frustrating user experience), relying solely on Docusaurus defaults (may not be sufficient for the ambitious targets).

## Research 7: Integrating basic authentication system into Docusaurus (Placeholder until `006-oauth-authentication` is planned)

*   **Decision:** For the initial setup of the homepage, a placeholder UI for the user profile section will be implemented in the Header. The actual integration with a basic authentication system (e.g., using `signIn`/`signOut` functions) will be deferred until the `006-oauth-authentication` feature is fully planned and implemented. The `useTheme` hook might integrate with user preferences from the authentication system if it becomes available.
*   **Rationale:** This approach allows frontend UI development to proceed without being blocked by the more complex backend authentication implementation. It ensures a complete UI is present while clearly deferring the backend integration.
*   **Alternatives considered:** Implementing a custom basic authentication system for this feature (would duplicate effort and likely be replaced by Better-Auth later), omitting the user profile section entirely (violates feature specification).