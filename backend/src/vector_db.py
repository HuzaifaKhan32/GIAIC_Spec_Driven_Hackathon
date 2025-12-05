from qdrant_client import QdrantClient, models
from qdrant_client.http.models import Distance, VectorParams
from dotenv import load_dotenv
import os

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME")

class VectorDBClient:
    def __init__(self):
        self.client = QdrantClient(
            url=QDRANT_URL,
            api_key=QDRANT_API_KEY,
        )
        self.collection_name = QDRANT_COLLECTION_NAME

    def recreate_collection(self, vector_size: int = 768): # Assuming a common embedding size
        """
        Recreates the Qdrant collection, deleting if it already exists.
        """
        self.client.recreate_collection(
            collection_name=self.collection_name,
            vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
        )
        print(f"Collection '{self.collection_name}' recreated with vector size {vector_size}.")

    def upsert_vectors(self, points):
        """
        Upserts (inserts or updates) vectors into the Qdrant collection.
        'points' should be a list of models.PointStruct.
        """
        operation_info = self.client.upsert(
            collection_name=self.collection_name,
            wait=True,
            points=points
        )
        print(f"Upserted points. Status: {operation_info.status}")
        return operation_info

    def search_vectors(self, query_vector, limit: int = 3, score_threshold: float = 0.7):
        """
        Searches the Qdrant collection for vectors similar to the query_vector.
        """
        search_result = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_vector,
            limit=limit,
            score_threshold=score_threshold
        )
        return search_result

# Example usage (for testing purposes, won't run in production as part of the API)
if __name__ == "__main__":
    # Ensure .env is configured with valid QDRANT_URL and QDRANT_API_KEY
    # This part would typically be used in an ingestion script, not the web API itself
    db_client = VectorDBClient()
    print(f"Connected to Qdrant: {db_client.client.http.url}")

    # Example: Recreate collection and upsert a dummy point
    # try:
    #     db_client.recreate_collection(vector_size=768) # Adjust vector_size based on your embedding model
    #     dummy_point = models.PointStruct(
    #         id=0,
    #         vector=[0.1] * 768, # dummy vector
    #         payload={"text": "This is a dummy text for testing."}
    #     )
    #     db_client.upsert_vectors(points=[dummy_point])
    #     print("Dummy point upserted.")
    #
    #     search_results = db_client.search_vectors(query_vector=[0.101] * 768)
    #     for hit in search_results:
    #         print(f"Found: {hit.payload['text']} with score {hit.score}")
    # except Exception as e:
    #     print(f"An error occurred: {e}")
