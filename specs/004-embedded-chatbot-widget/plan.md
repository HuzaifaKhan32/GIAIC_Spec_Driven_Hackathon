# Implementation Plan: Embedded Chatbot Widget - React Component

**Branch**: `004-embedded-chatbot-widget` | **Date**: 2025-12-04 | **Spec**: specs/004-embedded-chatbot-widget/spec.md
**Input**: Feature specification from `specs/004-embedded-chatbot-widget/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Develop an embedded, user-friendly chatbot widget as a React component for the Docusaurus-based book website. This component will feature custom CSS theming (dark/light mode), session management, integration with the RAG chatbot backend via API calls, display of conversation history and source citations, and robust accessibility and responsiveness.

## Technical Context

**Language/Version**: TypeScript (for React components), JavaScript (for Docusaurus and browser APIs).
**Primary Dependencies**: React (functional components, hooks), Docusaurus (integration environment), custom CSS (from `005-custom-css-theme-system`).
**Storage**: `localStorage` (for `session_id` persistence and potentially client-side caching of chat history).
**Testing**: Jest/React Testing Library (unit/component tests for React logic), Cypress/Playwright (end-to-end tests for UI interaction, API call integration), Lighthouse (performance/accessibility audits), manual accessibility testing with screen readers and keyboard navigation.
**Target Platform**: Modern web browsers (desktop and mobile) within the Docusaurus application.
**Project Type**: Web application (Frontend component).
**Performance Goals**: Lighthouse > 80, smooth animations/transitions, rapid theme switching, <300ms debounce for input, seamless loading states.
**Constraints**: Integration with `/chat/query` backend endpoint (`003-rag-chatbot-backend`), WCAG 2.1 AA compliance, responsive layout at 320px, 768px, 1024px breakpoints, maximum widget width of 600px on desktop.
**Scale/Scope**: Single embedded chatbot widget, managing one user conversation at a time, displaying conversation history.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Quality Over Quantity**: Focus on clean, modern chat UI, robust accessibility, and responsiveness. Ensures a high-quality user interaction.
- [x] **AI-Native Development**: The frontend component is the user-facing part of the RAG chatbot, directly enabling interaction with the core AI feature.
- [x] **Pragmatic Excellence**: Prioritizes the user interface for the RAG chatbot, which is a key technical differentiator for the project.
- [x] **Zero-Cost Infrastructure**: The frontend component itself is served as part of the Docusaurus site, which is deployed to GitHub Pages (free tier).
- [x] **Demonstration-Ready**: The chatbot UI is highly visible and central to the project's demonstration, directly showcasing the RAG capabilities.

**Constitution Alignment:** This feature is central to Requirement 2 ("Integrated RAG Chatbot") of the constitution, specifically its "Clean, modern chat UI" and "text-selection support" aspects. It aligns with the frontend technical stack (Docusaurus, React), user experience standards (responsive, accessible, intuitive UI), and performance benchmarks (chatbot response <3s, as seen from the backend spec).

## Project Structure

### Documentation (this feature)

```text
specs/004-embedded-chatbot-widget/
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
│   │   ├── ChatbotWidget/       # Main chatbot component folder
│   │   │   ├── index.tsx        # Entry point for the ChatbotWidget component
│   │   │   ├── ChatWindow.tsx   # Sub-component to display message history
│   │   │   ├── ChatInput.tsx    # Sub-component for user text input and send functionality
│   │   │   ├── MessageBubble.tsx# Sub-component for rendering individual chat messages (user/assistant)
│   │   │   ├── TypingIndicator.tsx# Sub-component for animated typing feedback
│   │   │   └── ChatbotWidget.module.css # Component-specific CSS modules for styling
│   ├── hooks/                   # Custom React hooks for shared logic
│   │   └── useChatSession.ts    # Hook to manage session ID, API calls, conversation history (client-side)
│   └── theme/                   # Docusaurus theme overrides or custom theme integration points
└── src/css/                     # Custom CSS files (managed by 005-custom-css-theme-system)
    └── chatbot.css              # Global styling for the chatbot widget (imported from custom CSS feature)
```

**Structure Decision**: A web application structure with a focus on the `docusaurus/` frontend directory is chosen. The React components for the chatbot widget will be logically grouped under `docusaurus/src/components/ChatbotWidget/`, with individual files for sub-components. Custom hooks for managing chat session logic will reside in `docusaurus/src/hooks/`. The styling will leverage the `chatbot.css` file as part of the `005-custom-css-theme-system` feature, aligning with a clean separation of concerns.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No direct violations of the constitution. This feature is a core component directly addressing the project's mission and technical goals, leveraging the specified AI-native and zero-cost infrastructure principles.