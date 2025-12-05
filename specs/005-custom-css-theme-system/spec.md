# Feature Specification: Custom CSS Theme System - Dark & Light Mode

**Feature Branch**: `005-custom-css-theme-system`  
**Created**: 2025-12-04
**Status**: Draft  
**Input**: User description: "Feature: Custom CSS Theme System - Dark & Light Mode Intent: Replace Tailwind with custom CSS for Docusaurus compatibility Source: Extract from /design/*/code.html (3 design files) Design Files: - /design/homepage/code.html -> homepage.css - /design/chapter_page/code.html -> chapters.css - /design/chatbot_ui/code.html -> chatbot.css Dark Theme: Use colors directly from design files Light Theme: Create intelligent inverse (readable, accessible) CSS Variables: --color-bg-primary, --color-bg-secondary --color-text-primary, --color-text-secondary --color-border, --color-accent-primary, --color-accent-secondary --font-family, --font-size, --line-height --spacing (xs, sm, md, lg, xl), --border-radius, --transition-duration Theme Implementation: - Use [data-theme="light/dark"] attribute - Root CSS variables for colors - localStorage persistence - System preference detection (prefers-color-scheme) - Zero flicker on page reload File Structure: src/css/custom.css (variables + global) src/css/homepage.css src/css/chapters.css src/css/chatbot.css src/css/responsive.css (320px, 768px, 1024px) src/css/accessibility.css (focus states, reduced motion) Conversion Process: 1. Extract Tailwind classes from design HTML 2. Map to CSS properties and variables 3. Create .css files with light/dark variants 4. Test contrast (WCAG AA: 4.5:1 minimum) 5. Compare output with screen.png Testing: - Page loads -> correct theme applied - Theme toggle -> instant switch with localStorage - Reload page -> theme persists - Contrast check both themes -> all readable - Responsive at 320px, 768px, 1024px - Focus states visible - Reduced motion respected Acceptance Criteria: - All Tailwind converted to custom CSS - Dark/light variants working - No theme flicker - WCAG AA contrast - Responsive breakpoints functional - Accessibility features present Reference: constitution.md Section 5.2-5.6, 16"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Content with Preferred Theme (Priority: P1)

As a user, I want the website to load with my preferred dark or light theme instantly, without any visual flickering.

**Why this priority**: Crucial for a smooth and personalized user experience.

**Independent Test**: Can be tested by setting browser/OS theme preferences or local storage, then loading various pages and observing the initial render.

**Acceptance Scenarios**:

1. **Given** I have a system-level dark mode preference (or a previously saved preference for dark mode), **When** I load any page on the website, **Then** the page renders immediately in dark mode without any visible flash of unstyled content or a light theme.
2. **Given** I have a system-level light mode preference (or a previously saved preference for light mode), **When** I load any page on the website, **Then** the page renders immediately in light mode without any visible flash of unstyled content or a dark theme.

---

### User Story 2 - Toggle Between Themes (Priority: P2)

As a user, I want to be able to manually switch between dark and light themes, and have my choice remembered across sessions.

**Why this priority**: Provides user control and consistency.

**Independent Test**: Can be tested by interacting with the theme toggle, navigating between pages, and reloading the browser.

**Acceptance Scenarios**:

1. **Given** I am viewing a page in dark mode, **When** I activate the theme toggle, **Then** the website instantly switches to light mode without any visible flicker.
2. **Given** I am viewing a page in light mode, **When** I activate the theme toggle, **Then** the website instantly switches to dark mode without any visible flicker.
3. **Given** I have manually toggled the theme, **When** I close and reopen my browser or navigate to a different page, **Then** my last chosen theme is applied automatically.

---

### User Story 3 - Accessible and Responsive Design (Priority: P3)

As a user, I want the website to be accessible and usable across different devices and with various accessibility settings.

**Why this priority**: Ensures broad usability and legal compliance.

**Independent Test**: Can be tested using browser developer tools, accessibility auditing tools, and assistive technologies on various devices.

**Acceptance Scenarios**:

1. **Given** I resize the browser window from a desktop size down to mobile (e.g., 320px width), **When** the layout adapts, **Then** all content remains readable and interactive, correctly adjusting at breakpoints like 320px, 768px, and 1024px.
2. **Given** I navigate the site using only the keyboard (Tab, Shift+Tab), **When** I interact with clickable or focusable elements, **Then** a clear and visible focus indicator appears around the element.
3. **Given** my operating system has a "reduced motion" accessibility setting enabled, **When** animations or transitions would normally occur on the website, **Then** these animations are either subtle, minimized, or entirely absent.

### Edge Cases

- What happens if `localStorage` is unavailable or disabled, preventing theme persistence?
- How are images or other media handled to ensure they look good in both dark and light themes?
- What is the fallback behavior if `prefers-color-scheme` is not supported or returns an unexpected value?
- How does the system handle dynamically loaded content or third-party widgets that might not inherit CSS variables?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST implement a custom CSS theme system supporting both dark and light modes.
- **FR-002**: The theme system MUST replace all existing styling derived from Tailwind CSS classes (as found in `/design/*/code.html`) with custom, hand-written CSS.
- **FR-003**: The dark theme MUST directly apply the color palette and styling specified in the provided design files.
- **FR-004**: The light theme MUST be an intelligently designed inverse of the dark theme, ensuring high readability and adherence to accessibility standards.
- **FR-005**: The theme system MUST extensively utilize CSS variables (e.g., `--color-bg-primary`, `--color-text-secondary`, `--font-family`, `--spacing-md`) for all core styling properties.
- **FR-006**: The active theme (light or dark) MUST be controlled via a `data-theme` attribute on a root HTML element.
- **FR-007**: The user's explicit theme preference MUST be persistently stored and retrieved from `localStorage`.
- **FR-008**: The theme system MUST automatically detect and apply the user's operating system-level color scheme preference (`prefers-color-scheme`) as a default.
- **FR-009**: The theme system MUST ensure a "zero flicker" experience, meaning there should be no visible flash of unstyled content or an incorrect theme during page loads or theme transitions.
- **FR-010**: Custom CSS files MUST be logically organized within `src/css/` to include `custom.css` (for variables/global styles), `homepage.css`, `chapters.css`, `chatbot.css`, `responsive.css` (for breakpoints), and `accessibility.css` (for focus states/reduced motion).
- **FR-011**: All text-background color combinations implemented in both themes MUST meet a minimum WCAG AA contrast ratio of 4.5:1.
- **FR-012**: The custom CSS MUST correctly implement responsive design breakpoints at 320px, 768px, and 1024px viewport widths.
- **FR-013**: The accessibility CSS MUST provide clear and distinct visual focus states for all interactive elements.
- **FR-014**: The system MUST respect user operating system settings for reduced motion preferences by minimizing or disabling non-essential animations.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of Tailwind CSS classes present in the `/design/*/code.html` files are replaced with functionally equivalent custom CSS.
- **SC-002**: Both dark and light theme variants are fully functional, visually consistent with their respective design goals, and integrated across all relevant components.
- **SC-003**: The website demonstrates a "zero flicker" behavior, with no discernible flashes of incorrect themes or unstyled content during any page load or theme toggle.
- **SC-004**: An automated accessibility audit confirms that all text-background color combinations across both themes meet or exceed the WCAG AA contrast ratio (4.5:1).
- **SC-005**: All UI elements and layouts render correctly and remain fully functional at specified responsive breakpoints (320px, 768px, 1024px).
- **SC-006**: An automated accessibility audit confirms the presence and correct implementation of accessible focus states, and manual testing verifies adherence to reduced motion preferences.