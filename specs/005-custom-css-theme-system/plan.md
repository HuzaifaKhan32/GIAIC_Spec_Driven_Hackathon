# Implementation Plan: Custom CSS Theme System - Dark & Light Mode

**Branch**: `005-custom-css-theme-system` | **Date**: 2025-12-04 | **Spec**: specs/005-custom-css-theme-system/spec.md
**Input**: Feature specification from `specs/005-custom-css-theme-system/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a custom CSS theme system for the Docusaurus-based book website, supporting both dark and light modes. This involves replacing Tailwind CSS with custom, hand-written CSS, extracting styles from design HTML files, defining CSS variables, ensuring theme persistence via `localStorage`, respecting system preferences, and guaranteeing a zero-flicker experience on page reloads and theme changes. The system will also ensure accessibility and responsiveness.

## Technical Context

**Language/Version**: TypeScript (for Docusaurus React components that will use the CSS variables), CSS (for styling and theme definitions).
**Primary Dependencies**: Docusaurus (for content rendering and theme integration), `localStorage` API (browser native for persistence).
**Storage**: `localStorage` (for user's explicit theme preference persistence).
**Testing**: Browser-based UI testing (manual visual inspection across themes and breakpoints), automated accessibility tools (e.g., Lighthouse, axe-core for WCAG AA compliance), manual keyboard navigation testing, performance testing (Lighthouse for page load/flicker).
**Target Platform**: Modern web browsers (desktop and mobile) running the Docusaurus application.
**Project Type**: Web application (Frontend styling and theme management).
**Performance Goals**: Zero theme flicker on load/toggle, instant theme switching, fast initial page load times (<2s from constitution).
**Constraints**: WCAG AA contrast ratio (4.5:1 minimum), responsive at 320px, 768px, 1024px breakpoints, complete extraction of styles from existing `/design/*.html` files to custom CSS.
**Scale/Scope**: Site-wide custom CSS theme system affecting homepage, chapter pages, and chatbot UI, providing a consistent visual experience.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Quality Over Quantity**: This feature prioritizes robust, pixel-perfect styling, comprehensive accessibility, and a polished user experience, moving away from utility-first frameworks like Tailwind for greater control. This aligns with delivering "production-ready" code and a "professional" aesthetic.
- [x] **AI-Native Development**: The specification and plan generation for this feature are AI-assisted, demonstrating the AI-driven development approach. The custom CSS implementation itself, while manual, is guided by an AI-generated spec.
- [x] **Pragmatic Excellence**: Addresses a critical aspect of UI/UX, directly contributing to a "demonstration-ready" product. By replacing Tailwind with custom CSS, it enables a highly specific design vision essential for hackathon presentation.
- [x] **Zero-Cost Infrastructure**: Styling changes are purely a frontend concern and do not add direct infrastructure costs.
- [x] **Demonstration-Ready**: The theme system is a highly visible and impactful feature, directly enhancing the overall presentation and user experience, which is crucial for demonstration and showcasing the "professional appearance" required by the constitution.

**Constitution Alignment:** This feature aligns directly with the "Frontend" technical stack's mention of "Custom CSS" and the "Design Reference" from `/design` files. It also directly addresses "Professional typography and readability", "Mobile-responsive design", and "Accessibility" from the "Core Requirements" and "Quality Assurance Standards" sections. The decision to make a "Dark mode toggle" a core feature (it was previously "Nice-to-Have") aligns with the "Pragmatic Excellence" principle by elevating a high-impact UX feature to a "must-have".

## Project Structure

### Documentation (this feature)

```text
specs/005-custom-css-theme-system/
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
│   ├── css/
│   │   ├── custom.css       # Global CSS variables, base styles, root theme definitions (:root, [data-theme])
│   │   ├── homepage.css     # Styles specific to the homepage layout and components
│   │   ├── chapters.css     # Styles specific to chapter pages layout and components
│   │   ├── chatbot.css      # Styles specific to the chatbot UI component
│   │   ├── responsive.css   # Media queries for 320px, 768px, and 1024px breakpoints
│   │   └── accessibility.css# Styles for clear focus states, reduced motion, high contrast
│   ├── theme/               # Docusaurus theme overrides if necessary for injecting theme toggle or scripts
│   └── components/          # React components, potentially including a generic ThemeToggleButton if separate from the chatbot widget
└── package.json             # Docusaurus project configuration and dependencies
```

**Structure Decision**: A web application structure focused on the `docusaurus/` frontend is chosen. The CSS files are organized precisely as specified in the feature requirements within `docusaurus/src/css/`. This modular CSS structure supports maintainability, clear separation of concerns for different parts of the website, and dedicated files for responsive and accessibility features. React components and theme overrides will be placed in `docusaurus/src/components/` and `docusaurus/src/theme/` respectively, integrating seamlessly into the Docusaurus framework.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No direct violations of the constitution. This feature is a core component directly addressing the project's mission and technical goals, leveraging the specified AI-native and zero-cost infrastructure principles, and enhancing the overall user experience and presentation quality.