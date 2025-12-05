# Quickstart: Authentication - Better-Auth with Google + GitHub OAuth

This document outlines how to quickly set up and integrate the Better-Auth authentication system with Google and GitHub OAuth providers.

## 1. Environment Setup

### 1.1 Obtain OAuth Credentials

You will need to register your application with both Google and GitHub to obtain `Client ID` and `Client Secret`.

-   **Google:**
    1.  Go to [Google Cloud Console](https://console.cloud.google.com/).
    2.  Create a new project or select an existing one.
    3.  Navigate to "APIs & Services" > "Credentials".
    4.  Create "OAuth client ID" for "Web application".
    5.  Configure "Authorized JavaScript origins" (e.g., your local development URL and Vercel deployment URL).
    6.  Configure "Authorized redirect URIs" (e.g., `http://localhost:3000/api/auth/callback/google` and your Vercel callback URL).
    7.  Obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

-   **GitHub:**
    1.  Go to [GitHub Developer Settings](https://github.com/settings/developers).
    2.  Register a new OAuth Application.
    3.  Set "Homepage URL" (e.g., your local development URL and Vercel deployment URL).
    4.  Set "Authorization callback URL" (e.g., `http://localhost:3000/api/auth/callback/github` and your Vercel callback URL).
    5.  Obtain `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.

### 1.2 Environment Variables

Create a `.env` file in the root of your Docusaurus project (or where your Better-Auth instance is deployed) based on `.env.example`.

```dotenv
# Better-Auth Configuration
BETTER_AUTH_SECRET="YOUR_BETTER_AUTH_SECRET" # A long, random string
BETTER_AUTH_URL="http://localhost:3000" # Your application's base URL (e.g., for local, or Vercel deployment)

# Google OAuth
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

# GitHub OAuth
GITHUB_CLIENT_ID="YOUR_GITHUB_CLIENT_ID"
GITHUB_CLIENT_SECRET="YOUR_GITHUB_CLIENT_SECRET"

# Database (for Prisma ORM)
DATABASE_URL="postgresql://user:password@host:port/database" # Your PostgreSQL connection string
```

## 2. Backend Setup (Better-Auth & Prisma)

### 2.1 Prisma Schema (`prisma/schema.prisma`)

Define your Prisma schema, including the `User`, `Account`, `Session` models as required by Better-Auth's Prisma adapter, and extend it with `UserPreferences` and `LearningProgress` models.

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // Or your chosen database
  url      = env("DATABASE_URL")
}

// Better-Auth User model
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
  preferences   UserPreferences? // One-to-one relation
  learningProgress LearningProgress? // One-to-one relation
}

// Better-Auth Account model
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String // "oauth"
  provider          String
  providerAccountId String // Unique ID from OAuth provider
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

// Better-Auth Session model
model Session {
  id           String    @id @default(cuid())
  sessionToken String @unique
  userId       String
  expires      DateTime
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Custom UserPreferences model
model UserPreferences {
  id                   String    @id @default(cuid())
  userId               String    @unique
  theme                String    @default("system") // "dark", "light", "system"
  notificationsEnabled Boolean   @default(true)
  language             String    @default("en")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Custom LearningProgress model
model LearningProgress {
  id               String    @id @default(cuid())
  userId           String    @unique
  chaptersCompleted String[]  // Array of chapter IDs
  timeSpentMinutes Int       @default(0)

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 2.2 Run Prisma Migrations

Apply the schema changes to your database:

```bash
npx prisma migrate dev --name init_better_auth_schema
```

### 2.3 Better-Auth Integration

Follow Better-Auth's specific setup instructions for your chosen framework (e.g., Next.js API routes if Docusaurus extends a Next.js setup, or a dedicated Node.js serverless function). This will involve configuring the providers and setting up the API endpoints.

## 3. Frontend Integration (Docusaurus/React)

### 3.1 Better-Auth Frontend Hooks

Integrate the `useSession()`, `signIn("provider")`, and `signOut()` hooks into your React components.

```tsx
// Example use of hooks in a React component
import { useSession, signIn, signOut } from 'better-auth/react'; // Adjust import based on actual Better-Auth client library

function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
    </>
  );
}
```

### 3.2 Protected Routes

Implement route guards or middleware in your frontend framework (e.g., React Router) to redirect unauthenticated users from protected routes like `/profile`, `/chat/history`, etc., to the login page.

## 4. Custom Backend Endpoints (FastAPI)

For custom endpoints (`/api/learning/progress`, `/api/learning/progress/update`, `/api/user/preferences`) in your FastAPI backend (`chatbot-api`), you will need to implement session verification.

```python
# chatbot-api/app/api/dependencies.py
from fastapi import Depends, HTTPException, status
from better_auth_sdk.session import verify_session # Assuming a Python SDK for Better-Auth exists or implement directly

async def get_current_user(session_token: str = Depends(get_session_cookie)): # Placeholder for cookie extraction
    try:
        user_info = await verify_session(session_token) # Call Better-Auth for verification
        return user_info
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# chatbot-api/app/api/learning.py
from fastapi import APIRouter, Depends
from .dependencies import get_current_user

router = APIRouter()

@router.get("/progress")
async def get_progress(current_user: dict = Depends(get_current_user)):
    # Logic to retrieve learning progress for current_user['id']
    return {"message": f"Learning progress for user {current_user['id']}"}
```

## 5. Security Configuration

-   **HTTPS**: Ensure your deployment platform (Vercel) enforces HTTPS.
-   **CORS**: Configure `CORSMiddleware` in FastAPI to allow only your Vercel frontend domain.
-   **Rate Limiting**: Implement rate limiting using FastAPI middleware or a reverse proxy for protection against abuse.
