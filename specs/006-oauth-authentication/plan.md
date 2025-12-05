# Implementation Plan: Authentication - Better-Auth with Google + GitHub OAuth

**Branch**: `006-oauth-authentication` | **Date**: 2025-12-04 | **Spec**: specs/006-oauth-authentication/spec.md
**Input**: Feature specification from `specs/006-oauth-authentication/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a production-grade authentication system using Better-Auth with Google and GitHub OAuth providers. This includes setting up database tables via Prisma ORM for user accounts, sessions, preferences, and learning progress. Frontend integration will utilize dedicated React hooks, and backend endpoints will manage authentication and user-specific data. The system will enforce robust security measures, cookie-based session management, and rate limiting.

## Technical Context

**Language/Version**: TypeScript (for Better-Auth framework, Prisma client, and frontend hooks), Python (for FastAPI custom backend endpoints).
**Primary Dependencies**: Better-Auth (TypeScript framework), Prisma ORM (TypeScript), Google OAuth client libraries, GitHub OAuth client libraries, FastAPI (Python).
**Storage**: PostgreSQL (or a compatible relational database managed by Prisma), hosted on Railway (free tier).
**Testing**: Jest/React Testing Library (unit/integration tests for frontend hooks and components), `supertest`/`pytest` (integration tests for custom backend API endpoints), end-to-end testing frameworks (e.g., Cypress/Playwright) for OAuth flows.
**Target Platform**: Web browsers (frontend), Node.js serverless environment (for Better-Auth API routes, e.g., Vercel), Python backend (for custom FastAPI endpoints, e.g., Railway).
**Project Type**: Full-stack application (Frontend integration with an authentication backend).
**Performance Goals**: Fast OAuth redirects (<1s), seamless session management without noticeable delays, efficient database queries for user data retrieval, API responses within acceptable limits (<500ms for custom endpoints).
**Constraints**: Google/GitHub OAuth free tier usage limits, Vercel platform constraints for deployment, HTTPS-only communication, httpOnly and SameSite=Strict cookies, CORS restricted to the Vercel domain, Rate limiting (5 attempts/15 min).
**Scale/Scope**: User authentication for the entire educational platform, including persistence of user preferences and tracking of learning progress.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Quality Over Quantity**: Focus on a production-grade, secure, and robust authentication system.
- [x] **AI-Native Development**: The feature itself is not AI-native, but its development will strictly follow the spec-driven approach with AI assistance.
- [x] **Pragmatic Excellence**: Enables personalized user experiences, a crucial aspect for an educational platform, significantly enhancing overall value.
- [x] **Zero-Cost Infrastructure**: Better-Auth and Prisma can run on free tier databases (e.g., Railway PostgreSQL) and serverless environments (e.g., Vercel).
- [x] **Demonstration-Ready**: Authentication is a fundamental feature for a complete, production-ready application demonstration at the hackathon.

**Constitution Alignment:** This feature *deviates* from the initial "Out of Scope: User authentication/accounts" listed in the constitution.
**Justification for Deviation:** The decision to include user authentication aligns with the broader "Core Mission" to create a "comprehensive educational book" and an "AI-Native Educational Platform" that will eventually require personalized experiences (e.g., tracking learning progress, user preferences). While initially out of scope to manage complexity, a production-grade authentication system is a fundamental building block for a "Winning Submission" (95-100/100) and significantly enhances the overall "Technical Implementation" score. It also enables dependent features like `UserPreferences` and `LearningProgress` which directly support the educational platform aspect. This is a conscious decision to expand scope for a more complete and competitive product, aligning with the "Pragmatic Excellence" principle by focusing on a high-impact feature that will enhance the platform's long-term viability and judges' evaluation.

## Project Structure

### Documentation (this feature)

```text
specs/006-oauth-authentication/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
# The Better-Auth framework typically integrates with a Node.js/TypeScript environment,
# which can run as serverless functions on Vercel or alongside the Docusaurus project
# if Docusaurus is extended (e.g., via Next.js integration).
# Custom FastAPI endpoints for learning will reside in a separate Python backend project.

docusaurus/
├── src/
│   ├── components/
│   │   ├── Auth/            # Authentication-related UI components (Login buttons, User profile display)
│   │   └── hooks/           # Frontend authentication hooks (e.g., `useSession`, `signIn`, `signOut`)
│   ├── pages/               # Login page, profile page, etc.
│   └── lib/                 # Client-side utility functions for auth (e.g., API calls for learning data)
├── api/                     # If using Next.js/similar, Better-Auth's API routes (e.g., /api/auth/...)
├── prisma/                  # Prisma schema and generated client for database interaction
│   ├── schema.prisma        # Defines User, Account, Session, UserPreferences, LearningProgress tables
│   └── migrations/          # Prisma database migrations
└── package.json             # Includes Better-Auth, Prisma, and related frontend dependencies

chatbot-api/                 # Existing FastAPI backend for RAG chatbot
├── app/
│   └── api/
│       ├── learning.py      # Custom FastAPI endpoints: GET /api/learning/progress, POST /api/learning/progress/update
│       └── user_preferences.py # Custom FastAPI endpoint: PUT /api/user/preferences
└── requirements.txt         # Includes FastAPI, Pydantic, etc.
```

**Structure Decision**: A hybrid full-stack application structure is chosen to accommodate both the TypeScript-based Better-Auth (likely integrating with the Docusaurus project via Vercel's serverless functions) and the existing Python-based FastAPI backend. The `docusaurus/` directory will house frontend components, hooks, and the Prisma setup. The `chatbot-api/` (FastAPI) project will be extended to include custom endpoints for learning progress and user preferences, which require user authentication. This split leverages the strengths of both frameworks while ensuring proper integration.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| Out of Scope: User authentication/accounts | This feature is critical for enabling personalized experiences, tracking learning progress, and making the educational platform more robust and competitive, especially for a "Winning Submission". It directly enables `UserPreferences` and `LearningProgress` features, which enhance the "AI-Native Educational Platform" vision. | Simple client-side only solutions lack security and persistence for user data. Not implementing auth would limit future growth and reduce the project's overall impact for the hackathon judges. Relying on unauthenticated access only would miss a significant opportunity to showcase a complete, production-ready educational platform. |