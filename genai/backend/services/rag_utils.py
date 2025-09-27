# services/rag_utils.py

def merge_context(global_context: str, space_context: str, chat_context: str = "") -> str:
    """
    Merge all contexts so the LLM/vector store sees unified memory.
    Priority: Global > Space > Chat
    """
    merged = f"""
    [User Global Memory]
    {global_context}

    [Space Context]
    {space_context}

    [Chat Context]
    {chat_context}
    """
    return merged.strip()
