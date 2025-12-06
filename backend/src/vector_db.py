import os
from qdrant_client import QdrantClient
from dotenv import load_dotenv

load_dotenv()


class VectorDBClient:
    """Client for interacting with Qdrant vector database."""
    
    def __init__(self):
        """Initialize Qdrant client."""
        self.url = os.getenv("QDRANT_URL")
        self.api_key = os.getenv("QDRANT_API_KEY")
        self.collection_name = os.getenv("QDRANT_COLLECTION_NAME", "rag_chatbot_collection")
        
        if not self.url or not self.api_key:
            raise ValueError("QDRANT_URL and QDRANT_API_KEY must be set in environment")
        
        # Initialize Qdrant client
        self.client = QdrantClient(
            url=self.url,
            api_key=self.api_key
        )
        
        print(f"[DEBUG] Connected to Qdrant at {self.url}")
        print(f"[DEBUG] Using collection: {self.collection_name}")
    
    def search_vectors(self, query_vector: list, limit: int = 5):
        """
        Search Qdrant for similar vectors.
        
        Args:
            query_vector: The embedding vector to search for (list of floats)
            limit: Number of results to return (default: 5)
        
        Returns:
            List of search results with payloads and scores
        """
        try:
            print(f"[DEBUG] Searching Qdrant with {len(query_vector)}-dim vector")
            
            # Search for similar vectors
            results = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_vector,
                limit=limit
            )
            
            print(f"[DEBUG] Found {len(results)} results from Qdrant")
            
            return results
        
        except Exception as e:
            print(f"[ERROR] Qdrant search failed: {e}")
            print(f"[ERROR] Collection name: {self.collection_name}")
            print(f"[ERROR] Vector size: {len(query_vector) if query_vector else 'None'}")
            import traceback
            traceback.print_exc()
            return []
    
    def get_collection_info(self):
        """Get information about the collection."""
        try:
            info = self.client.get_collection(self.collection_name)
            return info
        except Exception as e:
            print(f"[ERROR] Failed to get collection info: {e}")
            return None


# Test the client
if __name__ == "__main__":
    try:
        client = VectorDBClient()
        print("✓ Qdrant client initialized successfully")
        
        # Get collection info
        info = client.get_collection_info()
        if info:
            print(f"✓ Collection info: {info}")
        else:
            print("✗ Could not get collection info")
    
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()