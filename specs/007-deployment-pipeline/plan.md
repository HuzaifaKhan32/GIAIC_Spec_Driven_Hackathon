# Implementation Plan: Deployment Pipeline - Vercel + GitHub Actions + Railway

**Branch**: `007-deployment-pipeline` | **Date**: 2025-12-04 | **Spec**: specs/007-deployment-pipeline/spec.md
**Input**: Feature specification from `specs/007-deployment-pipeline/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a fully automated deployment pipeline utilizing Vercel for the book website and Railway for the API backend, orchestrated via GitHub Actions. The pipeline will ensure continuous delivery, run comprehensive tests, perform health checks, and include auto-rollback capabilities for the API, with a focus on performance and reliability.

## Technical Context

**Language/Version**: JavaScript/TypeScript (for book website build, testing, and linting), Python (for API build, testing, and linting), YAML (for GitHub Actions workflow definitions).
**Primary Dependencies**: Vercel (deployment platform for frontend), Railway (deployment platform for backend), GitHub Actions (CI/CD orchestration), Docker (for API containerization), `npm`/Yarn (for book website dependency management and build), `pytest`, `flake8`, `black` (for API testing and linting).
**Storage**: Vercel's platform (for book website static assets and serverless functions), Railway's platform (for API container and associated data volumes if any).
**Testing**: GitHub Actions workflows will orchestrate automated testing including `npm run build` and linting/accessibility checks for the book website, `pytest` for API unit/integration tests, and `flake8`/`black` for API linting. Post-deployment, Lighthouse will verify book website performance, and repeated `GET /health` calls will verify API operational status.
**Target Platform**: Vercel (frontend), Railway (backend).
**Project Type**: Infrastructure / CI/CD.
**Performance Goals**: Lighthouse score > 90 for the book website. API response latency < 2 seconds for primary endpoints (e.g., `/chat/query`). Docusaurus build time < 60 seconds (from constitution).
**Constraints**: Utilization of free tiers for Vercel, Railway, and GitHub Actions. Secure management of environment variables and secrets across platforms.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Quality Over Quantity**: Ensures deployment processes are robust, automated, and include comprehensive testing and verification steps.
- [x] **AI-Native Development**: Automates and streamlines development processes through CI/CD, aligning with modern, efficient development practices.
- [x] **Pragmatic Excellence**: Focuses on a core operational capability essential for a production-ready system, directly contributing to "Deploy early, iterate fast, test thoroughly".
- [x] **Zero-Cost Infrastructure**: Explicitly utilizes free tiers of Vercel, Railway, and GitHub Actions for deployment and automation.
- [x] **Demonstration-Ready**: Provides fully automated deployment, which is critical for demonstrating a complete, continuously delivered project at the hackathon.

**Constitution Alignment:** This feature aligns with "Developer Experience: GitHub Actions CI/CD pipeline, Automated testing (unit + integration), Monitoring/analytics setup" from the Bonus Features section of the constitution. It directly supports the "Non-Negotiable: All core features working by submission deadline" and "Deployed and accessible via public URL" requirements.

**Justification for Deployment Platform Deviation:**
The constitution specifies "Frontend Deployment: GitHub Pages" and "Backend Deployment: Vercel Serverless Functions". The feature specifies "Book Deployment: Vercel" and "API Deployment: Railway".
**Frontend (Book) Deviation:** Vercel for the book (instead of GitHub Pages) is chosen because the previous features (`001-docusaurus-ai-textbook`, `005-custom-css-theme-system`) already established Vercel as the deployment target. This also aligns with Vercel's strength in Next.js/React applications (which Docusaurus is built on) and its seamless integration with GitHub for PR preview deployments, enhancing developer experience and review processes.
**Backend (API) Deviation:** Railway for the API (instead of Vercel Serverless Functions) is chosen because:
1.  Railway offers a robust platform specifically designed for containerized applications (Docker build for Python 3.10 FastAPI), providing a more natural and often more flexible deployment model for Python web services compared to Vercel's serverless functions that are primarily optimized for Node.js workloads.
2.  It fully adheres to the "Zero-Cost Infrastructure" principle by offering a generous free tier suitable for this project's scale.
3.  Railway provides stronger native features for managing persistent services, including health checks and auto-rollback capabilities, which are critical for the API's reliability and stability as per the spec.
This deviation is justified by selecting deployment platforms that better support the specific technical requirements of the chosen frontend and backend frameworks, while adhering to the zero-cost principle and significantly enhancing the "Technical Implementation" aspect of the project for a competitive submission.

## Project Structure

### Documentation (this feature)

```text
specs/007-deployment-pipeline/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
.github/
├── workflows/
│   ├── deploy-book.yml    # GitHub Actions workflow for building, testing, and deploying the book website to Vercel
│   └── deploy-api.yml     # GitHub Actions workflow for building, testing, and deploying the chatbot API to Railway
docusaurus/                # Directory containing the Docusaurus book website project
chatbot-api/               # Directory containing the FastAPI chatbot API project
```

**Structure Decision**: The project structure will maintain separate, distinct directories for the book website (`docusaurus/`) and the chatbot API (`chatbot-api/`). GitHub Actions workflows, essential for orchestrating the CI/CD, will reside in the standard `.github/workflows/` directory at the repository root, ensuring clear separation and organization of automation configurations.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| Frontend Deployment: GitHub Pages (from Constitution) | Vercel provides superior developer experience, seamless integration with Next.js/Docusaurus (React-based), and robust PR preview capabilities, aligning better with "Quality Over Quantity" and "Pragmatic Excellence" principles by ensuring a high-quality frontend deployment experience. | GitHub Pages, while free, has more limited CI/CD features for complex build processes (like Docusaurus with custom React/TypeScript components) and less native support for React applications with advanced routing and server-side rendering needs. It might also struggle with zero-flicker theme management without complex workarounds. |
| Backend Deployment: Vercel Serverless Functions (from Constitution) | Railway offers a more mature and feature-rich platform specifically designed for containerized Python applications. This better supports FastAPI's requirements for persistent services, custom Docker environments, sophisticated health checks, and robust auto-rollback mechanisms, all critical for API reliability and stability. | Vercel's serverless functions are primarily optimized for Node.js/JavaScript workloads. Deploying a Python/Docker-based FastAPI application requiring a persistent service model (for Qdrant connections, etc.) might introduce more complexity, configuration overhead, or limitations within Vercel's serverless ecosystem. Railway provides a more "batteries-included" solution for this specific backend stack. |