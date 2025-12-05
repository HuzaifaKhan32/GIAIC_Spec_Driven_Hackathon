# Feature Specification: Authentication - Better-Auth with Google + GitHub OAuth

**Feature Branch**: `006-oauth-authentication`  
**Created**: 2025-12-04
**Status**: Draft  
**Input**: User description: "Feature: Authentication - Better-Auth with Google + GitHub OAuth Intent: Production-grade auth with zero manual JWT Framework: Better-Auth (TypeScript) Database: Prisma ORM OAuth Providers: Google + GitHub (primary auth) Session: Automatic cookie-based (httpOnly, Secure, SameSite=Strict) Auth Flow: User lands -> Choose Google/GitHub -> OAuth -> Session created -> useSession() hook Better-Auth Tables (Prisma): - User (id, email, name, image, createdAt) - Account (userId, provider, providerAccountId, accessToken, refreshToken) - Session (userId, token, expiresAt) - UserPreferences (userId, theme, notificationsEnabled, language) - LearningProgress (userId, chaptersCompleted, timeSpentMinutes) Frontend Hooks: - useSession() -> returns {data: {user, session}, isPending} - signIn("google") / signIn("github") - signOut() Built-in Endpoints (Better-Auth): POST /api/auth/signin POST /api/auth/callback POST /api/auth/signout GET /api/auth/session Custom Endpoints (for learning): GET /api/learning/progress POST /api/learning/progress/update PUT /api/user/preferences Environment Variables: BETTER_AUTH_SECRET, BETTER_AUTH_URL GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET DATABASE_URL Security: - HTTPS only (Vercel) - httpOnly cookies (XSS protection) - SameSite=Strict (CSRF protection) - CORS: Vercel domain only - Rate limiting: 5 attempts/15 min - Account linking: Connect multiple providers Protected Routes: /profile, /chat/history, /bookmarks, /progress, /api/learning/* Testing: - User signs in with Google -> Session created - User signs in with GitHub -> Can link to same account - Theme preference saved and persists - Learning progress tracked - Logout clears session - Unauthenticated -> Redirected to login Acceptance Criteria: - Better-Auth configured and working - Google OAuth end-to-end - GitHub OAuth end-to-end - Sessions persist across reloads - Preferences saved to database - Protected routes working - No manual JWT needed Reference: constitution.md Section 13, 2.2"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sign in with OAuth Provider (Priority: P1)

As a new or returning user, I want to securely sign in to the website using my existing Google or GitHub account to access personalized features.

**Why this priority**: Core user authentication is foundational for personalized experiences.

**Independent Test**: This can be tested by attempting sign-in flows with both Google and GitHub, and verifying successful session creation.

**Acceptance Scenarios**:

1. **Given** I am on the website's login page, **When** I click the "Sign in with Google" button, **Then** I am securely redirected to Google's authentication page.
2. **Given** I successfully authenticate with my Google account, **When** I am redirected back to the website, **Then** a secure user session is established, and I am logged in.
3. **Given** I am on the website's login page, **When** I click the "Sign in with GitHub" button, **Then** I am securely redirected to GitHub's authentication page.
4. **Given** I successfully authenticate with my GitHub account, **When** I am redirected back to the website, **Then** a secure user session is established, and I am logged in.

---


### User Story 2 - Manage User Account and Preferences (Priority: P2)

As an authenticated user, I want to manage my account by linking multiple OAuth providers and ensuring my personalized preferences are saved and retrieved.

**Why this priority**: Enhances user flexibility and customizability.

**Independent Test**: This can be tested by logging in with one provider, then attempting to link another, and by modifying and verifying preference persistence.

**Acceptance Scenarios**:

1. **Given** I am logged in with my Google account, **When** I initiate the sign-in process with my GitHub account using the same email address, **Then** my GitHub account is successfully linked to my existing user profile without creating a new user.
2. **Given** I update a user preference (e.g., theme, notification settings) in my profile, **When** the preference is saved, **Then** this preference is retrieved and applied correctly in subsequent sessions.

---


### User Story 3 - Access Protected Resources (Priority: P3)

As an authenticated user, I want to access content and features that are restricted to logged-in users, while unauthenticated users should be redirected to login.

**Why this priority**: Ensures data security and proper access control.

**Independent Test**: This can be tested by attempting to navigate to protected routes both as an authenticated and unauthenticated user.

**Acceptance Scenarios**:

1. **Given** I am an authenticated user, **When** I navigate to a protected route (e.g., `/profile`, `/chat/history`, `/api/learning/progress`), **Then** I am granted access to the content without being prompted to log in again.
2. **Given** I am an unauthenticated user, **When** I attempt to access a protected route, **Then** I am automatically redirected to the designated login page.
3. **Given** I am an authenticated user, **When** I click "Sign Out", **Then** my session is cleared, and I am logged out.

### Edge Cases

- What happens if an OAuth provider is temporarily unavailable during the sign-in process?
- How does the system handle a user attempting to link a new OAuth provider whose email address doesn't match an existing account?
- What are the specific error messages or user feedback provided for failed login attempts (e.g., due to rate limiting)?
- How is the user informed if their session has expired due to inactivity?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST implement a robust authentication solution using the Better-Auth framework.
- **FR-002**: The system MUST support user authentication via Google OAuth provider.
- **FR-003**: The system MUST support user authentication via GitHub OAuth provider.
- **FR-004**: User sessions MUST be managed automatically using secure, cookie-based mechanisms (httpOnly, Secure, SameSite=Strict).
- **FR-005**: The authentication flow MUST guide users through choosing an OAuth provider, completing the external authentication, and establishing a new session upon successful return.
- **FR-006**: The system MUST utilize Prisma ORM for database interactions, managing `User`, `Account`, `Session`, `UserPreferences`, and `LearningProgress` tables as described in the schema.
- **FR-007**: The frontend MUST provide dedicated hooks for session management (`useSession()`) and authentication actions (`signIn("google")`, `signIn("github")`, `signOut()`).
- **FR-008**: The system MUST leverage Better-Auth's built-in API endpoints for authentication processes: `POST /api/auth/signin`, `POST /api/auth/callback`, `POST /api/auth/signout`, `GET /api/auth/session`.
- **FR-009**: The system MUST include custom API endpoints for user-specific data: `GET /api/learning/progress`, `POST /api/learning/progress/update`, `PUT /api/user/preferences`.
- **FR-010**: All required environment variables (`BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `DATABASE_URL`) MUST be securely configured.
- **FR-011**: Security measures MUST include HTTPS-only communication, httpOnly cookies (for XSS protection), SameSite=Strict cookies (for CSRF protection), and CORS restricted to the designated Vercel domain.
- **FR-012**: The authentication system MUST implement rate limiting for login attempts (e.g., 5 attempts within a 15-minute window per IP address).
- **FR-013**: The system MUST support linking multiple OAuth provider accounts to a single user profile.
- **FR-014**: The following routes MUST be protected and accessible only to authenticated users: `/profile`, `/chat/history`, `/bookmarks`, `/progress`, and all endpoints under `/api/learning/*`.

### Key Entities *(include if feature involves data)*

- **User**: Represents a unique user profile within the system.
  - Attributes: `id` (string), `email` (string, unique), `name` (string), `image` (string, URL), `createdAt` (datetime).
- **Account**: Represents an external OAuth provider account linked to a User.
  - Attributes: `userId` (string, foreign key to User), `provider` (string, e.g., "google", "github"), `providerAccountId` (string, unique to provider), `accessToken` (string), `refreshToken` (string).
- **Session**: Represents an active user session.
  - Attributes: `userId` (string, foreign key to User), `token` (string, session identifier), `expiresAt` (datetime).
- **UserPreferences**: Stores personalized settings for a User.
  - Attributes: `userId` (string, foreign key to User), `theme` (string, e.g., "dark", "light"), `notificationsEnabled` (boolean), `language` (string).
- **LearningProgress**: Tracks a User's progress through educational content.
  - Attributes: `userId` (string, foreign key to User), `chaptersCompleted` (array of chapter IDs), `timeSpentMinutes` (integer).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Better-Auth framework is fully configured, deployed, and provides secure, production-grade authentication without requiring manual JWT handling.
- **SC-002**: End-to-end user authentication using Google OAuth is successfully implemented and passes all functional tests.
- **SC-003**: End-to-end user authentication using GitHub OAuth is successfully implemented and passes all functional tests.
- **SC-004**: User sessions are consistently maintained and persist across browser reloads and navigation.
- **SC-005**: User preferences (e.g., theme) are successfully saved to the database via `PUT /api/user/preferences` and accurately retrieved upon subsequent user logins.
- **SC-006**: All specified protected routes (`/profile`, `/chat/history`, `/bookmarks`, `/progress`, `/api/learning/*`) correctly enforce authentication, preventing access for unauthenticated users and redirecting them to the login page.
- **SC-007**: Account linking functionality allows a user to connect multiple OAuth providers to a single profile without data conflicts.