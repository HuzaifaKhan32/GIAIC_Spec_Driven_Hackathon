import os
from dotenv import load_dotenv
from openai import AsyncOpenAI
from agents import Agent, OpenAIChatCompletionsModel, set_tracing_disabled

# Load environment variables from .env file
load_dotenv()

# Disable agent tracing if not needed
set_tracing_disabled(True)

# Fetch Gemini configuration from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    # In the previous implementation, this was GOOGLE_API_KEY.
    # The constitution specifies GEMINI_API_KEY, so we check for both for compatibility.
    GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY or GOOGLE_API_KEY not found in environment variables.")

# The OpenAI-compatible endpoint for Gemini
GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/"
GEMINI_MODEL_NAME = "models/gemini-2.5-flash" # Use the specific model name for the API
EMBEDDING_MODEL_NAME = "models/text-embedding-004"


class GeminiAgentClient:
    """
    A client for interacting with a Google Gemini model via an OpenAI-compatible interface.
    This client uses the OpenAI Agent SDK.
    """
    
    def __init__(self):
        """Initializes the asynchronous OpenAI client to point to Gemini's endpoint."""
        print("[INFO] Initializing GeminiAgentClient...")
        
        self.client = AsyncOpenAI(
            api_key=GEMINI_API_KEY,
            base_url=GEMINI_BASE_URL,
        )
        
        self.model = OpenAIChatCompletionsModel(
            model=GEMINI_MODEL_NAME,
            openai_client=self.client
        )
        
        print(f"[INFO] GeminiAgentClient initialized with model: {GEMINI_MODEL_NAME}")

    def get_rag_agent(self, instructions: str = "You are a helpful AI assistant.") -> Agent:
        """
        Creates and returns a configured agent for RAG.
        
        Args:
            instructions: The system prompt/instructions for the agent.
            
        Returns:
            A configured Agent instance.
        """
        return Agent(
            name="RAGAssistant",
            instructions=instructions,
            model=self.model
        )

    async def get_embedding(self, text: str) -> list[float]:
        """
        Generates an embedding for the given text using the Gemini embedding model
        through the OpenAI-compatible endpoint.
        
        Args:
            text: The text to embed.
        
        Returns:
            A list of floats representing the embedding vector.
        """
        if not text or not text.strip():
            print("[WARN] Attempted to embed empty or whitespace-only text.")
            return []
            
        try:
            print(f"[DEBUG] Generating embedding for text: '{text[:50]}...'")
            
            response = await self.client.embeddings.create(
                model=EMBEDDING_MODEL_NAME,
                input=[text]
            )
            
            embedding = response.data[0].embedding
            print(f"[DEBUG] Embedding generated successfully. Size: {len(embedding)}")
            return embedding
            
        except Exception as e:
            print(f"[ERROR] Failed to generate embedding: {e}")
            import traceback
            traceback.print_exc()
            return None

# Example usage for testing the client
async def main():
    """Main function to test the GeminiAgentClient."""
    try:
        print("\n--- Testing GeminiAgentClient ---")
        client = GeminiAgentClient()

        # --- Test 1: Get Embedding ---
        print("\n--- Testing Embedding Generation ---")
        query = "What is Physical AI?"
        embedding = await client.get_embedding(query)
        if embedding:
            print(f"✓ Embedding for '{query}' successful. Size: {len(embedding)}\n")
        else:
            print(f"✗ Embedding for '{query}' failed.\n")

        # --- Test 2: Run Agent ---
        print("--- Testing Agent Execution ---")
        rag_agent = client.get_rag_agent(
            instructions="You are an expert on robotics. Answer the user's question."
        )
        
        # The Runner is imported from the agents library and is used to execute the agent
        from agents import Runner
        
        user_prompt = "What are the main components of a humanoid robot?"
        print(f"Running agent with prompt: '{user_prompt}'")
        
        # The Runner.run() method is asynchronous
        result = await Runner.run(rag_agent, input=user_prompt)
        
        if result:
            print(f"✓ Agent executed successfully. Response: {result}\n")
        else:
            print("✗ Agent execution failed.\n")

    except Exception as e:
        print(f"[FATAL] An error occurred during client testing: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
