import os
import re
from qdrant_client import models
from qdrant_client.http.models import Distance, VectorParams
from qdrant_client import QdrantClient
import google.generativeai as genai
from dotenv import load_dotenv
from typing import List, Dict
import hashlib # For generating stable IDs

load_dotenv()

# --- Environment Variables ---
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME", "rag_chatbot_collection")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DOCS_PATH = os.path.join(os.path.dirname(__file__), "../../docusaurus/docs") # Path to your Docusaurus docs

# --- Configure Gemini ---
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables.")
genai.configure(api_key=GEMINI_API_KEY)

# Assuming an embedding model
EMBEDDING_MODEL = "text-embedding-004" 
EMBEDDING_SIZE = 768 # text-embedding-004 outputs 768-dimensional vectors

# --- Qdrant Client ---
qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

def get_embedding(text: str) -> List[float]:
    """Generates an embedding for the given text using Gemini's embedding model."""
    response = genai.embed_content(model=EMBEDDING_MODEL, content=text)
    return response['embedding']

def chunk_text(text: str, chunk_size: int = 700, overlap: int = 100) -> List[str]:
    """
    Splits text into chunks of specified size with overlap.
    A simple chunking strategy. More advanced methods exist (e.g., LangChain's RecursiveCharacterTextSplitter).
    """
    chunks = []
    current_chunk = []
    current_length = 0
    
    # Split by paragraphs or sentences
    sentences = re.split(r'(?<=[.!?])\s+', text) 

    for sentence in sentences:
        sentence_length = len(sentence.split()) # Approximate token count
        if current_length + sentence_length <= chunk_size:
            current_chunk.append(sentence)
            current_length += sentence_length
        else:
            chunks.append(" ".join(current_chunk))
            # Start new chunk with overlap
            if overlap > 0 and len(current_chunk) > 0:
                overlap_text = " ".join(current_chunk[-int(overlap/len(current_chunk.split())):]) if current_length > overlap else ""
                current_chunk = [overlap_text, sentence]
                current_length = len(overlap_text.split()) + sentence_length
            else:
                current_chunk = [sentence]
                current_length = sentence_length
                
    if current_chunk:
        chunks.append(" ".join(current_chunk))
        
    return chunks

def extract_markdown_content(filepath: str) -> Dict:
    """
    Extracts content from a markdown file, including frontmatter.
    Assumes Docusaurus-style markdown with YAML frontmatter.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract frontmatter
    frontmatter_match = re.match(r'---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if frontmatter_match:
        frontmatter_str = frontmatter_match.group(1)
        markdown_text = frontmatter_match.group(2).strip()
        
        # Simple frontmatter parsing to get ID and Title
        doc_id_match = re.search(r'id:\s*(.*)', frontmatter_str)
        title_match = re.search(r'title:\s*["']?(.*?)["']?', frontmatter_str)
        
        doc_id = doc_id_match.group(1).strip() if doc_id_match else os.path.splitext(os.path.basename(filepath))[0]
        title = title_match.group(1).strip() if title_match else "No Title"

        # Remove markdown specific syntax (e.g., images) from the text for embedding
        markdown_text = re.sub(r'![\[.*?](.*?)[\]\(.*?\))', '', markdown_text) # Remove image syntax
        markdown_text = re.sub(r'[\[.*?](.*?)[\]\(.*?\))', '', markdown_text) # Remove link syntax

        return {"id": doc_id, "title": title, "text": markdown_text, "filepath": filepath}
    
    return {"id": os.path.splitext(os.path.basename(filepath))[0], "title": "No Title", "text": content.strip(), "filepath": filepath}

def ingest_documents(docs_path: str):
    """
    Walks through the docs directory, extracts content, chunks it,
    generates embeddings, and upserts to Qdrant.
    """
    # Recreate collection to ensure a clean state
    qdrant_client.recreate_collection(
        collection_name=QDRANT_COLLECTION_NAME,
        vectors_config=VectorParams(size=EMBEDDING_SIZE, distance=Distance.COSINE),
    )
    print(f"Collection '{QDRANT_COLLECTION_NAME}' recreated.")

    points = []
    for root, _, files in os.walk(docs_path):
        for file in files:
            if file.endswith(".md") or file.endswith(".mdx"):
                filepath = os.path.join(root, file)
                doc_info = extract_markdown_content(filepath)
                
                # Derive relative path for metadata
                relative_path = os.path.relpath(filepath, DOCS_PATH)
                # Remove file extension and numerical prefix for cleaner path
                display_path = re.sub(r'^\d{2}-', '', os.path.splitext(relative_path)[0])


                doc_chunks = chunk_text(doc_info["text"])
                print(f"Processing '{filepath}': {len(doc_chunks)} chunks.")

                for i, chunk in enumerate(doc_chunks):
                    # Generate a unique and stable ID for each chunk
                    # Combine doc_id, chunk index, and a hash of the chunk content
                    chunk_id_str = f"{doc_info['id']}-{i}-{hashlib.md5(chunk.encode()).hexdigest()[:8]}"
                    point_id = int(hashlib.sha256(chunk_id_str.encode()).hexdigest(), 16) % (10**9) # Qdrant IDs are u64

                    embedding = get_embedding(chunk)
                    if embedding:
                        points.append(
                            models.PointStruct(
                                id=point_id,
                                vector=embedding,
                                payload={
                                    "text": chunk,
                                    "doc_id": doc_info["id"],
                                    "title": doc_info["title"],
                                    "chapter_path": display_path,
                                    "chunk_number": i,
                                }
                            )
                        )
    
    if points:
        print(f"Upserting {len(points)} points to Qdrant...")
        qdrant_client.upsert(
            collection_name=QDRANT_COLLECTION_NAME,
            wait=True,
            points=points
        )
        print("Document ingestion complete.")
    else:
        print("No documents found for ingestion.")

if __name__ == "__main__":
    if not QDRANT_URL or not QDRANT_API_KEY or not GEMINI_API_KEY:
        print("Error: QDRANT_URL, QDRANT_API_KEY, or GEMINI_API_KEY not set in .env")
        print("Please configure your .env file before running the ingestion script.")
    else:
        ingest_documents(docs_path=DOCS_PATH)
