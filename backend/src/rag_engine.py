import os
from typing import List, Dict
from .vector_db import VectorDBClient
from .llm_client import GeminiAgentClient
from agents import Runner

class RAGEngine:
    """
    The RAGEngine orchestrates the Retrieval-Augmented Generation process.
    It uses a vector database to find relevant context and an AI agent to generate answers.
    """
    def __init__(self):
        """Initializes the RAG engine with a vector DB client and an agent client."""
        print("[INFO] Initializing RAGEngine...")
        self.vector_db_client = VectorDBClient()
        self.gemini_agent_client = GeminiAgentClient()
        self.qdrant_collection_name = os.getenv("QDRANT_COLLECTION_NAME")
        print("[INFO] RAGEngine initialized.")

    def _augment_prompt(self, query: str, context: List[str], chat_history: List[Dict]) -> str:
        """
        Constructs the augmented prompt to be sent to the agent, including context and history.
        """
        history_str = "\n".join([f"User: {msg['user']}\nAI: {msg['ai']}" for msg in chat_history])
        context_str = "\n---\n".join(context)

        # This prompt structure provides clear sections for the agent to work with.
        prompt = f"""
## Previous Conversation:
{history_str if history_str else "No previous conversation."} 

## Relevant Textbook Content:
{context_str if context_str else "No relevant content found."} 

## User's Current Question:
{query}
"""
        return prompt

    async def chat_with_rag(self, query: str, chat_history: List[Dict]) -> Dict:
        """
        Performs the full RAG pipeline asynchronously.
        
        1.  Embeds the user's query.
        2.  Retrieves relevant documents from the vector database.
        3.  Augments a prompt with the retrieved context.
        4.  Runs a configured AI agent to generate a response.
        
        Args:
            query: The user's question.
            chat_history: The history of the conversation.
            
        Returns:
            A dictionary containing the AI's response and any source citations.
        """
        print(f"[INFO] RAGEngine received query: '{query}'")
        
        # 1. Retrieve
        print("[INFO] Step 1: Retrieving context from vector database...")
        query_embedding = await self.gemini_agent_client.get_embedding(query)
        if query_embedding is None:
            print("[ERROR] Could not generate query embedding.")
            return {"response": "Error: Could not generate an embedding for the query.", "citations": []}

        search_results = await self.vector_db_client.search_vectors(query_embedding, limit=5)
        
        context_texts = [hit.payload.get('text', '') for hit in search_results]
        citations = [
            {
                "title": hit.payload.get('title', 'Unknown Title'), 
                "chapter_path": hit.payload.get('chapter_path', 'Unknown Path'), 
                "score": hit.score
            }
            for hit in search_results
        ]
        print(f"[INFO] Retrieved {len(context_texts)} context chunks.")

        # 2. Augment
        print("[INFO] Step 2: Augmenting prompt with context...")
        augmented_prompt = self._augment_prompt(query, context_texts, chat_history)

        # 3. Generate
        print("[INFO] Step 3: Generating response with AI agent...")
        instructions = """You are an expert AI assistant for the "Physical AI & Humanoid Robotics" textbook.
Your task is to answer the user's question based *only* on the provided "Relevant Textbook Content" and "Previous Conversation".
- Do not use any external knowledge.
- If the answer is not found in the provided content, you MUST state that you cannot answer based on the information available.
- If the user asks a question outside the scope of the textbook, politely decline to answer.
- Your answers should be clear, concise, and directly reference the provided content where possible."""
        
        rag_agent = self.gemini_agent_client.get_rag_agent(instructions=instructions)
        
        # Run the agent with the augmented prompt and extract the final string output
        run_result = await Runner.run(rag_agent, input=augmented_prompt)
        response_text = run_result.final_output if run_result else "No response from agent."
        print("[INFO] Response generated.")
        
        return {"response": response_text, "citations": citations}