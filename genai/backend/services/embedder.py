# services/embedder.py
import os
import google.generativeai as genai
from typing import List
from config import GEMINI_API_KEY
import time

genai.configure(api_key=GEMINI_API_KEY)

def get_embeddings(texts: List[str]) -> List[List[float]]:
    if not texts:
        return []
    
    # Use Gemini's embedding model
    out = []
    for i, text in enumerate(texts):
        try:
            # Clean the text - remove excessive whitespace and limit length
            cleaned_text = ' '.join(text.split())[:1000]  # Limit to 1000 chars for embedding
            
            if not cleaned_text.strip():
                # If text is empty after cleaning, use a default
                cleaned_text = "Empty document content"
            
            result = genai.embed_content(
                model="models/text-embedding-004",
                content=cleaned_text,
                task_type="retrieval_document"
            )
            
            if 'embedding' in result:
                out.append(result['embedding'])
            else:
                print(f"Warning: No embedding returned for text {i}")
                out.append([0.0] * 768)  # Fallback embedding
                
        except Exception as e:
            print(f"Error embedding text {i}: {e}")
            # Fallback: use zeros for failed embeddings
            out.append([0.0] * 768)  # Standard embedding dimension
            
        # Add small delay to avoid rate limiting
        if i < len(texts) - 1:  # Don't delay after the last item
            time.sleep(0.1)
    
    return out
