# Data Model: Embedded Chatbot Widget - React Component

This data model defines the key entities and their attributes required for the client-side implementation of the Embedded Chatbot Widget. These entities will primarily be represented as TypeScript interfaces or types within the React component, managing the state and structure of the chat UI.

## Entities

### ChatMessage

Represents a single message exchange (either from the user or the assistant) within the chat interface.

**Attributes:**

-   **`sender`** (enum: "user", "assistant"): Indicates who sent the message.
-   **`text`** (string): The content of the message.
-   **`sources`** (array of `Source` objects, optional): If the sender is the "assistant", this array contains references to the textbook content that informed the response. This attribute is typically absent for "user" messages.

### ChatSession

Represents the client-side stored session information for a user's conversation with the chatbot. This is distinct from any backend session management but ensures client-side continuity.

**Attributes:**

-   **`session_id`** (string, unique): A unique identifier for the conversation session. This ID will be generated client-side upon the first interaction (or component mount if history is loaded) and used in API calls to the backend.
-   **`history`** (array of `ChatMessage` objects): An ordered list of `ChatMessage` objects representing the complete conversation flow within this session.

## Relationships

-   A `ChatSession` contains multiple `ChatMessage` objects in its `history`.
-   A `ChatMessage` (specifically from the assistant) can contain multiple `Source` objects, which directly map to the backend's `Source` definition.

## Data Representation

These entities will be represented as TypeScript interfaces or types within the React/TypeScript codebase, used for state management within React components and for structuring data sent to/received from the backend API.
