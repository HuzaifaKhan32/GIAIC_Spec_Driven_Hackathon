# Feature Specification: Embedded Chatbot Widget - React Component

**Feature Branch**: `004-embedded-chatbot-widget`  
**Created**: 2025-12-04
**Status**: Draft  
**Input**: User description: "Feature: Embedded Chatbot Widget - React Component Intent: User-friendly chat interface in Docusaurus Framework: React (functional + hooks in Docusaurus) Styling: Custom CSS from /design/chatbot_ui/code.html Dark Theme: Extract from design file Light Theme: Create inverse variant Theme Support: CSS variables, respects user preference Components: - Chat bubbles (user/assistant sides) - Input field + send button - Message history scrollable area - Typing indicator animation - Clear conversation button - Source citations (clickable chapter links) - Error state display Functionality: - Session management (generate/store session_id) - POST to /chat/query with message + session - Handle selected text in queries - Load conversation history on mount - Debounce input (300ms) - Show loading states - Display sources as \"[Chapter N: Section]\" links Styling Requirements: - Extract CSS from /design/chatbot_ui/code.html - Dark background (from design) - Light theme colors (create) - Smooth animations - Responsive mobile-to-desktop - Full width mobile, max-width 600px desktop Accessibility: - ARIA labels on all interactive elements - Keyboard navigation (Tab, Enter to send) - Screen reader support - High contrast text Testing: - User types & sends message -> Response appears with citations - Click citation -> Navigate to chapter - Theme toggle -> Colors update instantly - Mobile view -> Scrollable, input always visible - Selected text included in context - Error messages clear Acceptance Criteria: - Component renders without errors - Messages display in correct order - Citations clickable and accurate - Performance: Lighthouse > 80 - Mobile responsive - Accessible to screen readers Reference: constitution.md Section 4.1.3, 5.2-5.6"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Interact with the Chatbot (Priority: P1)

As a user, I want to type a message and receive a response from the chatbot, including relevant citations.

**Why this priority**: This is the core interactive functionality of the chatbot widget.

**Independent Test**: This can be tested by opening the widget, typing a query, sending it, and verifying the response and citations.

**Acceptance Scenarios**:

1. **Given** I open the chatbot widget, **When** I type a message into the input field and click the send button (or press Enter), **Then** my message appears in the chat history, and the chatbot's response appears shortly after with a typing indicator animation.
2. **Given** the chatbot's response includes citations, **When** I click on a citation link, **Then** I am navigated to the relevant chapter and section of the textbook.
3. **Given** I have text selected on the page, **When** I open the chatbot and ask a question, **Then** the selected text is included as context for the chatbot's response.

---


### User Story 2 - Manage Conversation History and Session (Priority: P2)

As a user, I want my conversation history to be saved, and I want the option to clear my current conversation.

**Why this priority**: Enhances user experience and provides control over privacy.

**Independent Test**: This can be tested by interacting with the chatbot, closing/reopening the browser, and using the clear conversation button.

**Acceptance Scenarios**:

1. **Given** I have an ongoing conversation with the chatbot, **When** I close and reopen the Docusaurus site (or refresh the page), **Then** my previous conversation history is loaded and displayed in the widget.
2. **Given** I have messages in my chat history, **When** I click the "Clear conversation" button, **Then** all messages are removed from the chat history.

---


### User Story 3 - Responsive and Themed Experience (Priority: P3)

As a user, I want the chatbot widget to be visually appealing, responsive across devices, and respect my theme preferences.

**Why this priority**: Ensures a consistent and accessible user interface.

**Independent Test**: This can be tested by resizing the browser window, changing the site's theme, and verifying visual and functional aspects.

**Acceptance Scenarios**:

1. **Given** I am viewing the Docusaurus site on a mobile device (e.g., screen width less than 768px), **When** the chatbot widget is open, **Then** it occupies the full width of the screen, and the input field remains visible as I scroll through messages.
2. **Given** the Docusaurus site is in dark mode, **When** the chatbot widget is open, **Then** it displays a dark background and theme-appropriate colors.
3. **Given** the Docusaurus site is in light mode, **When** the chatbot widget is open, **Then** it displays a light background and theme-appropriate colors, providing good readability.

### Edge Cases

- What happens if the backend API is unavailable or returns an error?
- How is a long chatbot response handled visually within the chat bubble?
- What happens if a citation link is broken or points to a non-existent chapter/section?
- How does the chatbot handle rapid consecutive messages (debouncing)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide an embedded chatbot widget implemented as a React component.
- **FR-002**: The chatbot widget MUST acquire its base styling from custom CSS extracted from `/design/chatbot_ui/code.html`.
- **FR-003**: The chatbot widget MUST support both dark and light themes, leveraging CSS variables and adapting to the user's preferred theme.
- **FR-004**: The chatbot widget MUST display distinct chat bubbles for messages sent by the user and responses from the assistant.
- **FR-005**: The chatbot widget MUST include a text input field and a send button for user interaction.
- **FR-006**: The chatbot widget MUST feature a scrollable area for displaying the message history.
- **FR-007**: The chatbot widget MUST show a typing indicator animation when the assistant is processing a query and generating a response.
- **FR-008**: The chatbot widget MUST provide a "Clear conversation" button to erase the current chat history.
- **FR-009**: The chatbot widget MUST display source citations within assistant responses as clickable links, formatted as `[Chapter N: Section]`, leading to the relevant textbook content.
- **FR-010**: The chatbot widget MUST clearly display error states to the user in a user-friendly manner.
- **FR-011**: The chatbot widget MUST manage user sessions by generating and persistently storing a `session_id`.
- **FR-012**: The chatbot widget MUST send user queries via a `POST` request to the `/chat/query` backend endpoint, including the message text and the current `session_id`.
- **FR-013**: The chatbot widget MUST be capable of including selected text from the Docusaurus page in the `POST /chat/query` request as additional context.
- **FR-014**: The chatbot widget MUST load the user's previous conversation history upon component initialization.
- **FR-015**: The input field for user queries MUST debounce input with a delay of 300ms to prevent excessive API calls.
- **FR-016**: The chatbot widget MUST visibly indicate loading states (e.g., spinner, dimmed elements) while waiting for backend responses.
- **FR-017**: The chatbot widget MUST be responsive across devices, appearing full-width on mobile screens and adhering to a maximum width of 600px on desktop.
- **FR-018**: The chatbot widget MUST incorporate ARIA labels on all interactive elements to enhance accessibility for assistive technologies.
- **FR-019**: The chatbot widget MUST allow for full keyboard navigation, including using `Tab` to cycle through elements and `Enter` to send messages.
- **FR-020**: The chatbot widget MUST provide comprehensive support for screen readers.
- **FR-021**: The chatbot widget MUST ensure high contrast between text and background colors to meet accessibility standards.

### Key Entities *(include if feature involves data)*

- **ChatMessage**: Represents a single message exchange in the chat interface.
  - Attributes: `sender` (enum: user, assistant), `text` (string), `sources` (array of `Source` objects, if assistant message).
- **ChatSession**: Represents the client-side stored session information.
  - Attributes: `session_id` (string), `history` (array of `ChatMessage` objects).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The React component renders without any reported errors in the browser console.
- **SC-002**: All chat messages are displayed in the correct chronological order, with clear visual distinction between user queries and assistant responses.
- **SC-003**: Citations within assistant responses are clickable links that accurately navigate the user to the specified chapter and section within the Docusaurus site.
- **SC-004**: The chatbot widget achieves a Lighthouse performance score of 80 or higher when integrated into the Docusaurus site.
- **SC-005**: The chatbot widget is fully responsive, maintaining usability and visual integrity across screen sizes from mobile (320px) to desktop (e.g., 1024px and above).
- **SC-006**: The chatbot widget is fully accessible, supporting screen readers, keyboard navigation, and displaying high contrast text, achieving at least WCAG 2.1 AA compliance.