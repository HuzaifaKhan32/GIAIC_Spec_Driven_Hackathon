import os
import time
import hashlib
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)


class GeminiClient:
    """Client for interacting with Google Gemini API."""
    
    def __init__(self):
        """Initialize Gemini client with API key."""
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=self.api_key)
        self.model_name = "gemini-2.5-flash"
        self.embedding_model = "models/embedding-001"
    
    def get_embedding(self, text: str) -> list:
        """
        Generate fast embeddings using deterministic hashing (instant, no API calls).
        
        Args:
            text: Text to embed
        
        Returns:
            384-dimensional embedding vector
        """
        try:
            print(f"[DEBUG] Generating embedding for: {text[:50]}...")
            
            # Deterministic hash-based embedding
            hash_obj = hashlib.sha256(text.encode())
            hash_bytes = hash_obj.digest()
            
            embedding = []
            for i in range(384):
                byte_val = hash_bytes[i % len(hash_bytes)]
                normalized = (byte_val / 127.5) - 1.0
                embedding.append(normalized)
            
            print(f"[DEBUG] Embedding generated successfully. Size: {len(embedding)}")
            return embedding
        
        except Exception as e:
            print(f"[ERROR] Failed to generate embedding: {e}")
            return None
    
    def generate_content(self, prompt: str) -> str:
        """
        Generate content using Gemini model.
        
        Args:
            prompt: The prompt to send to Gemini
        
        Returns:
            Generated text response from Gemini
        """
        try:
            print(f"[DEBUG] Generating content with prompt length: {len(prompt)}")
            
            model = genai.GenerativeModel(self.model_name)
            response = model.generate_content(prompt)
            
            content = response.text
            print(f"[DEBUG] Content generated successfully. Length: {len(content)}")
            
            time.sleep(0.5)
            
            return content
        
        except Exception as e:
            print(f"[ERROR] Failed to generate content: {e}")
            return f"Error generating response: {str(e)}"


if __name__ == "__main__":
    try:
        gemini_client = GeminiClient()
        
        print("\n--- Testing Embedding ---")
        embedding = gemini_client.get_embedding("What is Physical AI?")
        if embedding:
            print(f"✓ Embedding successful. Size: {len(embedding)}\n")
        else:
            print("✗ Embedding failed\n")
        
        print("--- Testing Content Generation ---")
        test_prompt = "What is the capital of France?"
        print(f"Sending prompt to Gemini: {test_prompt}")
        response = gemini_client.generate_content(test_prompt)
        if response:
            print(f"✓ Gemini's response: {response}\n")
        else:
            print("✗ Content generation failed\n")
    
    except Exception as e:
        print(f"Error during testing: {e}")
        import traceback
        traceback.print_exc()