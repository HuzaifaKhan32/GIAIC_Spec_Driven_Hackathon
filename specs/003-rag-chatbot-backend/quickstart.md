# Quickstart: RAG Chatbot Backend - Question Answering System

This document outlines how to quickly set up and interact with the RAG Chatbot Backend.

## 1. Environment Setup

To run the backend locally, you will need:
- Python 3.10+
- Docker (if deploying with Docker locally)

### Environment Variables

Create a `.env` file in the `chatbot-api/` directory based on `.env.example`.
You will need to set the following:
- `GOOGLE_API_KEY`: Your Google Gemini API Key.
- `QDRANT_URL`: URL for your Qdrant Cloud instance.
- `QDRANT_API_KEY`: API Key for your Qdrant Cloud instance.
- `JWT_SECRET`: A secret key for JWT (if used for session auth).
- `BETTER_AUTH_SECRET`: Secret for Better-Auth cookies.
- `DATABASE_URL`: Your database connection string (e.g., for PostgreSQL or SQLite if used for session history).
- `CORS_ORIGIN`: The allowed frontend origin (e.g., `https://physical-ai-textbook.vercel.app`).

## 2. Local Development

### Install Dependencies

Navigate to the `chatbot-api/` directory and install Python dependencies:

```bash
cd chatbot-api
pip install -r requirements.txt
```

### Run the FastAPI Application

Start the FastAPI application using Uvicorn:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be accessible at `http://localhost:8000`. You can view the interactive OpenAPI documentation at `http://localhost:8000/docs`.

## 3. Core API Endpoints

### `POST /chat/query` - Submit a User Query

Submit a natural language query to the RAG chatbot to get answers from the textbook content.

**Request:**

```http
POST /chat/query HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Authorization: Bearer <your_session_jwt_or_cookie>

{
  "query": "What are the core components of a humanoid robot?",
  "session_id": "user-session-123",
  "selected_text": null
}
```

**Response (200 OK):**

```json
{
  "response": "The core components of a humanoid robot typically include actuators, sensors, and a control system. Actuators enable movement, while sensors provide perception of the environment. The control system processes information and dictates actions.",
  "sources": [
    {
      "chapter": "Foundations of Humanoid Robotics",
      "section": "Core Components"
    }
  ],
  "confidence": 0.85
}
```

### `POST /documents/process` - Process Book Chapters

Trigger the ingestion and vectorization of book chapters into the Qdrant vector database.

**Request:**

```http
POST /documents/process HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Authorization: Bearer <your_admin_jwt_or_cookie>

{
  "chapter_ids": ["chapter-01-intro-ai", "chapter-02-foundations-humanoid"]
}
```

**Response (200 OK):**

```json
{
  "message": "Document processing initiated successfully.",
  "processed_chapters": ["chapter-01-intro-ai", "chapter-02-foundations-humanoid"]
}
```

### `GET /chat/history` - Retrieve Conversation History

Retrieve the conversation history for a specific chat session.

**Request:**

```http
GET /chat/history?session_id=user-session-123 HTTP/1.1
Host: localhost:8000
Authorization: Bearer <your_session_jwt_or_cookie>
```

**Response (200 OK):**

```json
{
  "session_id": "user-session-123",
  "history": [
    {
      "query": "What is Physical AI?",
      "response": "Physical AI, also known as embodied AI...",
      "sources": [{"chapter": "Introduction to Physical AI", "section": "What is Physical AI?"}],
      "timestamp": "2023-11-20T10:00:00Z"
    },
    {
      "query": "Tell me more about embodied intelligence.",
      "response": "Embodied intelligence emphasizes...",
      "sources": [{"chapter": "Introduction to Physical AI", "section": "The Importance of Physical Interaction"}],
      "timestamp": "2023-11-20T10:05:00Z"
    }
  ]
}
```

### `GET /health` - Health Check

Verify the operational status of all integrated services (LLM, Vector DB, API).

**Request:**

```http
GET /health HTTP/1.1
Host: localhost:8000
```

**Response (200 OK - All services healthy):**

```json
{
  "status": "ok",
  "components": {
    "gemini_llm": "ok",
    "gemini_embeddings": "ok",
    "qdrant_db": "ok",
    "fastapi_app": "ok"
  }
}
```

**Response (500 Internal Server Error - Degraded/Error):**

```json
{
  "status": "error",
  "components": {
    "gemini_llm": "ok",
    "gemini_embeddings": "ok",
    "qdrant_db": "error",
    "fastapi_app": "ok"
  }
}
```
