---
id: 0006
title: Implement safe Docusaurus Layout wrapper
stage: refactor
date: 2025-12-07
surface: agent
model: gemini-pro
feature: general
branch: feat/consolidate-multi-part-updates
user: {{USER}}
command: {{COMMAND}}
labels: ["docusaurus", "react", "chatbot", "layout"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- docusaurus/src/theme/Layout/index.js
- docusaurus/src/theme/Layout/layout.module.css
tests:
- null
---

## Prompt

Implement a safe Docusaurus Layout wrapper that adds a chatbot widget to all pages without causing crashes.

REQUIREMENTS:

1. Create Layout wrapper at: docosaurus/src/theme/Layout/index.js
2. Wrap OriginalLayout properly to avoid conflicts
3. Add error boundaries to prevent page crashes
4. Handle missing ChatbotWidget gracefully
5. Make it compatible with all Docosaurus themes
6. Add proper TypeScript/JSDoc comments
7. Create accompanying CSS with safe positioning
8. Ensure no z-index conflicts or overflow issues
9. Make responsive for mobile/tablet/desktop

SAFETY REQUIREMENTS:
- Use try-catch to handle ChatbotWidget errors
- Don't override existing Docusaurus styles
- Use CSS modules (not global styles)
- Prevent chatbot from blocking content
- Handle hydration issues
- Support both light and dark themes
- Add accessibility attributes
- Ensure mobile responsiveness

IMPLEMENTATION:

Create 2 files:

FILE 1: docosaurus/src/theme/Layout/index.js
- Import OriginalLayout from @theme-original/Layout
- Import ChatbotWidget from @site/src/components/ChatbotWidget
- Create error boundary for ChatbotWidget
- Wrap in try-catch
- Pass all props to OriginalLayout
- Add chatbot div with safe positioning
- Add loading state handling
- Add useEffect for hydration safety

FILE 2: docosaurus/src/theme/Layout/layout.module.css
- Fixed position styling (bottom: 20px, right: 20px)
- Width: 400px (desktop), responsive for mobile
- z-index: 999 (below modals which use 1000+)
- Box shadow for depth
- Border radius for modern look
- Max height to prevent overflow
- Media queries for responsive:
  * Desktop (1024px+): 400px width
  * Tablet (768px-1024px): 360px width
  * Mobile (320px-768px): Full width with padding
  * Very small (<320px): Hidden to avoid layout break
- Add overflow: hidden to prevent content spill
- Smooth animations
- Dark mode support via @media (prefers-color-scheme)

SAFETY CHECKS:
✓ No global style pollution
✓ Error handling for chatbot failures
✓ Hydration-safe (no SSR issues)
✓ Won't block page interactions
✓ Mobile-friendly (hidden on very small screens)
✓ Accessible (proper ARIA labels)
✓ Theme-aware (light/dark mode support)
✓ Performance optimized (lazy load if possible)

OUTPUT:

Generate complete, production-ready implementation:

1. docosaurus/src/theme/Layout/index.js (with error handling, ~50 lines)
2. docosaurus/src/theme/Layout/layout.module.css (with all breakpoints, ~80 lines)
3. Installation instructions (create folder, file paths)
4. Safety verification checklist
5. Troubleshooting guide for common issues
6. Testing instructions

Make sure implementation:
- Won't crash even if ChatbotWidget fails
- Won't interfere with Docosaurus routing
- Won't cause layout shift
- Works with all plugins
- Handles edge cases gracefully
- Is well-commented
- Includes fallbacks

Start implementation now.

## Response snapshot

I have created the `index.js` and `layout.module.css` files. Now, I will provide the installation instructions, safety verification checklist, troubleshooting guide, and testing instructions.

### Installation Instructions

1.  **Create the directory:** Create a new directory at `docusaurus/src/theme/Layout`.
2.  **Create the files:** Place the two files (`index.js` and `layout.module.css`) inside the newly created directory.
3.  **Restart Docusaurus:** Restart your Docusaurus development server for the changes to take effect.

### Safety Verification Checklist

*   **No global style pollution:** The styles are scoped to the `chatbotContainer` class using CSS modules, so they won't affect other components.
*   **Error handling for chatbot failures:** The `ChatbotErrorBoundary` will catch any rendering errors in the `ChatbotWidget` and prevent the page from crashing.
*   **Hydration-safe (no SSR issues):** The `SafeChatbot` component only renders on the client-side, so there will be no hydration mismatches.
*   **Won't block page interactions:** The chatbot is fixed to the bottom-right corner of the screen and has a `z-index` of 999, so it won't block any content with a higher `z-index` (like modals).
*   **Mobile-friendly (hidden on very small screens):** The chatbot is responsive and will be hidden on screens smaller than 320px to prevent layout breakage.
*   **Accessible (proper ARIA labels):** The chatbot container has a `role="complementary"` and `aria-label="Chatbot"` for screen readers.
*   **Theme-aware (light/dark mode support):** The chatbot container has different background and border colors for light and dark themes.
*   **Performance optimized (lazy load if possible):** The `ChatbotWidget` is lazy-loaded using `React.lazy`, so it won't be included in the initial page bundle.

### Troubleshooting Guide

*   **Chatbot doesn't appear:**
    *   Make sure you have restarted the Docusaurus development server.
    *   Check the browser's developer console for any errors.
    *   Verify that the `ChatbotWidget` component is correctly imported in `docusaurus/src/theme/Layout/index.js`.
*   **Chatbot crashes the page:**
    *   This shouldn't happen due to the error boundary, but if it does, check the browser's developer console for the error message.
    *   Try to isolate the error by rendering a simple `<div>` instead of the `ChatbotWidget` to see if the issue is with the wrapper or the widget itself.
*   **Chatbot styles are not applied:**
    *   Make sure the `layout.module.css` file is in the same directory as `index.js`.
    *   Check that the class names in `index.js` match the class names in `layout.module.css`.

### Testing Instructions

1.  **Run the development server:** Start the Docusaurus development server.
2.  **Navigate to different pages:** Check that the chatbot widget appears on all pages (including the homepage, documentation pages, and any other pages).
3.  **Test responsiveness:** Resize the browser window to see how the chatbot adapts to different screen sizes. It should be responsive on mobile, tablet, and desktop, and hidden on very small screens.
4.  **Test theme switching:** Switch between light and dark mode to see if the chatbot's theme changes accordingly.
5.  **Test error handling:** To test the error boundary, you can temporarily introduce an error in the `ChatbotWidget` component (e.g., `throw new Error('Test error')`) and see if the page crashes. It should not crash, and the chatbot should simply not be rendered.

## Outcome

- ✅ Impact: Implemented a safe and robust Docusaurus Layout wrapper to display a chatbot widget on all pages without causing crashes. This improves user engagement and provides a consistent user experience.
- 🧪 Tests: No tests were added or modified.
- 📁 Files: Created two new files to implement the safe layout wrapper.
- 🔁 Next prompts: null
- 🧠 Reflection: The `create-phr.sh` script did not work as expected, so I had to create the PHR file manually. I should investigate why the script is failing.

## Evaluation notes (flywheel)

- Failure modes observed: The `create-phr.sh` script failed to create a new file.
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Try to debug the `create-phr.sh` script.
