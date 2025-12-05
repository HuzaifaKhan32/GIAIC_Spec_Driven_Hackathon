# Quickstart: Deployment Pipeline - Vercel + GitHub Actions + Railway

This document provides a quick guide to setting up and verifying the automated deployment pipeline for the book website and the API backend.

## 1. Prerequisites

-   GitHub repository for the project.
-   Vercel account linked to your GitHub.
-   Railway account linked to your GitHub.
-   `docusaurus/` directory containing the book website code.
-   `chatbot-api/` directory containing the FastAPI application code.

## 2. Environment Variables & Secrets Configuration

All sensitive information (API keys, database URLs, secrets) must be securely configured in the respective platforms.

### 2.1 GitHub Secrets

Configure the following as GitHub Repository Secrets (Settings -> Secrets -> Actions):
-   `VERCEL_TOKEN`: Your Vercel API Token (for `deploy-book.yml`).
-   `RAILWAY_TOKEN`: Your Railway API Token (for `deploy-api.yml`).

### 2.2 Vercel Environment Variables

Configure the necessary environment variables in your Vercel project settings (for the book website deployment). These would typically include:
-   `NEXT_PUBLIC_VERCEL_ENV`: `production` (or `development`, `preview`).
-   `BETTER_AUTH_URL`: The URL of your deployed authentication backend (if separate).
-   `GOOGLE_CLIENT_ID`, `GITHUB_CLIENT_ID`, etc., if frontend directly uses them.

### 2.3 Railway Environment Variables

Configure the necessary environment variables in your Railway project settings (for the API backend deployment). These would typically include:
-   `GOOGLE_API_KEY`: Your Google Gemini API Key.
-   `QDRANT_URL`, `QDRANT_API_KEY`: Qdrant Cloud connection details.
-   `DATABASE_URL`: Your database connection string.
-   `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (if Better-Auth is integrated directly into the API service).
-   `CORS_ORIGIN`: Your Vercel frontend URL (e.g., `https://physical-ai-textbook.vercel.app`).

## 3. GitHub Actions Workflows

Place these YAML files in your repository at `.github/workflows/`.

### 3.1 `deploy-book.yml` (for Docusaurus Book Website)

```yaml
name: Deploy Docusaurus Book to Vercel

on:
  push:
    branches:
      - main
    paths:
      - 'docusaurus/**'
  pull_request:
    branches:
      - main
    paths:
      - 'docusaurus/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18' # Or your preferred Node.js version

      - name: Install Dependencies (Book)
        run: npm install
        working-directory: ./docusaurus

      - name: Build Book Website
        run: npm run build
        working-directory: ./docusaurus

      # Optional: Run linting and accessibility checks here
      - name: Run Lint and Accessibility Checks
        run: |
          npm run lint
          # npm run accessibility-check # if defined in package.json
        working-directory: ./docusaurus

      - name: Deploy to Vercel
        uses: vercel/actions/deploy@v5
        with:
          token: ${{ secrets.VERCEL_TOKEN }}
          prod: ${{ github.ref == 'refs/heads/main' }} # Deploy to production on main branch
          build-env: |
            NEXT_PUBLIC_VERCEL_ENV=${{ github.ref == 'refs/heads/main' && 'production' || 'preview' }}
          working-directory: ./docusaurus

      - name: Verify Vercel Deployment with Lighthouse
        if: success() && github.ref == 'refs/heads/main' # Only run on production deployments
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: 'https://physical-ai-textbook.vercel.app' # Replace with your actual production URL
          # Add other Lighthouse configuration if needed
```

### 3.2 `deploy-api.yml` (for FastAPI Chatbot API)

```yaml
name: Deploy FastAPI Chatbot API to Railway

on:
  push:
    branches:
      - main
    paths:
      - 'chatbot-api/**'
  pull_request:
    branches:
      - main
    paths:
      - 'chatbot-api/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'

      - name: Install Python Dependencies
        run: pip install -r requirements.txt
        working-directory: ./chatbot-api

      - name: Run Pytest Tests
        run: pytest
        working-directory: ./chatbot-api

      - name: Run Linting (flake8, black)
        run: |
          flake8 .
          black --check .
        working-directory: ./chatbot-api

      - name: Deploy to Railway
        uses: railwayapp/github-action@v3
        with:
          token: ${{ secrets.RAILWAY_TOKEN }}
          project: <YOUR_RAILWAY_PROJECT_ID> # Replace with your Railway project ID
          service: <YOUR_RAILWAY_SERVICE_ID> # Replace with your Railway service ID for the API
          dir: ./chatbot-api # Directory containing your Dockerfile and code

      - name: Verify Railway Deployment Health
        if: success() && github.ref == 'refs/heads/main' # Only run on production deployments
        run: |
          # Example: Wait for the service to be healthy.
          # You might need to query Railway API for deployed service URL
          # and then poll its /health endpoint.
          # For simplicity, assuming Railway's health check features are configured.
          echo "Railway health checks configured in Railway platform."
```

## 4. Railway Health Monitoring & Rollback

Configure the `GET /health` endpoint for your API service in Railway's settings. Enable auto-rollback to the previous deployment if the health checks fail. This will ensure API stability.

## 5. Testing the Pipeline

-   **Push to `main`**: Make a small change in `docusaurus/` and push to `main`. Verify Vercel deployment and Lighthouse score.
-   **Push to `main`**: Make a small change in `chatbot-api/` and push to `main`. Verify Railway deployment and health checks.
-   **Pull Request**: Create a PR against `main` (in either project). Verify preview deployments are created on Vercel and Railway.
-   **Simulate Failure**: Introduce a failing test or health check in a PR to observe pipeline failure and potential rollback.

## 6. API Contracts

This feature is about infrastructure and deployment and does not introduce any new API contracts. It deploys existing API services as defined in `003-rag-chatbot-backend`.
