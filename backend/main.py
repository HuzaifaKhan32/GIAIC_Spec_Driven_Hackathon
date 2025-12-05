from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
from dotenv import load_dotenv
import os

from .src.rag_engine import RAGEngine

load_dotenv() # Load environment variables

app = FastAPI()

# --- CORS Configuration ---
# Allow requests from your Docusaurus frontend domain
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files (e.g., CSS, JS, images for the chatbot UI)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates for serving HTML (if needed, e.g., for basic landing page or error pages)
templates = Jinja2Templates(directory="templates")

# Initialize RAG Engine
rag_engine = RAGEngine()

# --- Pydantic Models for Chat Endpoints ---
class Message(BaseModel):
    user: str
    ai: str

class ChatRequest(BaseModel):
    query: str
    chat_history: Optional[List[Message]] = []

class Citation(BaseModel):
    title: str
    chapter_path: str
    score: float

class ChatResponse(BaseModel):
    response: str
    citations: List[Citation] = []

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "id": id})

# Health check endpoint (TASK-03-10)
@app.get("/health")
async def health_check():
    try:
        qdrant_status = rag_engine.vector_db_client.client.get_collections().collections
        gemini_status = rag_engine.gemini_client.model.is_available() # Simple check if model is accessible
        return {
            "status": "ok",
            "message": "FastAPI is running!",
            "qdrant_collections": qdrant_status,
            "gemini_model_available": gemini_status
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {e}")

# Chat endpoint (TASK-03-08)
@app.post("/chat", response_model=ChatResponse)
async def chat_with_rag_endpoint(request: ChatRequest):
    try:
        history_dicts = [{"user": msg.user, "ai": msg.ai} for msg in request.chat_history]
        response_data = rag_engine.chat_with_rag(request.query, history_dicts)
        return ChatResponse(
            response=response_data["response"],
            citations=[Citation(**c) for c in response_data["citations"]]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {e}")
