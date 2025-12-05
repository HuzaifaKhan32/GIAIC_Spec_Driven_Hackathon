# Constitution.md
## Physical AI & Humanoid Robotics Textbook

**Project Type:** AI-Native Spec-Driven Educational Platform  
**Stack:** Node.js + TypeScript (UI), Python (Intelligence), Docusaurus, OpenAI Agents SDK, Qdrant, Vercel  
**Deployment:** Vercel + Cloud Services  
**Spec-Kit:** Plus Edition with Custom CSS & RAG Integration

---

## 1. PROJECT OVERVIEW

### 1.1 Vision
Create an **AI-Native interactive textbook** on Physical AI & Humanoid Robotics that combines:
- Comprehensive educational content in Docusaurus
- Intelligent RAG-powered chatbot answering questions from book content
- Custom UI designs optimized for learning
- Spec-driven architecture with reusable Gemini CLI skills

### 1.2 Core Deliverables
1. **Book Website** - Static/SSG site built with Docusaurus deployed on Vercel
2. **RAG Chatbot System** - OpenAI Agents SDK + FastAPI backend + Qdrant vector DB
3. **Chatbot Integration** - Embedded React component in Docusaurus pages
4. **Custom Styling** - Docusaurus-compatible CSS replacing Tailwind
5. **Gemini CLI Skills** (Bonus) - Reusable agent subagents for domain-specific tasks

---

## 2. TECHNOLOGY STACK

### 2.1 Frontend & Documentation
```
Framework:     Docusaurus 3.x (React-based static site generator)
Styling:       Custom CSS (no Tailwind - full Docusaurus compatibility)
UI Components: React + MDX
Deployment:    Vercel
TypeScript:    For type-safe React components
```

### 2.2 Backend & Intelligence
```
Framework:     FastAPI (Python 3.10+)
LLM Model:     Gemini 2.5 Flash (Free tier via Google AI API)
Vector DB:     Qdrant Cloud (Free Tier)
Embeddings:    Google Gemini Embeddings API
RAG Pipeline:  LangChain / Custom implementation
Deployment:    Cloud service (Railway/Render/Vercel Functions)

Authentication: Better-Auth (TypeScript)
- OAuth Providers: Google + GitHub
- Session Management: Automatic cookie-based
- Database: Prisma ORM
```

### 2.3 Bonus Intelligence Layer
```
CLI Tool:      Gemini CLI
Subagents:     Reusable skill modules
Skills:        Chapter Summarizer, Code Explainer, Concept Mapper
Pattern:       Matrix-style skill loading on-demand
```

---

## 3. PROJECT STRUCTURE

```
physical-ai-textbook/
│
├── docusaurus/                    # Main book website
│   ├── docs/                      # Book chapters & content
│   │   ├── intro/
│   │   ├── fundamentals/
│   │   ├── applications/
│   │   ├── advanced/
│   │   └── resources/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatbotWidget/    # Embedded chatbot UI
│   │   │   ├── HomePage/         # Custom homepage
│   │   │   └── CustomLayouts/
│   │   ├── css/
│   │   │   ├── custom.css        # Global custom styles
│   │   │   ├── chatbot.css       # Chatbot styling
│   │   │   ├── homepage.css      # Homepage styling
│   │   │   └── responsive.css    # Mobile optimization
│   │   ├── pages/
│   │   │   └── index.js          # Homepage JSX
│   │   └── theme/
│   │       └── SearchBar/        # Custom search with chatbot
│   ├── static/                    # Static assets & design files
│   │   └── designs/              # UI design references
│   ├── docusaurus.config.js      # Configuration
│   ├── package.json
│   └── README.md
│
├── chatbot-api/                   # FastAPI Backend
│   ├── main.py                    # FastAPI entry point
│   ├── agents/
│   │   ├── rag_agent.py          # RAG agent using OpenAI SDK
│   │   ├── document_processor.py # Chunk & embed documents
│   │   └── query_handler.py      # Query processing
│   ├── qdrant/
│   │   ├── client.py             # Qdrant vector DB client
│   │   └── vectorstore.py        # Vector store operations
│   ├── models/
│   │   ├── schemas.py            # Pydantic models
│   │   └── responses.py          # API response formats
│   ├── routers/
│   │   ├── chat.py               # Chat endpoints
│   │   ├── documents.py          # Document upload endpoints
│   │   └── health.py             # Health check
│   ├── config.py                 # Configuration
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── skills/                        # Gemini CLI Skills (Bonus)
│   ├── chapter_summarizer.json   # Skill definition
│   ├── code_explainer.json
│   ├── concept_mapper.json
│   └── README.md
│
├── design/                        # UI Design References
│   ├── homepage/
│   │   ├── code.html             # Homepage HTML/CSS code
│   │   └── screen.png            # Homepage design screenshot
│   ├── chapter_page/
│   │   ├── code.html             # Chapter page HTML/CSS code
│   │   └── screen.png            # Chapter page design screenshot
│   └── chatbot_ui/
│       ├── code.html             # Chatbot UI HTML/CSS code
│       └── screen.png            # Chatbot UI design screenshot
│
├── .github/
│   └── workflows/
│       ├── deploy-book.yml       # Vercel deployment
│       └── test-api.yml          # API testing
│
├── constitution.md               # This file
└── README.md                      # Project documentation
```

---

## 4. FUNCTIONAL SPECIFICATIONS

### 4.1 Book Website (Docusaurus)

#### 4.1.1 Homepage
- **Design Source:** `design/homepage_design.html`
- **Content:**
  - Compelling hero section with book title
  - Quick navigation to book sections
  - Featured chapters carousel
  - Chatbot teaser/call-to-action
- **Custom CSS:** All Tailwind classes converted to custom CSS
- **Responsive:** Mobile, tablet, desktop layouts
- **Navigation:** Integrated search + chatbot quick access

#### 4.1.2 Book Structure
- **Chapters:** 10-12 comprehensive chapters
  - Introduction to Physical AI
  - Humanoid Robotics Fundamentals
  - Hardware Systems
  - Software Architecture
  - Computer Vision
  - Motion Control
  - AI Integration
  - Real-world Applications
  - Case Studies
  - Future Perspectives
- **Format:** Markdown (.md) with MDX for interactive components
- **Metadata:** Each chapter has tags, difficulty level, estimated read time
- **Cross-linking:** Internal links between related concepts

#### 4.1.3 Embedded Chatbot Widget
- **Placement:** 
  - Fixed position (bottom-right or sidebar)
  - Optional full-screen mode
  - Integrated in search results
- **Features:**
  - Ask questions about book content
  - Highlight text and ask specific questions
  - Display relevant chapter references
  - Conversation history
- **Custom CSS Design:** Based on `design/chatbot_ui_design.html`
- **Accessibility:** ARIA labels, keyboard navigation

### 4.2 RAG Chatbot System (FastAPI + OpenAI)

#### 4.2.1 Architecture
```
User Query (Frontend)
    ↓
Docusaurus Chatbot Widget
    ↓
FastAPI Endpoint (/chat)
    ↓
Gemini 2.5 Flash LLM (Query Understanding & Response)
    ↓
Qdrant Vector DB (Semantic Search)
    ↓
Context Retrieval (Top-K relevant chunks)
    ↓
Gemini 2.5 Flash (Context-Aware Response Generation)
    ↓
Response to User with Citations
```

#### 4.2.2 Key Endpoints
```
POST /chat/query
  Input: { query: string, context?: string }
  Output: { response: string, sources: [], confidence: number }

POST /chat/history
  Input: { session_id: string }
  Output: { messages: [], summary: string }

POST /documents/upload
  Input: FormData with PDF/Markdown files
  Output: { document_id: string, chunks: number, status: string }

POST /documents/process
  Input: { document_id: string }
  Output: { chunks_embedded: number, collection: string }

GET /health
  Output: { status: string, services: {} }
```

#### 4.2.3 RAG Pipeline
1. **Document Ingestion:**
   - Accept markdown/PDF from Docusaurus build
   - Chunk documents (500-1000 tokens per chunk)
   - Add metadata (chapter, section, page)

2. **Embedding:**
   - Use Google Gemini Embeddings API
   - Store vectors in Qdrant Cloud
   - Create indexes for fast retrieval

3. **Retrieval:**
   - Embed user query using Gemini API
   - Search Qdrant for semantic matches
   - Return top-5 relevant chunks with scores

4. **Generation:**
   - Pass retrieval results to Gemini 2.5 Flash
   - Generate contextual response with system prompt
   - Include source citations with chapter references

5. **Memory:**
   - Session-based conversation history
   - Context window management (last 10 messages)
   - User-specific learning preferences

### 4.3 Custom CSS System

#### 4.3.1 Design Conversion
- **Input:** Tailwind classes from design files
- **Output:** Custom CSS modules for Docusaurus
- **Files to Create:**
  ```
  src/css/
  ├── custom.css           # Global styles & variables
  ├── homepage.css         # Homepage-specific
  ├── chapters.css         # Chapter page styles
  ├── chatbot.css          # Chatbot widget
  ├── components.css       # Reusable components
  ├── responsive.css       # Mobile breakpoints
  └── animations.css       # Transitions & effects
  ```

#### 4.3.2 CSS Variables (Root)
```css
:root {
  --primary-color: #0066cc;
  --secondary-color: #00cc66;
  --accent-color: #ff6600;
  --bg-light: #f9f9f9;
  --bg-dark: #1a1a1a;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border-radius: 8px;
  --transition-duration: 0.3s;
  
  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

### 4.4 Bonus: Gemini CLI Skills

#### 4.4.1 Skill Architecture
```
User Query about Chapter
    ↓
Query Type Classification
    ↓
Load Relevant Skill (Subagent)
    ↓
Skill Execution (Reasoning)
    ↓
Result Integration into Response
```

#### 4.4.2 Defined Skills
1. **Chapter Summarizer Skill**
   - Input: Chapter content, summary length
   - Output: Concise summary with key points
   - Use: Quick chapter reviews

2. **Code Explainer Skill**
   - Input: Code snippet from book
   - Output: Line-by-line explanation
   - Use: Understanding implementation examples

3. **Concept Mapper Skill**
   - Input: Concept name
   - Output: Related concepts, dependencies, visual map
   - Use: Learning connections

---

## 5. UI DESIGN SPECIFICATIONS

### 5.1 Design System
- **Source Files:** `/design/` folder with subfolders
  - `homepage/code.html` + `homepage/screen.png` → Homepage
  - `chapter_page/code.html` + `chapter_page/screen.png` → Chapters page
  - `chatbot_ui/code.html` + `chatbot_ui/screen.png` → Chatbot widget

### 5.2 Theme Support: Dark & Light Mode

**Design Sources:**
- **Dark Theme:** Extract directly from `/design/*/code.html` (already provided in design files)
- **Light Theme:** Create as inverse/adaptation of dark theme

**Implementation Requirements:**

**Dark Theme (Primary):**
- Extract styling from design folder HTML/CSS
- Use as-is for dark mode implementation
- Maintain visual hierarchy and component structure from design

**Light Theme (Create New):**
- Invert color scheme for readability
- Generate light background colors
- Ensure sufficient contrast for accessibility (WCAG AA)
- Maintain same component structure as dark theme

**Theme Colors Example:**
```
Dark Theme (From Design):
- Background: #0f0f0f, #1a1a1a (as provided)
- Text: #f0f0f0, #e0e0e0 (as provided)
- Accents: Based on design file colors

Light Theme (Create):
- Background: #ffffff, #f5f5f5
- Text: #1a1a1a, #333333
- Accents: Adjusted for light backgrounds
```

**Implementation:**
- CSS variables with theme switching via class toggle
- `data-theme="light"` and `data-theme="dark"` attributes
- localStorage persistence for user preference
- System preference detection (prefers-color-scheme)
- Theme toggle button in header/navigation

### 5.3 Header & Footer Styling

**Header Component:**
- Style exactly as shown in design folder (`/design/*/code.html`)
- Must include:
  - Logo/Title on left
  - Navigation menu (links to book sections)
  - Theme toggle button (dark/light mode switcher)
  - Search bar (optional, or integrated with chat)
  - User profile dropdown (if authenticated)
  - Mobile menu hamburger icon
- Apply design styling to both light and dark themes
- Keep same structure from design; only invert colors for light theme

**Footer Component:**
- Style exactly as shown in design folder
- Must include:
  - Links to chapters/sections
  - Social media links
  - Copyright notice
  - Privacy & Terms links
  - Contact information
- Maintain design layout and spacing
- Mirror header color treatment for both themes

**Styling Rules:**
- Use design HTML/CSS as structural reference
- Extract component classes and styling
- Convert Tailwind to custom CSS for Docusaurus compatibility
- Ensure header/footer visible on all pages
- Sticky header (optional, if shown in design)
- Responsive for mobile (hamburger menu for small screens)

### 5.4 Design Conversion Rules
1. Extract all Tailwind classes
2. Convert to semantic custom CSS
3. Maintain design intent & responsiveness
4. Test across breakpoints (mobile: 320px, tablet: 768px, desktop: 1024px)
5. Ensure accessibility (contrast ratios, focus states)

### 5.3 Design Conversion Rules
1. Extract all Tailwind classes from `/design/*/code.html`
2. Convert to semantic custom CSS with theme variables
3. Maintain design intent & responsiveness for both themes
4. Test across breakpoints (mobile: 320px, tablet: 768px, desktop: 1024px)
5. Ensure accessibility (contrast ratios meet WCAG for both themes, focus states)
6. Generate screenshot comparisons (light vs dark modes)

### 5.4 CSS Theme Variables Structure
```css
:root {
  /* Light Theme (Default) */
  --bg-primary: #ffffff;
  --bg-secondary: #f9f9f9;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --accent-primary: #0066cc;
  --accent-secondary: #00cc66;
  
  /* Dark Theme */
  --dark-bg-primary: #0f0f0f;
  --dark-bg-secondary: #1a1a1a;
  --dark-text-primary: #f0f0f0;
  --dark-text-secondary: #b0b0b0;
  --dark-border-color: #333333;
  --dark-accent-primary: #4d9aff;
  --dark-accent-secondary: #4dffb3;
}

[data-theme="dark"] {
  --bg-primary: var(--dark-bg-primary);
  --bg-secondary: var(--dark-bg-secondary);
  --text-primary: var(--dark-text-primary);
  --text-secondary: var(--dark-text-secondary);
  --border-color: var(--dark-border-color);
  --accent-primary: var(--dark-accent-primary);
  --accent-secondary: var(--dark-accent-secondary);
}
```

### 5.4 Design Conversion Rules
1. Extract all Tailwind classes from `/design/*/code.html`
2. Convert to semantic custom CSS with theme variables
3. **Dark Theme:** Use design colors as primary implementation
4. **Light Theme:** Create inverted/adapted color scheme
5. Maintain design intent & responsiveness for both themes
6. Test across breakpoints (mobile: 320px, tablet: 768px, desktop: 1024px)
7. Ensure accessibility (contrast ratios meet WCAG for both themes, focus states)
8. Generate screenshot comparisons (light vs dark modes)

### 5.5 CSS Theme Variables Structure
```css
:root {
  /* Light Theme (Inverse of Dark) */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --accent-primary: #0066cc;
  --accent-secondary: #00cc66;
  
  /* Dark Theme (From Design Files) */
  --dark-bg-primary: #0f0f0f;
  --dark-bg-secondary: #1a1a1a;
  --dark-text-primary: #f0f0f0;
  --dark-text-secondary: #b0b0b0;
  --dark-border-color: #333333;
  --dark-accent-primary: #4d9aff;
  --dark-accent-secondary: #4dffb3;
}

/* Apply dark theme when selected */
[data-theme="dark"] {
  --bg-primary: var(--dark-bg-primary);
  --bg-secondary: var(--dark-bg-secondary);
  --text-primary: var(--dark-text-primary);
  --text-secondary: var(--dark-text-secondary);
  --border-color: var(--dark-border-color);
  --accent-primary: var(--dark-accent-primary);
  --accent-secondary: var(--dark-accent-secondary);
}

/* Header styles aligned with design */
header {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Footer styles aligned with design */
footer {
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
  padding: 2rem 1rem;
  margin-top: 4rem;
}
```

### 5.6 Component Library (Theme-Aware)
- Navigation header
- Chapter card
- Chatbot widget
- Code blocks with syntax highlighting
- Image galleries
- Interactive diagrams
- Citation/reference blocks

---

## 6. DATA SPECIFICATIONS

### 6.1 Document Format
```markdown
---
id: chapter-01
title: Introduction to Physical AI
difficulty: beginner
estimated_time: 15 min
keywords: [AI, robotics, fundamentals]
---

# Introduction to Physical AI

## Overview
...

## Key Concepts
...

## Further Reading
- [[chapter-02]]
- [[chapter-03]]
```

### 6.2 Qdrant Vector Schema
```json
{
  "collection_name": "physical-ai-textbook",
  "vectors": {
    "size": 1536,
    "distance": "Cosine"
  },
  "payload_schema": {
    "chapter_id": "keyword",
    "chapter_title": "text",
    "section": "text",
    "content_chunk": "text",
    "chunk_index": "integer",
    "metadata": "object"
  }
}
```

### 6.3 Chat Message Schema
```python
class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str
    timestamp: datetime
    sources: List[str] = []
    session_id: str
```

---

## 7. DEPLOYMENT SPECIFICATIONS

### 7.1 Book Deployment (Vercel)
```
GitHub Repository → Push to main branch
    ↓
GitHub Actions Workflow (deploy-book.yml)
    ↓
Build: npm run build (in /docusaurus)
    ↓
Deploy to Vercel
    ↓
Live: https://physical-ai-textbook.vercel.app
```

### 7.2 API Deployment
- **Option 1:** Vercel Functions (Python runtime)
- **Option 2:** Railway.app (Docker + Python)
- **Option 3:** Render.com (Free tier)
- **Configuration:**
  - Environment variables: OpenAI API key, Qdrant URL, API key
  - CORS: Allow Vercel domain
  - Rate limiting: 100 requests/minute per IP

### 7.3 Environment Variables
```
# .env (Chatbot API)
GOOGLE_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
QDRANT_URL=https://...qdrant.io
QDRANT_API_KEY=...
QDRANT_COLLECTION=physical-ai-textbook
FRONTEND_URL=https://physical-ai-textbook.vercel.app
DEBUG=false

# Authentication (from hackathon requirements)
JWT_SECRET=your-secret-key
AUTH_PROVIDER=google
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

### 7.4 CI/CD Pipelines
- **Book:** Automatic deployment on push to main
- **API:** Test suite runs on PR, deploy on merge
- **Monitoring:** Health checks every 5 minutes

---

## 8. QUALITY ASSURANCE

### 8.1 Content Quality
- [ ] All chapters proofread and technically accurate
- [ ] Code examples tested and executable
- [ ] Citations and references verified
- [ ] Cross-links validated
- [ ] Markdown formatting consistent

### 8.2 Chatbot Testing
- [ ] Test 50+ sample questions covering all chapters
- [ ] Verify source citations are accurate
- [ ] Check response latency (< 2 seconds)
- [ ] Test with highlighted text queries
- [ ] Validate conversation context handling

### 8.3 UI/UX Testing
- [ ] Responsive design across devices
- [ ] Accessibility: WCAG 2.1 AA compliance
- [ ] Cross-browser compatibility
- [ ] Performance: Lighthouse score > 90
- [ ] User testing with target audience

### 8.4 Performance Metrics
- **Page Load Time:** < 2 seconds (First Contentful Paint)
- **Chat Response Time:** < 2 seconds
- **Chatbot Accuracy:** > 85% relevance
- **Uptime:** > 99.5%

---

## 9. SUCCESS CRITERIA & MARKING RUBRIC

### 9.1 Core Requirements (70 points)
- **Book Content (20 pts):** Comprehensive, well-written chapters
- **RAG Chatbot (25 pts):** Accurate answers from book content
- **Integration (15 pts):** Seamless chatbot embedding in Docusaurus
- **Deployment (10 pts):** Live on Vercel with working API

### 9.2 Enhancement Requirements (20 points)
- **Custom CSS (10 pts):** Design files converted, responsive, accessible
- **UX Design (10 pts):** Intuitive navigation, clear visual hierarchy

### 9.3 Bonus Requirements (10 points)
- **Gemini CLI Skills (10 pts):** Reusable subagents for domain tasks
- **Advanced Features (5 pts):** Additional intelligence, user preferences

**NEW BONUS REQUIREMENTS (50 points each - Hackathon Requirements):**

#### 9.4 Bonus: User Background Questionnaire & Better-Auth (50 bonus points)
- Implement signup/signin using **Better-Auth with Google + GitHub**
- At signup, ask users about their **software and hardware background** through questionnaire:
  - Software experience: Python, JavaScript, C++, etc.
  - Hardware experience: Microcontrollers, Arduino, Raspberry Pi, robotics platforms, etc.
  - Previous robotics or AI experience
  - Learning goals and interests
- Store user background in database
- Use background to **personalize content recommendations**
- Surface relevant chapters based on user background level
- Feature: Display recommended learning path at dashboard

#### 9.5 Bonus: Personalized Content View (50 bonus points)
- Add **"Personalize Content" button** at start of each chapter
- Toggle between:
  - **Beginner view** - Simplified explanations, basic concepts emphasized
  - **Intermediate view** - Standard textbook content
  - **Advanced view** - Deep technical details, research papers, advanced implementations
- Content variants stored for each difficulty level
- User preference saved to database
- Automatically display preferred level on next visit
- Visual indicator showing current content level

#### 9.6 Bonus: Urdu Language Translation (50 bonus points)
- Add **"Translate to Urdu" button** at start of each chapter
- Real-time translation using **Gemini API** (language translation capability)
- Toggle between:
  - **English** (original content)
  - **Urdu** (translated content with proper formatting)
- Translation options:
  - Full chapter translation
  - Key terms glossary in Urdu
  - Preserve code blocks and technical terminology
  - Maintain links and references
- Cache translations for performance
- Language preference saved to user preferences
- Display language toggle in header

**Total Possible Bonus Points: 150 (10 + 10 + 5 + 50 + 50 + 50)**

---

## 10. DEVELOPMENT TIMELINE

### Week 1 (Dec 3-4, Wednesday-Thursday)
- [ ] ✅ Book topic announced: **Physical AI & Humanoid Robotics Textbook**
- [ ] Set up GitHub repository
- [ ] Initialize Docusaurus project
- [ ] Create project structure
- [ ] Start content outline based on announced topic

### Week 2 (Dec 4-6, Thursday-Saturday)
- [ ] Write book chapters
- [ ] Set up FastAPI backend
- [ ] Configure Qdrant Cloud
- [ ] Design custom CSS
- [ ] Build chatbot widget

### Week 3 (Dec 6-7, Saturday-Sunday)
- [ ] Integrate chatbot into Docusaurus
- [ ] RAG pipeline testing
- [ ] Deploy to Vercel
- [ ] Final testing & bug fixes
- [ ] Submit by 11:59 PM Sunday

---

## 11. RESOURCES & REFERENCES

### 11.1 Documentation
- Docusaurus: https://docusaurus.io/
- OpenAI Agents SDK: https://platform.openai.com/docs/agents
- Qdrant: https://qdrant.tech/documentation/
- FastAPI: https://fastapi.tiangolo.com/

### 11.2 Key Technologies
- Node.js 18+
- Python 3.10+
- TypeScript
- React 18+

### 11.3 Learning Resources
- AI-Native development: https://ai-native.panaversity.org/
- Spec-Kit Plus: https://speckit.org/
- Docusaurus advanced features: https://docusaurus.io/docs/markdown-features

---

## 15. NOTES FOR AI AGENTS

### 15.1 Spec-Kit Usage
This constitution is designed to be executed by:
- **Gemini CLI** with subagents
- **Gemini 2.5 Flash** for content generation and RAG responses
- **Code generation:** Use Gemini CLI to scaffold code
- **Integration:** Gemini API handles both intelligence and LLM tasks

### 15.2 Key Implementation Details for Gemini Integration
1. **RAG with Gemini:**
   - Use Gemini embeddings for vector representations
   - Combine retrieved context with Gemini's reasoning
   - System prompts for consistent response style

2. **Theme Implementation:**
   - Use CSS custom properties for both themes
   - Dark/light toggle stored in localStorage
   - Respect system preferences as fallback

3. **Authentication Flow:**
   - Google OAuth for smooth student onboarding
   - JWT tokens for API authentication
   - Verify all protected endpoints

### 15.3 Flexibility
- Adapt based on book topic announced
- Add/remove chapters based on scope
- Adjust skill definitions per requirements
- Optimize performance based on testing

### 15.3 Flexibility
- Adapt based on book topic announced
- Add/remove chapters based on scope
- Adjust skill definitions per requirements
- Optimize performance based on testing

### 15.4 Critical Success Factors
1. **Content Quality:** Time invested in writing is crucial
2. **RAG Accuracy:** Gemini 2.5 Flash is powerful - test various prompts
3. **Theme Consistency:** Dark/light modes must be pixel-perfect
4. **Authentication:** Ensure smooth login/signup UX
5. **User Experience:** Smooth integration & responsive design
6. **Timely Deployment:** Build CI/CD early

---

## 16. DESIGN FOLDER STRUCTURE DETAILS

### 16.1 Design Folder Contents & Usage

**Important:** Design files contain dark theme styling. Implementation must:
1. **Extract Dark Theme** from `/design/*/code.html` as primary styling
2. **Create Light Theme** as inverse/adaptation
3. **Style Header & Footer** per design specifications
4. **Convert Tailwind** to custom CSS for Docusaurus

### 16.2 Homepage Design
**Location:** `/design/homepage/`
- **code.html** - Complete HTML/CSS with dark theme styling (Tailwind classes)
- **screen.png** - Visual reference of the dark design
- **Extraction Tasks:**
  - Extract header styling (logo, navigation, theme toggle)
  - Extract hero section styling
  - Extract featured chapters section
  - Extract footer styling with links
  - Create light theme inversions
- **Custom CSS Output:** `docusaurus/src/css/homepage.css`

### 16.3 Chapter Page Design
**Location:** `/design/chapter_page/`
- **code.html** - Chapter layout with sidebar, dark theme
- **screen.png** - Chapter page reference (dark)
- **Extraction Tasks:**
  - Extract header (same across all pages)
  - Extract left sidebar navigation styling
  - Extract main content area layout
  - Extract right TOC sidebar styling
  - Extract embedded chatbot widget styling
  - Extract footer styling
  - Create light theme for all components
- **Custom CSS Output:** `docusaurus/src/css/chapters.css`

### 16.4 Chatbot UI Design
**Location:** `/design/chatbot_ui/`
- **code.html** - Standalone chatbot component, dark theme
- **screen.png** - Chatbot UI reference (dark)
- **Extraction Tasks:**
  - Extract chat bubble styling (user vs assistant)
  - Extract input field styling
  - Extract message history container
  - Extract typing indicator animation
  - Extract button styling (send, clear, etc)
  - Extract source citations display
  - Create light theme variants
- **Custom CSS Output:** `docusaurus/src/css/chatbot.css`

### 16.5 CSS Conversion Workflow
```
Step 1: Copy Design HTML
  └─ Open /design/*/code.html
  
Step 2: Extract Tailwind Classes
  └─ Identify all tailwind class names
  └─ Document color, spacing, sizing values
  
Step 3: Create Custom CSS
  └─ Convert to semantic CSS classes
  └─ Use CSS variables for colors
  └─ Dark theme = as-is from design
  └─ Light theme = inverted colors
  
Step 4: Integrate into Docusaurus
  └─ Place CSS in docusaurus/src/css/
  └─ Import in custom.css
  └─ Apply classes to React components
  
Step 5: Test Both Themes
  └─ Compare dark theme output with screen.png
  └─ Verify light theme readability
  └─ Test across breakpoints
  └─ Check accessibility contrast
  
Step 6: Iterate
  └─ Refine colors and spacing
  └─ Ensure pixel-perfect match to design
  └─ Optimize for performance
```

### 16.6 Header & Footer Implementation Details

**Extract from Design - Header Must Include:**
- Exact logo/title styling from design
- Navigation menu items with hover states
- Theme toggle button positioning and styling
- Search bar integration (if present in design)
- User profile dropdown component
- Mobile responsive hamburger menu
- All background colors, text colors, and spacing from design

**Extract from Design - Footer Must Include:**
- Multi-column layout (if present in design)
- Link styling and organization
- Social media icon styling
- Copyright text formatting
- All padding, margins, and backgrounds from design
- Responsive stacking for mobile

**Theme Application to Header & Footer:**
- Dark theme colors: Use directly from design files
- Light theme colors: Invert background and text intelligently
- Maintain contrast and readability in both modes
- Test with accessibility tools (WCAG AA minimum)

---

## 17. SIGN-OFF

**Project:** Physical AI & Humanoid Robotics Textbook  
**Book Topic:** ✅ **Physical AI & Humanoid Robotics** (Announced)  
**Version:** 2.1 (Updated with finalized topic and design specifications)  
**Created:** December 2024  
**Status:** Ready for Implementation  
**Key Updates:**
- ✅ Book topic confirmed
- ✅ Detailed design folder structure
- ✅ Dark/Light theme system with CSS variables
- ✅ Gemini 2.5 Flash LLM integration
- ✅ Comprehensive authentication system
- ✅ Header/Footer styled per design
- ✅ User management and privacy
- ✅ Enhanced bonus features

**Current Phase:** Phase 1 - Project Setup & Docusaurus Initialization  
**Next Step:** Begin implementation with GitHub repo setup and design extraction