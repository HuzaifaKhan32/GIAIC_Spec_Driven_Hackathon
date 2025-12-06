import os
from qdrant_client import AsyncQdrantClient, models
from dotenv import load_dotenv

load_dotenv()


class VectorDBClient:
    """Asynchronous client for interacting with Qdrant vector database."""
    
    def __init__(self):
        """Initialize Qdrant client."""
        self.url = os.getenv("QDRANT_URL")
        self.api_key = os.getenv("QDRANT_API_KEY")
        self.collection_name = os.getenv("QDRANT_COLLECTION_NAME", "rag_chatbot_collection")
        
        if not self.url:
            raise ValueError("QDRANT_URL must be set in environment")
        
        # Initialize AsyncQdrantClient
        # Note: api_key can be None if Qdrant is running without authentication
        self.client = AsyncQdrantClient(
            url=self.url,
            api_key=self.api_key
        )
        
        print(f"[DEBUG] AsyncQdrantClient initialized for URL: {self.url}")
        print(f"[DEBUG] Using collection: {self.collection_name}")
    
    async def search_vectors(self, query_vector: list, limit: int = 5):
        """
        Search Qdrant for similar vectors asynchronously.
        
        Args:
            query_vector: The embedding vector to search for (list of floats)
            limit: Number of results to return (default: 5)
        
        Returns:
            List of search results with payloads and scores
        """
        try:
            print(f"[DEBUG] Asynchronously searching Qdrant with {len(query_vector)}-dim vector")
            
            # The correct method name is 'search_points'
            search_results = await self.client.search_points(
                collection_name=self.collection_name,
                query_vector=query_vector,
                limit=limit,
                with_payload=True  # Ensure payload is returned
            )
            
            print(f"[DEBUG] Found {len(search_results)} results from Qdrant")
            
            return search_results
        
        except Exception as e:
            print(f"[ERROR] Qdrant async search failed: {e}")
            print(f"[ERROR] Collection name: {self.collection_name}")
            print(f"[ERROR] Vector size: {len(query_vector) if query_vector else 'None'}")
            import traceback
            traceback.print_exc()
            return []
    
    async def get_collection_info(self):
        """Get information about the collection asynchronously."""
        try:
            info = await self.client.get_collection(collection_name=self.collection_name)
            return info
        except Exception as e:
            print(f"[ERROR] Failed to get collection info: {e}")
            return None


# Test the client
async def main():
    try:
        client = VectorDBClient()
        print("✓ AsyncQdrantClient initialized successfully")
        
        # Get collection info
        info = await client.get_collection_info()
        if info:
            print(f"✓ Collection info: {info.vectors_config}")
        else:
            print("✗ Could not get collection info")
            
        # Example of a search (requires a valid vector)
        # print("\n--- Testing Search (example) ---")
        # try:
        #     # You would get a real vector from your embedding model
        #     dummy_vector = [0.1] * 1536 # Adjust size to match your collection
        #     search_results = await client.search_vectors(dummy_vector, limit=2)
        #     if search_results:
        #         print(f"✓ Search successful. Found {len(search_results)} results.")
        #         for result in search_results:
        #             print(f"  - ID: {result.id}, Score: {result.score}")
        #     else:
        #         print("✓ Search executed but found 0 results.")
        # except Exception as search_error:
        #     print(f"✗ Search test failed: {search_error}")

    
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
