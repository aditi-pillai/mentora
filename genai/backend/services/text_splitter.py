# services/text_splitter.py
from typing import List

def chunk_text(text: str, chunk_size_chars: int = 1800, overlap_chars: int = 200) -> List[str]:
    text = text.replace("\r\n", "\n")
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    chunks = []
    buf = ""
    for p in paragraphs:
        if len(buf) + len(p) + 2 <= chunk_size_chars:
            buf = buf + "\n\n" + p if buf else p
        else:
            if buf:
                chunks.append(buf.strip())
            if len(p) > chunk_size_chars:
                start = 0
                while start < len(p):
                    end = start + chunk_size_chars
                    chunks.append(p[start:end].strip())
                    start = max(end - overlap_chars, start + chunk_size_chars)
                buf = ""
            else:
                buf = p
    if buf:
        chunks.append(buf.strip())
    # dedupe first 100 chars
    seen = set()
    out = []
    for c in chunks:
        key = c[:120]
        if key not in seen:
            out.append(c)
            seen.add(key)
    return out
