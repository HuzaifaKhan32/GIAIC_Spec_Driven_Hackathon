# Quickstart: Physical AI textbook website on Docusaurus

This document outlines the quick setup and integration points for the foundational Docusaurus website, including the homepage, header, footer, and client-side theme system.

## 1. Docusaurus Project Setup

The Docusaurus project will be initialized using the official CLI. Ensure `docusaurus.config.js` is configured to include custom CSS files, static asset paths, and any necessary plugins or theme overrides.

## 2. Frontend Components Integration

### 2.1 Header Component

The `Header` React component (`docusaurus/src/components/Header/index.tsx`) will contain the logo, navigation menu, theme toggle, search bar, and user profile section. Its styling will be managed by `docusaurus/src/css/homepage.css` and global theme variables.

### 2.2 Footer Component

The `Footer` React component (`docusaurus/src/components/Footer/index.tsx`) will include links, social media icons, copyright notice, and privacy/terms links. Its styling will be managed by `docusaurus/src/css/homepage.css` and global theme variables.

### 2.3 Homepage Implementation

The main homepage content will be implemented in `docusaurus/src/pages/index.js` (or `.tsx`). This will utilize the custom CSS styling extracted from `/design/homepage/code.html`.

## 3. Client-Side Theme System

### 3.1 Custom CSS Integration

All custom CSS files (`custom.css`, `homepage.css`, `responsive.css`, `accessibility.css`) will be located in `docusaurus/src/css/`. These files define the custom CSS variables for dark and light themes.

### 3.2 Theme Management Hook

A custom React hook, `useTheme.ts` (located in `docusaurus/src/hooks/`), will manage the client-side theme state.

**Example `useTheme.ts` (simplified):**

```typescript
// docusaurus/src/hooks/useTheme.ts
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Logic to read from localStorage or system preference (prefers-color-scheme)
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Apply data-theme attribute to html element
    document.documentElement.setAttribute('data-theme', theme === 'system' ? 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
      theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};
```

### 3.3 Zero-Flicker Implementation

Ensure the small JavaScript snippet (from `005-custom-css-theme-system` research) is embedded in the `<head>` of the Docusaurus HTML to apply the `data-theme` attribute before React renders, preventing theme flickering.

## 4. Authentication (Basic Placeholder)

The Header component will include a placeholder UI for a user profile section. The actual integration with the authentication system (`006-oauth-authentication`) will be completed once that feature is implemented.

## 5. API Contracts

This feature is purely frontend and does not define any new API contracts. Any interactions with backend APIs (e.g., for search or user profile data if authenticated) will consume existing contracts defined by other features (e.g., `006-oauth-authentication` for session data).