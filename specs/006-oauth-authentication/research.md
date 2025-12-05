# Research: Authentication - Better-Auth with Google + GitHub OAuth

## Research 1: Best practices for setting up Better-Auth with Google and GitHub OAuth providers in a TypeScript/Node.js environment

*   **Decision:** Adhere strictly to Better-Auth's official documentation for configuring Google and GitHub OAuth providers. This will involve:
    1.  Creating developer applications on both Google Cloud Console and GitHub Developer Settings to obtain `CLIENT_ID` and `CLIENT_SECRET`.
    2.  Configuring authorized redirect URIs in both OAuth providers and Better-Auth to match the deployment environment (e.g., Vercel URL).
    3.  Setting up the provider-specific configurations within Better-Auth (e.g., scopes, optional parameters).
    4.  Ensuring all sensitive credentials (`CLIENT_ID`, `CLIENT_SECRET`, `BETTER_AUTH_SECRET`) are stored as environment variables.
*   **Rationale:** Following official documentation ensures correct, secure, and up-to-date configuration, minimizing potential errors and security vulnerabilities. This approach leverages the robustness and battle-tested nature of Better-Auth's integrations.
*   **Alternatives considered:** Custom OAuth implementation from scratch (highly time-consuming, complex, and prone to security vulnerabilities), using other general-purpose authentication libraries (Better-Auth is explicitly chosen by the feature specification).

## Research 2: Integrating Better-Auth with a Prisma ORM backend for User, Account, Session, UserPreferences, and LearningProgress tables

*   **Decision:** Utilize Better-Auth's official Prisma adapter. This adapter provides the necessary data models for `User`, `Account`, and `Session` as required by Better-Auth. The `User` model will then be extended to establish one-to-one relationships with `UserPreferences` and `LearningProgress` models, as defined in the feature specification's data model. Prisma Migrate will be used for managing database schema changes (migrations).
*   **Rationale:** Better-Auth's Prisma adapter significantly simplifies the database integration, abstracting away complex authentication-related table management. Extending the `User` model ensures that preferences and learning progress are directly and properly tied to the authenticated user, maintaining data integrity and logical coherence.
*   **Alternatives considered:** Custom database integration without an adapter (reinventing the wheel, more prone to errors, higher development effort), not using Prisma (violates feature specification and loses benefits of a type-safe ORM).

## Research 3: Implementing frontend authentication hooks (useSession, signIn, signOut) for Better-Auth in a Docusaurus/React application

*   **Decision:** Implement custom React hooks (`useSession`, `signIn`, `signOut`) that wrap Better-Auth's client-side utilities or interact directly with Better-Auth's exposed API endpoints (`/api/auth/session`, `/api/auth/signin`, `/api/auth/signout`). The `useSession` hook will manage the user's authentication state (loading, authenticated, unauthenticated) and asynchronously fetch/update session data. `signIn` and `signOut` hooks will trigger the respective authentication flows.
*   **Rationale:** Custom React hooks provide a clean, reusable, and React-idiomatic way to manage authentication state and actions in the frontend. This centralizes authentication logic, simplifies its consumption across various Docusaurus/React components, and improves code readability and maintainability.
*   **Alternatives considered:** Direct API calls within components (leads to duplicated code, harder to manage global authentication state), using a global state management solution without dedicated hooks (less React-idiomatic, can become boilerplate-heavy).

## Research 4: Securing custom FastAPI endpoints with Better-Auth session verification

*   **Decision:** Implement a custom FastAPI dependency or middleware that extracts the session cookie (managed and issued by Better-Auth) from incoming requests. This session token will then be validated against Better-Auth's internal mechanisms (e.g., by making an internal request to Better-Auth's `/api/auth/session` endpoint or by leveraging a shared secret/public key if provided by Better-Auth for direct token verification). Upon successful verification, the authenticated user object will be injected into the FastAPI request context, making it available to protected endpoints.
*   **Rationale:** This approach provides a robust and consistent security layer for custom FastAPI API endpoints, leveraging the existing Better-Auth session mechanism without requiring a separate, complex authentication system for the Python backend.
*   **Alternatives considered:** Implementing a separate JWT-based authentication for FastAPI (introduces more complexity, duplicate logic, and potential for inconsistencies with Better-Auth's session management), no authentication (major security vulnerability for sensitive endpoints).

## Research 5: Best practices for managing environment variables and secrets for Better-Auth and OAuth credentials across Vercel and Railway

*   **Decision:** Utilize Vercel's built-in environment variable and secret management features for all frontend and Better-Auth related deployments. For the FastAPI backend deployed on Railway, use Railway's native secret management system. For local development, maintain a `.env` file for each project (`docusaurus/` and `chatbot-api/`) based on a `.env.example` template, explicitly listing all required environment variables. Sensitive variables will *never* be committed to version control.
*   **Rationale:** Securely managing sensitive credentials (API keys, secrets) is paramount for production applications. Platform-native secret management systems are designed for this purpose, preventing exposure in source code and enabling distinct configurations for development, staging, and production environments.
*   **Alternatives considered:** Hardcoding credentials (major security risk, violates security best practices), storing secrets in plain text files within the repository (high security risk).

## Research 6: Implementing robust security measures: httpOnly/SameSite=Strict cookies, CORS, and rate limiting in a full-stack Better-Auth setup

*   **Decision:**
    *   **Cookies:** Ensure Better-Auth is configured to issue `httpOnly` and `SameSite=Strict` cookies. These are fundamental for session security.
    *   **CORS:** Implement CORS middleware in the FastAPI backend (`chatbot-api`) explicitly configured to allow requests only from the designated Vercel frontend domain (`physical-ai-textbook.vercel.app`) and potentially local development origins.
    *   **Rate Limiting:** Implement rate limiting (e.g., 5 attempts/15 min for login attempts) using an appropriate mechanism. For FastAPI, `FastAPI-Limiter` or a reverse proxy (like Nginx/Vercel's edge) can be used. Better-Auth may also provide built-in rate limiting for its endpoints.
*   **Rationale:** These measures are crucial for protecting the application against common web vulnerabilities: XSS (Cross-Site Scripting) via `httpOnly` cookies, CSRF (Cross-Site Request Forgery) via `SameSite=Strict` cookies, unauthorized cross-origin access via CORS, and brute-force attacks via rate limiting.
*   **Alternatives considered:** Omitting these security measures (leaves the application vulnerable to critical attacks), relying solely on one layer of protection (less robust, not defense-in-depth).

## Research 7: Strategies for account linking (Google + GitHub) within Better-Auth to a single user profile

*   **Decision:** Leverage Better-Auth's built-in account linking feature. This typically involves identifying users by their primary email address across different OAuth providers. When a user signs in with a new OAuth provider, if their verified email address matches an existing `User` profile in the database, Better-Auth should automatically link the new `Account` to the existing `User` profile. This prevents duplicate user entries and provides a seamless user experience.
*   **Rationale:** Account linking provides a user-friendly experience, allowing users to sign in with any of their preferred OAuth providers while maintaining a single, unified profile. This is crucial for collecting user preferences and learning progress under one identity.
*   **Alternatives considered:** Creating separate user profiles for each OAuth provider (poor user experience, data fragmentation, harder to manage), manually merging accounts (complex, error-prone, not scalable).

