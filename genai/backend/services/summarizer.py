# services/summarizer.py
import os, json
from services.llm_utils import call_chat, extract_json

def summarize_chunk(chunk: str):
    prompt = f"""Summarize the following chunk into 3 short bullet points (8-16 words each). Return JSON: {{ "bullets": ["...","...","..."] }}
Chunk:
\"\"\"{chunk}\"\"\""""
    resp = call_chat(prompt, temperature=0.0, max_tokens=300)
    out = extract_json(resp)
    if out and "bullets" in out:
        return out["bullets"]
    return [chunk[:200]]

def map_reduce_summarize(chunks: list):
    # map: summarize each chunk
    summaries = []
    for c in chunks:
        b = summarize_chunk(c)
        summaries.append(" ".join(b))
    # reduce into structured summary
    combined = "\n\n".join(summaries)
    prompt = f"""Combine the following chunk summaries into a helpful study summary with 6 sections. Return JSON: {{
  "title":"...",
  "sections":[{{"heading":"...","summary":"... (1-2 lines)"}}, ...]
}}
Summaries:
\"\"\"{combined}\"\"\""""
    resp = call_chat(prompt, temperature=0.0, max_tokens=800)
    out = extract_json(resp)
    if out and "sections" in out:
        return out
    return {"title":"Study Summary", "sections":[{"heading":"Summary","summary": combined[:2000]}]}
