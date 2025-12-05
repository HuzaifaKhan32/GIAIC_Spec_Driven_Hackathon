from typing import List, Dict
from qdrant_client.http.models import Filter, FieldCondition, MatchValue
from .vector_db import VectorDBClient
from .llm_client import GeminiClient
import os

class RAGEngine:
    def __init__(self):
        self.vector_db_client = VectorDBClient()
        self.gemini_client = GeminiClient()
        self.qdrant_collection_name = os.getenv("QDRANT_COLLECTION_NAME")

    def _build_rag_prompt(self, query: str, context: List[str], chat_history: List[Dict]) -> str:
        """
        Constructs the prompt for the Gemini model, incorporating chat history and retrieved context.
        """
        history_str = ""
        for msg in chat_history:
            history_str += f"User: {msg['user']}\nAI: {msg['ai']}\n"
        
        context_str = "\n".join(context)

        prompt = f"""You are an AI assistant designed to answer questions about the "Physical AI & Humanoid Robotics" textbook.
Use the provided context and chat history to answer the user's question.
If the answer is not in the provided context, state that you cannot answer from the given information.
If the question is outside the scope of the "Physical AI & Humanoid Robotics" textbook, politely decline to answer.

Chat History:
{history_str}

Context from the Textbook:
{context_str}

User Question: {query}
AI:"""
        return prompt

    def chat_with_rag(self, query: str, chat_history: List[Dict]) -> Dict:
        """
        Performs RAG (Retrieve, Augment, Generate) to answer a user query.
        """
        # 1. Retrieve: Get embedding for the query and search Qdrant
        query_embedding = self.gemini_client.get_embedding(query)
        if query_embedding is None:
            return {"response": "Error: Could not generate embedding for the query.", "citations": []}

        search_results = self.vector_db_client.search_vectors(query_embedding, limit=5)
        
        context_texts = [hit.payload['text'] for hit in search_results]
        citations = [
            {"title": hit.payload['title'], "chapter_path": hit.payload['chapter_path'], "score": hit.score}
            for hit in search_results
        ]

        # 2. Augment: Build prompt with retrieved context and chat history
        prompt = self._build_rag_prompt(query, context_texts, chat_history)

        # 3. Generate: Get response from Gemini
        response_text = self.gemini_client.generate_content(prompt)
        
        return {"response": response_text, "citations": citations}
