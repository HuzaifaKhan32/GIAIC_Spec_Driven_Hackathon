# Data Model: Physical AI textbook website on Docusaurus

This feature focuses on the initial setup of the Docusaurus website, including the homepage, header, footer, and a client-side theme system. It does not introduce any complex persistent data models or backend entities.

## Key Data Points (Client-side)

-   **Theme Preference**: Stored in `localStorage` as a simple key-value pair (`theme: 'dark'` or `'light'`). This is managed client-side.
-   **User Authentication State**: While the header includes a user profile section, the basic authentication system is handled by another feature (`006-oauth-authentication`). This feature will only manage the *display* of user authentication state (logged in/out) and trigger the appropriate authentication flows. No complex user data is stored or managed directly by this feature.

No complex data entities, relationships, or state transitions are required for this foundational feature beyond these simple client-side values and the display of authentication status.