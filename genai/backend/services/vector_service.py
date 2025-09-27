# services/vector_service.py
import os, uuid, hashlib
from typing import List, Dict, Any
import chromadb
from chromadb.config import Settings
from services.embedder import get_embeddings
from config import CHROMA_PERSIST_DIR

# Persistent client
client = chromadb.PersistentClient(path=CHROMA_PERSIST_DIR)

def _collection_name_for_space(user_id: str, space_id: str) -> str:
    return f"user_{user_id}_space_{space_id}"

def _collection_name_for_chat(user_id: str, chat_id: str) -> str:
    return f"user_{user_id}_chat_{chat_id}"

def _collection_name_for_user_global(user_id: str) -> str:
    return f"user_{user_id}_global"

def get_or_create_collection(name: str):
    try:
        return client.get_collection(name)
    except Exception:
        # create with no embedding function because we will provide embeddings ourselves
        return client.create_collection(name)

def upsert_chunks(doc_id: str, space_id: str, user_id: str, chunks: List[str], metadatas: List[Dict[str,Any]] = None, context_type: str = "space"):
    """
    Add chunks to appropriate collection based on context_type.
    context_type can be 'space', 'chat', or 'global'
    """
    if context_type == "space":
        coll_name = _collection_name_for_space(user_id, space_id)
    elif context_type == "chat":
        coll_name = _collection_name_for_chat(user_id, space_id)  # space_id doubles as chat_id here
    else:  # global
        coll_name = _collection_name_for_user_global(user_id)
    
    col = get_or_create_collection(coll_name)
    # generate embeddings
    embeddings = get_embeddings(chunks)
    ids = []
    metas = []
    import time
    timestamp = int(time.time())
    
    for i, chunk in enumerate(chunks):
        cid = f"{doc_id}::{i}::{uuid.uuid4().hex[:8]}"
        ids.append(cid)
        meta = {
            "doc_id": doc_id, 
            "space_id": space_id, 
            "user_id": user_id, 
            "chunk_index": i, 
            "text_preview": chunk[:100],
            "context_type": context_type,
            "timestamp": timestamp
        }
        if metadatas and i < len(metadatas):
            meta.update(metadatas[i])
        metas.append(meta)
    col.add(ids=ids, documents=chunks, metadatas=metas, embeddings=embeddings)
    return {"inserted": len(ids)}

def query_top_k(user_id: str, space_id: str, query: str, top_k: int = 10, context_type: str = "space"):
    """
    Query specific context (space/chat) for relevant chunks
    """
    if context_type == "space":
        coll_name = _collection_name_for_space(user_id, space_id)
    elif context_type == "chat":
        coll_name = _collection_name_for_chat(user_id, space_id)  # space_id doubles as chat_id
    else:
        coll_name = _collection_name_for_user_global(user_id)
        
    try:
        col = get_or_create_collection(coll_name)
        # create embedding for query
        q_emb = get_embeddings([query])[0]
        res = col.query(query_embeddings=[q_emb], n_results=top_k, include=['metadatas','documents','distances'])
        matches = []
        if res and len(res["documents"])>0 and len(res["documents"][0])>0:
            docs = res["documents"][0]
            metas = res["metadatas"][0]
            dists = res["distances"][0]
            for i in range(len(docs)):
                # Generate a synthetic ID based on metadata
                doc_id = metas[i].get('doc_id', f'chunk_{i}')
                matches.append({"id": doc_id, "text": docs[i], "metadata": metas[i], "distance": dists[i]})
        return matches
    except Exception as e:
        print(f"Error querying collection {coll_name}: {e}")
        return []

def query_global_top_k(user_id: str, query: str, top_k: int = 8):
    """
    Query user's global context for relevant chunks
    """
    return query_top_k(user_id, "", query, top_k, context_type="global")

def query_comprehensive_context(user_id: str, space_or_chat_id: str, query: str, context_type: str = "space", max_chunks: int = 20):
    """
    Get comprehensive context by combining specific context (space/chat) and global context
    """
    # Get specific context (space or chat)
    specific_matches = query_top_k(user_id, space_or_chat_id, query, top_k=max_chunks//2, context_type=context_type)
    
    # Get global context
    global_matches = query_global_top_k(user_id, query, top_k=max_chunks//4)
    
    # If we have a query, also search with general terms to get broader context
    if query and query != "__global_query__":
        broad_matches = query_top_k(user_id, space_or_chat_id, "__global_query__", top_k=max_chunks//4, context_type=context_type)
        all_matches = specific_matches + global_matches + broad_matches
    else:
        all_matches = specific_matches + global_matches
    
    # Remove duplicates based on text content
    seen_texts = set()
    unique_matches = []
    for match in all_matches:
        text_hash = hashlib.md5(match["text"].encode()).hexdigest()
        if text_hash not in seen_texts:
            seen_texts.add(text_hash)
            unique_matches.append(match)
    
    # Sort by relevance (distance) and return top results
    unique_matches.sort(key=lambda x: x.get("distance", 1.0))
    return unique_matches[:max_chunks]
