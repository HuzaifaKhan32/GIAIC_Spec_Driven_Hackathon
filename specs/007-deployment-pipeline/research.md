# Research: Deployment Pipeline - Vercel + GitHub Actions + Railway

## Research 1: Best practices for configuring GitHub Actions workflows for Vercel deployment of Docusaurus sites

*   **Decision:** The `deploy-book.yml` GitHub Actions workflow will utilize the official `vercel/actions/deploy@v5` action. This action will be configured to trigger on pushes to the `main` branch within the `docusaurus/` directory for production deployments, and on pull requests originating from any branch for preview deployments. The Vercel project configuration (`vercel.json` or project settings) will explicitly define the build command as `npm run build`.
*   **Rationale:** The official Vercel GitHub Action is the most reliable, secure, and idiomatic way to automate deployments to Vercel. Triggering on `main` ensures continuous delivery to production, while PR-based triggers provide invaluable preview environments for effective code review and pre-merge testing.
*   **Alternatives considered:** Manual Vercel deployments (lacks automation, prone to human error), custom `curl`/API scripts for deployment (less robust, higher maintenance overhead, misses built-in Vercel features).

## Research 2: Best practices for configuring GitHub Actions workflows for Railway deployment of Dockerized FastAPI applications

*   **Decision:** The `deploy-api.yml` GitHub Actions workflow will leverage a GitHub Action that integrates directly with Railway (e.g., `railwayapp/github-action@v3` or a similar community-supported action). This workflow will be configured to trigger on pushes to the `main` branch within the `chatbot-api/` directory. The action will be responsible for building the Docker image (using the `Dockerfile` located in `chatbot-api/`) and initiating the deployment to Railway.
*   **Rationale:** Using a dedicated GitHub Action for Railway streamlines the deployment process, directly integrating with Railway's platform capabilities (including its native Docker build). This ensures an automated, consistent, and reliable deployment flow.
*   **Alternatives considered:** Manual Railway deployments (lacks automation, increases operational burden), using generic Docker build-and-push actions followed by Railway CLI calls (more complex to configure and maintain within GitHub Actions).

## Research 3: Implementing Lighthouse performance checks in GitHub Actions for Docusaurus deployments

*   **Decision:** The `treosh/lighthouse-ci-action@v10` GitHub Action will be integrated into the `deploy-book.yml` workflow. This action will execute after the Vercel deployment step (specifically on preview deployments, or a temporary production URL). It will be configured to run a Lighthouse audit on the deployed book website and will be set to fail the CI/CD pipeline if the overall performance score falls below the specified threshold of 90.
*   **Rationale:** Automating Lighthouse performance validation ensures that the book website continuously meets the high performance standards outlined in the feature specification and project constitution. Failing the CI on low scores provides immediate feedback to developers, preventing performance regressions.
*   **Alternatives considered:** Manual Lighthouse checks (time-consuming, inconsistent, and error-prone), not performing checks (risks unnoticed performance degradation over time).

## Research 4: Setting up continuous health monitoring and auto-rollback for FastAPI applications on Railway

*   **Decision:** Railway's built-in platform features for health checks and auto-rollback will be fully utilized. The Railway service will be configured to perform periodic `GET /health` requests on the deployed FastAPI application (e.g., every 5 minutes). Automatic rollback to the previous stable deployment will be enabled in Railway's settings, which will trigger if these health checks consistently fail after a new deployment.
*   **Rationale:** Railway's native support for these operational features simplifies setup and provides a robust, platform-managed solution for ensuring API reliability and stability, automatically mitigating risks associated with faulty deployments.
*   **Alternatives considered:** Implementing custom health check logic within the FastAPI app and managing rollback via GitHub Actions (adds significant complexity, duplicates platform capabilities), manual rollbacks (slow, reactive, and prone to human error during critical incidents).

## Research 5: Securely managing environment variables and secrets in GitHub Actions, Vercel, and Railway

*   **Decision:** All sensitive environment variables (API keys, database credentials, OAuth secrets) will be stored and managed exclusively using the native secret management features of each platform:
    *   **GitHub Actions:** Secrets will be stored as repository secrets.
    *   **Vercel:** Environment variables will be configured directly in the Vercel project settings (for both production and preview environments).
    *   **Railway:** Environment variables and secrets will be managed within Railway's project settings.
    *   `.env.example` files will guide local development setup without exposing secrets.
*   **Rationale:** This approach ensures that sensitive credentials are never hardcoded, never committed to version control, and are securely handled by each platform's dedicated secret management system, adhering to strict security best practices.
*   **Alternatives considered:** Hardcoding secrets (major security vulnerability), storing secrets in plain text files (high security risk), relying on less secure methods of passing secrets between systems.

## Research 6: Strategies for creating effective PR preview deployments on Vercel and Railway for Docusaurus and FastAPI projects

*   **Decision:**
    *   **Vercel (Docusaurus):** Vercel's native Git integration will be leveraged. Vercel automatically creates a unique preview deployment for every new pull request opened against the configured Git repository.
    *   **Railway (FastAPI):** Railway's platform offers "Ephemeral Environments" that can be configured to automatically deploy PR branches. This will be set up to create a temporary, isolated deployment of the FastAPI backend for each pull request opened against the `chatbot-api/` directory.
*   **Rationale:** PR preview deployments are invaluable for facilitating efficient code review, integration testing, and stakeholder feedback in a live environment *before* merging changes to the `main` branch. This significantly reduces the risk of introducing bugs or breaking changes into production.
*   **Alternatives considered:** Testing only locally (misses integration issues with other services), only deploying to production after merge (high risk of introducing bugs, no early feedback).

