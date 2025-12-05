# Implementation Plan: Physical AI textbook website on Docusaurus

**Branch**: `001-docusaurus-ai-textbook` | **Date**: 2025-12-04 | **Spec**: specs/001-docusaurus-ai-textbook/spec.md
**Input**: Feature specification from `specs/001-docusaurus-ai-textbook/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Develop the foundational Docusaurus website for the Physical AI textbook, including a responsive landing page, a functional header and footer with navigation, and an integrated theme toggle for dark and light modes. The styling will be implemented using custom CSS, replacing Tailwind, and adhering to high performance and accessibility standards. A basic authentication system will be integrated for user profile functionality.

## Technical Context

**Language/Version**: TypeScript (for Docusaurus components, ensuring type safety), JavaScript (for Docusaurus theme setup and browser APIs), CSS (for custom styling and theming).
**Primary Dependencies**: Docusaurus (framework for static site generation and content management), React (for UI components, including custom header, footer, theme toggle), `localStorage` API (browser native for theme preference persistence).
**Storage**: `localStorage` (for user's explicit theme preference persistence). This is client-side only for this feature.
**Testing**: Jest/React Testing Library (unit/component tests for React logic), Cypress/Playwright (end-to-end tests for UI interaction, navigation, theme toggling), Lighthouse (performance and accessibility audits), manual UI/UX testing across different browsers and devices.
**Target Platform**: Modern web browsers (desktop and mobile) running the Docusaurus application.
**Project Type**: Web application (Frontend focus).
**Performance Goals**: Lighthouse score > 90, First Contentful Paint (FCP) < 2 seconds, zero theme flicker on load/toggle, instant theme switching.
**Constraints**: WCAG 2.1 AA accessibility compliance, responsive layout at 320px, 768px, 1024px breakpoints, custom CSS only (no Tailwind), styling derived from `/design/homepage/code.html`.
**Scale/Scope**: Initial Docusaurus website setup, homepage, header, footer, site-wide theme system, basic authentication.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Quality Over Quantity**: Emphasizes high performance, comprehensive accessibility, and a polished, professional UI/UX, aligning with the "production-ready" code principle.
- [x] **AI-Native Development**: Development is guided by the AI-generated spec and will utilize AI tools (like Gemini CLI for content generation in later features) as part of the workflow.
- [x] **Pragmatic Excellence**: Focuses on establishing the core website foundation and crucial user experience elements (theming, navigation), which are essential for a demonstration-ready product.
- [x] **Zero-Cost Infrastructure**: Docusaurus website will be deployed on Vercel's free tier, aligning with the zero-cost principle.
- [x] **Demonstration-Ready**: Provides the primary user interface and foundational structure, which are key for showcasing the overall project.

**Constitution Alignment:** This feature aligns directly with the "Frontend & Documentation" section of the Technical Stack & Architecture (Docusaurus, Custom CSS, React, TypeScript, Vercel). It directly addresses Requirement 1 ("AI/Spec-Driven Book Creation") for professional typography, readability, mobile-responsive design, and fast load times. The integration of basic authentication is a deviation from the "Out of Scope" in the general constitution, but aligns with the updated feature specifications for "Authentication" in `006-oauth-authentication` and enhances the overall platform's capabilities.

## Project Structure

### Documentation (this feature)

```text
specs/001-docusaurus-ai-textbook/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
docusaurus/
├── src/
│   ├── components/
│   │   ├── Header/          # Header component (logo, nav, theme toggle, search, user profile)
│   │   │   ├── index.tsx
│   │   │   └── Header.module.css
│   │   ├── Footer/          # Footer component (links, social, copyright, privacy/terms)
│   │   │   ├── index.tsx
│   │   │   └── Footer.module.css
│   │   └── ThemeToggle/     # Theme toggle button React component
│   │       ├── index.tsx
│   │       └── ThemeToggle.module.css
│   ├── css/
│   │   ├── custom.css       # Global custom styles, CSS variables for theming (managed by 005-custom-css-theme-system)
│   │   ├── homepage.css     # Homepage specific styles (derived from /design/homepage/code.html)
│   │   ├── responsive.css   # Media queries for specified breakpoints
│   │   └── accessibility.css# Focus states, reduced motion styles (managed by 005-custom-css-theme-system)
│   ├── pages/
│   │   └── index.js         # Homepage implementation
│   └── hooks/
│       └── useTheme.ts      # Custom hook for theme management (localStorage, system preference, zero flicker logic)
├── static/
│   ├── img/                 # General images, `screen.png` references
│   └── designs/             # Original UI design references (e.g., /design/homepage/code.html)
├── docusaurus.config.js     # Docusaurus project configuration and plugin setup
├── package.json             # Project dependencies and scripts
└── README.md                # Docusaurus project README
```

**Structure Decision**: A web application structure focused on the `docusaurus/` frontend is chosen. Components for the header, footer, and theme toggle will reside in `docusaurus/src/components/` for modularity. CSS files are organized in `docusaurus/src/css/` as per the spec, leveraging the `005-custom-css-theme-system` feature for the custom CSS setup. The homepage implementation is in `docusaurus/src/pages/index.js`, and a custom hook for theme management is in `docusaurus/src/hooks/useTheme.ts`. Static assets, including design references, are kept in `docusaurus/static/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No direct violations of the constitution, as the deviations for authentication and theme system (making it core instead of nice-to-have) are aligned with overall project quality and competitive submission goals, as justified in their respective feature plans.
