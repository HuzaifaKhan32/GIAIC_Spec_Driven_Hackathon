# Atomic Task List for Physical AI & Humanoid Robotics Textbook

**Project**: Physical AI & Humanoid Robotics Textbook
**Deadline**: Dec 7, 11:59 PM
**Context**: Generated via /sp.tasks

## Phase 1: 001-Docusaurus-Homepage-Setup (Foundation)

- [x] TASK-01-01 Create Docusaurus project with Typescript in `docusaurus/`
- [x] TASK-01-02 Install project dependencies (react, react-dom, clsx, etc.) in `docusaurus/package.json`
- [x] TASK-01-03 Configure `docusaurus/docusaurus.config.js` with project metadata and plugins
- [x] TASK-01-04 [P] Clean up default Docusaurus generated pages and components in `docusaurus/src/`
- [x] TASK-01-05 Extract dark theme colors from design to `docusaurus/src/css/custom.css`
- [x] TASK-01-06 Create light theme color palette in `docusaurus/src/css/custom.css`
- [x] TASK-01-07 Implement `Header` component structure in `docusaurus/src/components/Header/index.tsx`
- [x] TASK-01-08 Implement `Header` styling in `docusaurus/src/components/Header/Header.module.css`
- [x] TASK-01-09 Implement `Footer` component structure in `docusaurus/src/components/Footer/index.tsx`
- [x] TASK-01-10 Implement `Footer` styling in `docusaurus/src/components/Footer/Footer.module.css`
- [x] TASK-01-11 Implement `useTheme` hook for localStorage persistence in `docusaurus/src/hooks/useTheme.ts`
- [x] TASK-01-12 Implement `ThemeToggle` component in `docusaurus/src/components/ThemeToggle/index.tsx`
- [x] TASK-01-13 Build Homepage layout matching `screen.png` in `docusaurus/src/pages/index.js`
- [x] TASK-01-14 [P] Implement responsive media queries (320px, 768px) in `docusaurus/src/css/responsive.css`
- [x] TASK-01-15 Verify accessibility (WCAG AA) and Lighthouse score > 90

## Phase 2: 002-Create-Robotics-Book-Chapters (Content)

- [x] TASK-02-01 [P] Create folder structure for chapters in `docusaurus/docs/`
- [x] TASK-02-02 Write Chapter 1: Introduction to Physical AI in `docusaurus/docs/01-intro-physical-ai.md`
- [x] TASK-02-03 Write Chapter 2: Sensors and Actuators in `docusaurus/docs/02-sensors-actuators.md`
- [x] TASK-02-04 Write Chapter 3: Kinematics and Dynamics in `docusaurus/docs/03-kinematics-dynamics.md`
- [x] TASK-02-05 Write Chapter 4: Computer Vision for Robotics in `docusaurus/docs/04-computer-vision.md`
- [x] TASK-02-06 Write Chapter 5: Reinforcement Learning Basics in `docusaurus/docs/05-rl-basics.md`
- [x] TASK-02-07 Write Chapter 6: Sim2Real Transfer in `docusaurus/docs/06-sim2real.md`
- [x] TASK-02-08 Write Chapter 7: Humanoid Locomotion in `docusaurus/docs/07-humanoid-locomotion.md`
- [x] TASK-02-09 Write Chapter 8: Manipulation and Grasping in `docusaurus/docs/08-manipulation.md`
- [x] TASK-02-10 Write Chapter 9: Human-Robot Interaction in `docusaurus/docs/09-hri.md`
- [x] TASK-02-11 Write Chapter 10: Future of Humanoids in `docusaurus/docs/10-future.md`
- [x] TASK-02-12 [P] Compile Glossary of terms from all chapters in `docusaurus/docs/glossary.md`
- [x] TASK-02-13 Validate all internal links and image references

## Phase 3: 005-Custom-CSS-Theme-System (Styling)

- [x] TASK-05-01 Define root CSS variables for colors/spacing in `docusaurus/src/css/custom.css`
- [x] TASK-05-02 Implement Dark Mode specific overrides in `docusaurus/src/css/custom.css`
- [x] TASK-05-03 Implement Light Mode specific overrides in `docusaurus/src/css/custom.css`
- [x] TASK-05-04 [P] Create typography styles (headings, body) in `docusaurus/src/css/custom.css`
- [x] TASK-05-05 Apply custom styles to Markdown content area in `docusaurus/src/css/chapters.css`
- [x] TASK-05-06 Implement Chatbot widget specific styles in `docusaurus/src/css/chatbot.css`
- [x] TASK-05-07 [P] Implement accessibility focus states and reduced motion in `docusaurus/src/css/accessibility.css`
- [ ] TASK-05-08 Verify Zero-Flicker script in `docusaurus/docusaurus.config.js` or `src/theme/Root.js` (Manual Verification Required)

## Phase 4: 003-RAG-Chatbot-Backend (API)

- [x] TASK-03-01 Initialize Python/FastAPI project in `backend/`
- [x] TASK-03-02 Install dependencies (fastapi, qdrant-client, google-generativeai) in `backend/requirements.txt`
- [x] TASK-03-03 Configure Environment Variables (.env) for Gemini API and Qdrant
- [x] TASK-03-04 Implement Qdrant client connection in `backend/src/vector_db.py`
- [x] TASK-03-05 Implement Gemini 2.5 Flash client in `backend/src/llm_client.py`
- [x] TASK-03-06 Create document ingestion script to parse MDX from `docusaurus/docs/` in `backend/scripts/ingest.py`
- [ ] TASK-03-07 [P] Run ingestion script to populate Qdrant vector store (Manual Execution Required)
- [x] TASK-03-08 Implement `POST /chat` endpoint in `backend/src/main.py`
- [x] TASK-03-09 Implement RAG logic (Retrieve -> Augment -> Generate) in `backend/src/rag_engine.py`
- [x] TASK-03-10 Add health check endpoint `GET /health` in `backend/src/main.py`

## Phase 5: 004-Embedded-Chatbot-Widget (Frontend)

- [ ] TASK-04-01 Create Chatbot Widget container component in `docusaurus/src/components/Chatbot/index.tsx`
- [ ] TASK-04-02 Implement chat input and message list UI in `docusaurus/src/components/Chatbot/ChatUI.tsx`
- [ ] TASK-04-03 Implement API client service to fetch from backend in `docusaurus/src/services/chatService.ts`
- [ ] TASK-04-04 [P] Add loading state (typing indicator) and error handling in `docusaurus/src/components/Chatbot/ChatUI.tsx`
- [ ] TASK-04-05 Integrate Chatbot into global layout via `docusaurus/src/theme/Layout.js` wrapper
- [ ] TASK-04-06 Style Chatbot to match Custom CSS Theme in `docusaurus/src/css/chatbot.css`

## Phase 6: 006-OAuth-Authentication (Better-Auth)

- [ ] TASK-06-01 Install Better-Auth dependencies in `docusaurus/package.json`
- [ ] TASK-06-02 Configure Better-Auth client in `docusaurus/src/auth/client.ts`
- [ ] TASK-06-03 [BONUS-1] Create User Background Questionnaire component in `docusaurus/src/components/Auth/Questionnaire.tsx`
- [ ] TASK-06-04 [BONUS-2] Implement Content Personalization Toggle (Beginner/Advanced) in `docusaurus/src/components/Header/Personalization.tsx`
- [ ] TASK-06-05 [BONUS-3] Implement Urdu Translation service integration in `docusaurus/src/services/translationService.ts`
- [ ] TASK-06-06 Create Login/Signup page in `docusaurus/src/pages/login.tsx`
- [ ] TASK-06-07 Protect specific routes/features based on auth state in `docusaurus/src/components/Auth/ProtectedRoute.tsx`

## Phase 7: 007-Deployment-Pipeline (Final)

- [ ] TASK-07-01 Configure Vercel deployment settings (docusaurus preset) in `vercel.json`
- [ ] TASK-07-02 Create GitHub Action for CI (lint, build) in `.github/workflows/ci.yml`
- [ ] TASK-07-03 Create GitHub Action for CD (deploy to Vercel) in `.github/workflows/cd.yml`
- [ ] TASK-07-04 [P] Run final production build locally to verify assets
- [ ] TASK-07-05 Perform User Acceptance Testing (UAT) walk-through
