# Quickstart: Custom CSS Theme System - Dark & Light Mode

This document outlines how to quickly set up and integrate the custom CSS theme system for Dark & Light Mode within the Docusaurus project.

## 1. Prerequisites

-   A Docusaurus project setup.
-   Access to the `/design/*/code.html` files for styling extraction.

## 2. CSS File Structure

The custom CSS will be organized into the `docusaurus/src/css/` directory as follows:

```
docusaurus/
├── src/
│   ├── css/
│   │   ├── custom.css       # Global CSS variables, base styles, root theme definitions (:root, [data-theme])
│   │   ├── homepage.css     # Styles specific to the homepage layout and components
│   │   ├── chapters.css     # Styles specific to chapter pages layout and components
│   │   ├── chatbot.css      # Styles specific to the chatbot UI component
│   │   ├── responsive.css   # Media queries for 320px, 768px, 1024px breakpoints
│   │   └── accessibility.css# Styles for clear focus states, reduced motion, high contrast
```

Ensure these files are imported into your Docusaurus setup, typically via `docusaurus.config.js` or `src/css/index.css` (`@import`).

## 3. Custom CSS Variable Definitions

The `custom.css` file will contain root-level CSS variables for colors, typography, spacing, etc. Both dark and light theme values for these variables will be defined.

**Example `custom.css` snippet:**

```css
/* Light Theme Defaults */
:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f0f2f5;
  --color-text-primary: #212121;
  --color-text-secondary: #526372;
  --color-border: #e0e0e0;
  /* ... other variables ... */
}

/* Dark Theme Overrides */
html[data-theme='dark'] {
  --color-bg-primary: #121212;
  --color-bg-secondary: #1e1e1e;
  --color-text-primary: #e0e0e0;
  --color-text-secondary: #a0a0a0;
  --color-border: #424242;
  /* ... other variables ... */
}

/* Common variables (not theme dependent) */
:root {
  --font-family: 'Inter', sans-serif;
  --font-size-body: 16px;
  --line-height-body: 1.5;
  --spacing-md: 16px;
  /* ... etc ... */
}
```

## 4. Theme Toggling and Persistence

### Zero-Flicker Script

A small JavaScript snippet must be added to the `<head>` of your Docusaurus HTML template (e.g., `src/theme/Root.js` or `docusaurus.config.js` if it supports injecting custom scripts in head) to handle immediate theme application.

```javascript
// Example of logic for a theme-setting script in <head>
(function() {
  const getInitialTheme = () => {
    const persistedTheme = localStorage.getItem('theme');
    if (persistedTheme) return persistedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  const theme = getInitialTheme();
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme); // Ensure preference is saved for subsequent loads
})();
```

### Theme Toggle Component

A React component (e.g., `ThemeToggleButton`) will be responsible for changing the `data-theme` attribute on the `<html>` element and updating `localStorage`.

```tsx
// Example ThemeToggleButton.tsx
import React, { useState, useEffect } from 'react';

const ThemeToggleButton: React.FC = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light' // Default to light if no preference
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggleButton;
```

## 5. Styling Extraction Process

The core task involves:
1.  **Manual extraction**: Go through `/design/homepage/code.html`, `/design/chapter_page/code.html`, and `/design/chatbot_ui/code.html`.
2.  **Conversion**: Translate Tailwind classes and inline styles into semantic custom CSS rules.
3.  **Variable mapping**: Apply the defined CSS variables to these new custom CSS rules.
4.  **File organization**: Place the new CSS into the appropriate `src/css/` files.
5.  **Accessibility**: Ensure WCAG AA contrast for all colors and proper focus states in `accessibility.css`.
6.  **Responsiveness**: Implement media queries in `responsive.css` for 320px, 768px, 1024px breakpoints.

## 6. API Contracts

This feature is a frontend styling implementation and does not expose or consume any new backend APIs. Therefore, there are no API contracts to define for this feature.