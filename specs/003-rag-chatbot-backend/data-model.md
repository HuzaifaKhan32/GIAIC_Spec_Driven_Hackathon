# Data Model: RAG Chatbot Backend - Question Answering System

This data model defines the key entities and their attributes required for the RAG Chatbot Backend. These entities will primarily be represented as Pydantic models in the FastAPI application for request/response validation and internal data structuring, and some will correspond to collections/documents in the Qdrant vector database.

## Entities

### ChatSession

Represents a unique conversation session between a user and the chatbot. This will primarily be managed on the backend to maintain conversation history for context.

**Attributes:**

-   **`session_id`** (string, unique): A unique identifier for the conversation session.
-   **`history`** (array of `Message` objects): An ordered list of messages exchanged within this session, maintaining conversation context.

### Message

Represents a single turn in a chat session, containing both the user's query and the chatbot's response.

**Attributes:**

-   **`query`** (string): The user's input text.
-   **`response`** (string): The chatbot's generated response text.
-   **`sources`** (array of `Source` objects): A list of references to the textbook content that informed the chatbot's response.
-   **`timestamp`** (datetime): The time when this message exchange occurred.

### Source

Represents a citation or reference to a specific part of the textbook content.

**Attributes:**

-   **`chapter`** (string): The identifier or title of the chapter.
-   **`section`** (string): The specific section within the chapter.

### DocumentChunk

Represents a vectorized segment of the textbook content, stored in the Qdrant vector database.

**Attributes:**

-   **`id`** (string, unique): A unique identifier for the chunk.
-   **`vector`** (array of floats): The embedding vector generated from the `full_content` of the chunk.
-   **`metadata`** (object): Additional descriptive information about the chunk.
    -   **`chapter_id`** (string): The ID of the chapter this chunk belongs to.
    -   **`section`** (string): The section within the chapter this chunk belongs to.
    -   **`index`** (integer): The sequential index of this chunk within its section/chapter.
    -   **`full_content`** (string): The original textual content of the chunk.
    -   (Potentially other attributes like `page_number`, `difficulty` from chapter metadata if needed for filtering)

## Relationships

-   A `ChatSession` contains multiple `Message` objects.
-   A `Message` (chatbot's response) can have multiple `Source` objects.
-   `DocumentChunk` entities are the basis for generating `Source` information.
-   The `metadata` within `DocumentChunk` links back to the original textbook content (chapters).
