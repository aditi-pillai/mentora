# services/context_builder.py
from services.vector_service import query_comprehensive_context
from services.summarizer import map_reduce_summarize
from services.text_splitter import chunk_text
from config import MAX_CONTEXT_CHUNKS
from typing import Dict, Optional

def build_full_context(user_id: str, space_id: str, chat_recent: str = "", mode: str = "general", context_type: str = "space") -> Dict:
    """
    Retrieve comprehensive context from user's space/chat and global collections.
    Automatically handles context summarization if needed.
    
    Args:
        user_id: User identifier
        space_id: Space or chat identifier
        chat_recent: Recent chat context to help with query
        mode: Generation mode (quiz, flashcards, ppt, general)
        context_type: 'space' for extensive contexts, 'chat' for normal chat
    """
    
    # Build query from recent chat and mode
    query_text = chat_recent if chat_recent else "__global_query__"
    if mode != "general":
        query_text = f"{chat_recent} {mode}" if chat_recent else f"generate {mode}"
    
    # Get comprehensive context
    all_matches = query_comprehensive_context(
        user_id=user_id, 
        space_or_chat_id=space_id, 
        query=query_text, 
        context_type=context_type,
        max_chunks=MAX_CONTEXT_CHUNKS
    )

    texts = [m["text"] for m in all_matches]
    provenance = [{"id": m["id"], "metadata": m["metadata"], "distance": m.get("distance")} for m in all_matches]

    joined = "\n\n".join(texts)
    
    # If too long, use map-reduce summarization
    if len(joined) > 15000:
        split = chunk_text(joined, chunk_size_chars=2000, overlap_chars=200)
        summary_obj = map_reduce_summarize(split)
        # Build merged text from sections
        merged = summary_obj.get("title","Study Context") + "\n\n" + "\n\n".join([s["summary"] for s in summary_obj.get("sections", [])])
    else:
        merged = joined

    if chat_recent:
        merged = "[Chat Context]\n" + chat_recent + "\n\n[Retrieved Knowledge]\n" + merged

    return {"merged_text": merged, "provenance": provenance}
