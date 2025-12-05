# Feature Specification: Deployment Pipeline - Vercel + GitHub Actions + Railway

**Feature Branch**: `007-deployment-pipeline`  
**Created**: 2025-12-04
**Status**: Draft  
**Input**: User description: "Feature: Deployment Pipeline - Vercel + GitHub Actions + Railway Intent: Automated deployment of book and API Book Deployment: - Trigger: Push to main in /docusaurus - Deploy to: Vercel (physical-ai-textbook.vercel.app) - Build: npm run build - Preview: PR deployments - Performance check: Lighthouse > 90 API Deployment: - Trigger: Push to main in /chatbot-api - Deploy to: Railway (api.railway.app) - Build: Docker build (Python 3.10) - Tests: pytest before deploy - Health check: GET /health every 5 min - Auto-rollback: If health fails GitHub Actions Workflows: deploy-book.yml: - Build & test book (npm install, npm run build) - Run linting & a11y checks - Deploy to Vercel - Verify deployment (Lighthouse) deploy-api.yml: - Run pytest tests - Lint (flake8, black) - Build Docker image - Deploy to Railway - Verify health checks pass Environment Variables: - Production secrets in platform (Vercel, Railway) - GOOGLE_API_KEY, QDRANT_*, JWT_SECRET - BETTER_AUTH_SECRET, GOOGLE_*, GITHUB_*, DATABASE_URL Monitoring: - Health endpoints responding - Deployment logs accessible - Rollback capability available Testing: - Push code -> Auto-deploy to prod - All tests must pass - PR preview deployments work - Rollback available if needed Acceptance Criteria: - Automatic deployment on push - Tests run before deploy - Health checks verify success - Lighthouse > 90 on book - API response < 2s - Monitoring/alerts configured Reference: constitution.md Section 7, 10"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Automated Book Website Deployment (Priority: P1)

As a developer, I want the book website to be automatically built, tested, and deployed to Vercel whenever changes are pushed to the main branch in the `/docusaurus` directory.

**Why this priority**: Ensures the book website is always up-to-date and publicly accessible with the latest content.

**Independent Test**: This can be tested by pushing a change to the `/docusaurus` directory on the `main` branch and verifying the Vercel deployment status and Lighthouse score.

**Acceptance Scenarios**:

1. **Given** I push new code to the `main` branch within the `/docusaurus` directory, **When** the `deploy-book.yml` GitHub Actions workflow is triggered, **Then** the book website is automatically built, tested (including linting and accessibility checks), and deployed to `physical-ai-textbook.vercel.app`.
2. **Given** a successful book website deployment, **When** a Lighthouse performance check is executed, **Then** the reported Lighthouse score is greater than 90.

---

### User Story 2 - Automated API Deployment with Rollback (Priority: P1)

As a backend developer, I want the chatbot API to be automatically built, tested, and deployed to Railway whenever changes are pushed to the main branch in the `/chatbot-api` directory, with an automatic rollback on failure.

**Why this priority**: Ensures the API is continuously updated and stable, with safeguards against faulty deployments.

**Independent Test**: This can be tested by pushing a change to the `/chatbot-api` directory on the `main` branch (including a change that would cause a health check to fail) and observing the deployment and rollback behavior.

**Acceptance Scenarios**:

1. **Given** I push new code to the `main` branch within the `/chatbot-api` directory, **When** the `deploy-api.yml` GitHub Actions workflow is triggered, **Then** the chatbot API is automatically built (Docker), tested (`pytest`, linting), and deployed to `api.railway.app`.
2. **Given** a successful API deployment, **When** the `/health` endpoint is checked every 5 minutes, **Then** it consistently returns a healthy status (2xx HTTP code).
3. **Given** the deployed API's `/health` endpoint consistently fails after a new deployment, **When** the monitoring system detects the failure, **Then** an automatic rollback to the previous stable version of the API is initiated and completed.

---

### User Story 3 - Pull Request Preview Deployments (Priority: P2)

As a developer, I want to review changes to the book website and API in a live environment before merging them into the main branch.

**Why this priority**: Facilitates collaboration, early testing, and quality assurance.

**Independent Test**: This can be tested by opening a pull request and verifying that a preview environment is created and accessible.

**Acceptance Scenarios**:

1. **Given** I create a pull request for changes in either the `/docusaurus` or `/chatbot-api` directories, **When** the CI/CD pipeline runs, **Then** a temporary preview deployment (e.g., Vercel preview URL, Railway ephemeral environment) is automatically created for the proposed changes.
2. **Given** a preview deployment is available for a pull request, **When** I click on the provided link, **Then** I can access and review the changes in a live environment.

### Edge Cases

- What happens if a deployment fails due to external service outages (e.g., Vercel, Railway, GitHub Actions itself)?
- How are environment variables and secrets managed for preview deployments versus production deployments?
- What is the process for manually triggering a rollback if the automatic rollback fails or is insufficient?
- How are notifications sent to the development team about deployment successes, failures, and rollbacks?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST implement an automated deployment pipeline for the book website and chatbot API.
- **FR-002**: Pushes to the `main` branch in the `/docusaurus` directory MUST trigger an automatic deployment of the book website to Vercel.
- **FR-003**: Pushes to the `main` branch in the `/chatbot-api` directory MUST trigger an automatic deployment of the chatbot API to Railway.
- **FR-004**: A dedicated GitHub Actions workflow (`deploy-book.yml`) MUST be created to handle the book website deployment process.
- **FR-005**: The `deploy-book.yml` workflow MUST include steps for dependency installation (`npm install`), building (`npm run build`), running linting and accessibility checks, deployment to Vercel, and post-deployment verification using Lighthouse.
- **FR-006**: A dedicated GitHub Actions workflow (`deploy-api.yml`) MUST be created to handle the chatbot API deployment process.
- **FR-007**: The `deploy-api.yml` workflow MUST include steps for running `pytest` tests, linting (`flake8`, `black`), building a Docker image (using Python 3.10), deployment to Railway, and post-deployment health check verification.
- **FR-008**: The deployment pipeline MUST provide preview deployments for all pull requests for both the book website and the API.
- **FR-009**: The API deployment MUST incorporate a health check mechanism that polls the `GET /health` endpoint every 5 minutes.
- **FR-010**: The API deployment MUST include an automatic rollback feature that activates if health checks fail post-deployment.
- **FR-011**: Production environment variables and secrets (e.g., `GOOGLE_API_KEY`, `QDRANT_*`, `JWT_SECRET`, `BETTER_AUTH_SECRET`, `GOOGLE_*`, `GITHUB_*`, `DATABASE_URL`) MUST be securely stored and managed on Vercel and Railway platforms.
- **FR-012**: Monitoring tools MUST be configured to ensure all health endpoints are responsive and deployment logs are readily accessible for debugging.
- **FR-013**: The deployment system MUST allow for manual rollback to previous stable versions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Pushing code to the `main` branches of `/docusaurus` and `/chatbot-api` consistently triggers and completes fully automated production deployments.
- **SC-002**: All configured tests (e.g., unit tests, linting, accessibility checks) execute successfully as part of the CI/CD pipeline before any production deployment.
- **SC-003**: Health checks for the API deployment consistently verify the successful operation of the service post-deployment, and automatic rollbacks effectively revert to a stable state upon failure detection.
- **SC-004**: The deployed book website consistently achieves a Lighthouse performance score of 90 or higher.
- **SC-005**: The deployed API demonstrates a response latency of less than 2 seconds for primary endpoints (e.g., `/chat/query`).
- **SC-006**: Comprehensive monitoring and alerting systems are configured and actively track deployment status, service health, and key performance indicators.