# Data Model: Deployment Pipeline - Vercel + GitHub Actions + Railway

This feature is entirely focused on establishing and configuring the automated deployment pipeline for the book website and the API backend. It does not introduce any new application-level data models or persistent entities that would typically be stored in a database or file system for user interaction or application state.

## Key Data Points (Configuration)

The "data" involved in this feature is primarily configuration-based:

-   **GitHub Actions Workflow Files**: YAML files (`deploy-book.yml`, `deploy-api.yml`) that define the sequence of CI/CD steps.
-   **Vercel Project Configuration**: Settings within the Vercel platform for the book website (e.g., build commands, environment variables, linked Git repository).
-   **Railway Project Configuration**: Settings within the Railway platform for the API backend (e.g., Dockerfile link, build commands, environment variables, health check, auto-rollback settings).
-   **Environment Variables/Secrets**: Sensitive configuration values managed by Vercel, Railway, and GitHub Actions (e.g., API keys, database URLs).

No complex data entities, relationships, or state transitions are required for this feature.
