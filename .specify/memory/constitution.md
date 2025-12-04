# Constitution: AI-Driven Book with Embedded RAG Chatbot

## Project Identity

**Project Name:** AI Robotics - AI-Native Educational Platform  
**Hackathon:** GIAIC Thursday Evening Students - AI/Spec-Driven Online Hackathon 1  
**Deadline:** Sunday, December 7th, 2024 @ 11:59 PM  
**Developer:** Solo Developer (Experienced Full-Stack AI Engineer)  
**Development Approach:** Spec-Driven Development with Gemini CLI + Spec-Kit Plus

---

## Core Mission

Create a comprehensive educational book with an intelligent RAG-powered chatbot that can answer questions about the book content, including text-selection-based queries. Demonstrate expertise in AI-native development, modern web technologies, and retrieval-augmented generation systems—all while maintaining exceptional quality under tight time constraints.

---

## Project Principles

### 1. **Quality Over Quantity**
- Every feature must work flawlessly rather than having many broken features
- Code must be production-ready, not prototype quality
- User experience is paramount—the book and chatbot must feel professional

### 2. **AI-Native Development**
- Leverage Gemini CLI and Spec-Kit Plus for rapid, intelligent development
- Use spec-driven approaches to maintain consistency and quality
- Document AI-assisted workflow to demonstrate modern development practices

### 3. **Pragmatic Excellence**
- Focus resources on high-impact features that judges will evaluate
- Prioritize RAG chatbot functionality as the technical differentiator
- Deploy early, iterate fast, test thoroughly

### 4. **Zero-Cost Infrastructure**
- All services must use free tiers (Vercel, GitHub Pages, Qdrant Cloud Free)
- Optimize for cost-efficiency without sacrificing quality
- Use Gemini (free) instead of paid APIs where possible

### 5. **Demonstration-Ready**
- Every feature must be showcased clearly in documentation
- Create visual evidence (screenshots, architecture diagrams, demo video)
- README must tell a compelling story of technical achievement

---

## Technical Stack & Architecture

### **Frontend**
- **Framework:** Docusaurus (TypeScript) - Documentation-first, SEO-optimized
- **Styling:** Custom CSS + Tailwind utilities for modern aesthetics
- **Design Reference:** UI mockup stored in `/design` file (convert to Docusaurus-compatible code)
- **Chatbot UI:** Custom React component with text-selection support
- **Deployment:** GitHub Pages (free, reliable, fast CDN)

### **Backend**
- **Framework:** FastAPI (Python) - Modern, async, auto-documented APIs
- **Vector Database:** Qdrant Cloud (Free Tier) - Production-ready vector search
- **AI Integration:** Google Gemini API (free tier) for embeddings and completions
- **Deployment:** Vercel Serverless Functions (zero-config, free tier)

### **RAG System Architecture**
```
User Query → Frontend → FastAPI Backend → Query Processing
                                              ↓
                                        Qdrant Vector Search
                                              ↓
                                        Context Retrieval
                                              ↓
                                        Gemini LLM → Response
                                              ↓
                                        Frontend Display
```

### **Key Technical Decisions**

1. **Why Gemini over OpenAI?**
   - Free tier with generous limits
   - Competitive embedding quality
   - Strong instruction-following for RAG responses

2. **Why Qdrant over alternatives?**
   - Free cloud tier (1GB storage, sufficient for book content)
   - Production-grade performance
   - Excellent Python SDK

3. **Why Docusaurus over custom site?**
   - Battle-tested for documentation
   - SEO and performance out-of-the-box
   - Professional aesthetic with minimal effort

4. **Why FastAPI over alternatives?**
   - Automatic API documentation (impressive for judges)
   - Async support for concurrent queries
   - Type safety with Pydantic

---

## Core Requirements (100% Must-Have)

### **Requirement 1: AI/Spec-Driven Book Creation**
- **Deliverable:** Complete book deployed to GitHub Pages
- **Quality Standards:**
  - 8-10 comprehensive chapters with clear structure
  - Introduction with learning objectives per chapter
  - Code examples (syntax-highlighted, tested)
  - Diagrams/illustrations where beneficial
  - Summary sections with key takeaways
  - Professional typography and readability
  - Mobile-responsive design
  - Fast load times (<2s initial load)

### **Requirement 2: Integrated RAG Chatbot**
- **Deliverable:** Functional chatbot embedded in book site
- **Must-Have Features:**
  - Answer questions about book content accurately
  - Provide source citations (chapter/section references)
  - Support text-selection queries (select text → ask about it)
  - Stream responses for better UX
  - Handle edge cases gracefully (no results, errors)
  - Visual loading states
  - Clean, modern chat UI
- **Quality Standards:**
  - Response time <3 seconds for typical queries
  - Accuracy >85% on content-based questions
  - Citations must be correct and verifiable
  - No hallucinations from RAG context

### **Requirement 3: Technical Excellence**
- Clean, documented code (judges may review)
- Comprehensive README with architecture diagram
- Environment setup instructions
- API documentation (FastAPI auto-docs)
- Error handling and logging
- Security best practices (API keys in env vars)

---

## Bonus Features (Extra Marks)

### **Spec-Kit Plus Integration**
- Document usage of spec-driven development
- Show constitution.md and spec files
- Demonstrate how specifications guided development

### **Advanced RAG Features**
- Hybrid search (keyword + semantic)
- Query rewriting for better retrieval
- Relevance scoring display
- Chat history context

### **Developer Experience**
- GitHub Actions CI/CD pipeline
- Automated testing (unit + integration)
- Development vs. Production configs
- Monitoring/analytics setup

---

## Development Workflow

### **Phase 1: Foundation (Dec 3-4)**
1. Finalize book topic and structure (post-announcement)
2. Set up Docusaurus with custom theming
3. Create book content outline
4. Initialize backend repository structure

### **Phase 2: Content Creation (Dec 4-5)**
1. **Convert design mockup** from `/design` file into Docusaurus components
2. Implement custom React components matching design aesthetics
3. Apply CSS styling to match design color scheme and layout
4. Generate chapter content using Gemini CLI
5. Review and enhance generated content
6. Add code examples, diagrams
7. Ensure design consistency across all pages

### **Phase 3: RAG Implementation (Dec 5-6)**
1. Set up Qdrant Cloud collection
2. Implement document ingestion pipeline
3. Build FastAPI backend with RAG logic
4. Create chatbot frontend component
5. Integrate text-selection feature

### **Phase 4: Integration & Polish (Dec 6-7)**
1. Embed chatbot in Docusaurus site
2. Deploy backend to Vercel
3. Deploy frontend to GitHub Pages
4. End-to-end testing
5. Create demo video
6. Write comprehensive README
7. Final polish and submission

---

## Quality Assurance Standards

### **Code Quality**
- Type hints in all Python functions
- TypeScript strict mode enabled
- ESLint/Prettier for consistent formatting
- Meaningful variable/function names
- Comments for complex logic only

### **Testing Requirements**
- Backend: Test RAG pipeline with sample queries
- Frontend: Test chatbot UI with various inputs
- Integration: Test full query flow end-to-end
- Edge cases: Empty queries, long text, special characters

### **Performance Benchmarks**
- Docusaurus build time: <60 seconds
- Page load (initial): <2 seconds
- Page load (subsequent): <500ms
- Chatbot response: <3 seconds
- Vector search: <500ms

### **User Experience**
- Clear error messages (no technical jargon)
- Loading indicators for all async operations
- Responsive design (mobile, tablet, desktop)
- Accessibility (keyboard navigation, screen readers)
- Intuitive UI (no user manual needed)

---

## Risk Mitigation

### **High-Risk Areas**
1. **RAG Accuracy**
   - Mitigation: Test with diverse queries, tune chunk size/overlap
   - Fallback: Implement query rewriting if initial results poor

2. **Deployment Issues**
   - Mitigation: Deploy by Saturday for debugging time
   - Fallback: Video demo if live deployment fails

3. **API Rate Limits**
   - Mitigation: Use free tier limits wisely, cache responses
   - Fallback: Request limit increase or use alternative APIs

4. **Time Constraints**
   - Mitigation: MVP-first approach, add features incrementally
   - Fallback: Perfect core features over buggy bonus features

---

## Success Metrics

### **Minimum Viable Submission (70/100)**
- Complete book with 8 chapters
- Working RAG chatbot with basic Q&A
- Deployed to GitHub Pages
- Clean code and documentation

### **Competitive Submission (85/100)**
- Above + text selection feature
- Above + source citations
- Above + professional UI/UX
- Above + comprehensive README with demo video

### **Winning Submission (95-100/100)**
- Above + advanced RAG features
- Above + spec-driven development documentation
- Above + exceptional content quality
- Above + impressive technical architecture
- Above + wow-factor presentation

---

## Evaluation Criteria Alignment

### **Book Quality (30 points)**
- Comprehensive, well-structured content ✓
- Clear explanations with examples ✓
- Professional formatting and design ✓

### **Technical Implementation (40 points)**
- Functional RAG chatbot with citations ✓
- Text-selection support ✓
- Clean, maintainable code ✓
- Proper architecture and deployment ✓

### **Innovation & Bonus (20 points)**
- Spec-driven development approach ✓
- Advanced features beyond requirements ✓
- Creative solutions to challenges ✓

### **Presentation (10 points)**
- Clear documentation ✓
- Demo video ✓
- Professional repository ✓

---

## Non-Negotiables

### **Must Have**
- All core features working by submission deadline
- Deployed and accessible via public URL
- No broken links or console errors
- Chatbot must answer at least 80% of test queries correctly
- Professional appearance (no placeholder text, broken images)

### **Must Not Have**
- Hardcoded API keys in repository
- Unhandled errors crashing the application
- Plagiarized content without attribution
- Security vulnerabilities (XSS, injection attacks)
- Copyright violations in content or code

---

## Scope Boundaries

### **In Scope**
- Educational book content on assigned topic
- RAG chatbot with text-selection support
- Professional web deployment
- Comprehensive documentation
- Demo video

### **Out of Scope**
- User authentication/accounts
- Payment processing
- Social features (comments, sharing)
- Mobile native apps
- Real-time collaboration
- Advanced analytics dashboard

### **Nice-to-Have (Time Permitting)**
- Dark mode toggle
- Search functionality
- Print-friendly styling
- Multiple language support
- Bookmark/note-taking features

---

## Communication & Feedback

### **Documentation Standards**
- README.md: Project overview, setup, architecture
- API.md: Backend endpoint documentation
- ARCHITECTURE.md: Technical decisions and diagrams
- DEVELOPMENT.md: Local setup and contribution guide

### **Demo Video Requirements**
- Length: 3-5 minutes
- Show: Landing page → Book content → Chatbot demo → Text selection feature
- Highlight: Technical architecture, key features, innovation

### **Submission Checklist**
- [ ] Book deployed to GitHub Pages (live URL)
- [ ] Backend deployed to Vercel (API accessible)
- [ ] Repository public with comprehensive README
- [ ] Demo video uploaded (YouTube/Loom)
- [ ] All environment variables documented
- [ ] Code commented and clean
- [ ] No console errors or warnings
- [ ] Mobile responsive verified
- [ ] Chatbot tested with 20+ queries
- [ ] Submission form completed

---

## Reflection & Learning

### **Post-Hackathon Review**
After submission, document:
- What went well and why
- What challenges were faced and how solved
- What would be done differently next time
- Key technical learnings
- Time management insights

---

## Commitment

This constitution represents a commitment to:
- **Excellence:** No shortcuts on quality
- **Innovation:** Push boundaries of AI-native development
- **Pragmatism:** Deliver working solutions on time
- **Professionalism:** Treat this as a production project
- **Learning:** Grow technical skills through challenge

**Signature:** [Your Name]  
**Date:** December 3, 2024  
**Version:** 1.0

---

*This constitution serves as the north star for all technical and product decisions. When in doubt, refer back to these principles and standards.*