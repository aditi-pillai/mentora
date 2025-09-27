# routes/ingest_routes.py
from flask import Blueprint, request, jsonify
import os, uuid
from services.extractor import extract_text_from_file
from services.text_splitter import chunk_text
from services.vector_service import upsert_chunks

ingest_bp = Blueprint("ingest", __name__)

@ingest_bp.route("/file", methods=["POST"])
def ingest_file():
    """
    POST /api/ingest/file
    form-data:
      - file (file)
      - user_id (str)
      - space_id (str) - For spaces OR chat_id for chat contexts
      - context_type (str) - 'space' for extensive contexts, 'chat' for normal chat, 'global' for user global
      - doc_id (optional) if not provided it will be generated
    """
    f = request.files.get("file")
    if not f:
        return jsonify({"error":"no file"}), 400
    
    user_id = request.form.get("user_id", "anon")
    space_id = request.form.get("space_id", "default_space")
    context_type = request.form.get("context_type", "space")  # 'space', 'chat', or 'global'
    doc_id = request.form.get("doc_id") or f"{user_id}_{uuid.uuid4().hex[:8]}"

    # save temp
    os.makedirs("data/uploads", exist_ok=True)
    save_path = os.path.join("data/uploads", f"{doc_id}_{f.filename}")
    f.save(save_path)

    # extract text (handles pdf/docx/img/video via placeholder ASR)
    try:
        text, images_meta = extract_text_from_file(save_path)
    except Exception as e:
        return jsonify({"error":"extraction_failed", "detail": str(e)}), 500

    # chunk text
    chunks = chunk_text(text)

    # upsert chunks into appropriate collection based on context_type
    upsert_result = upsert_chunks(
        doc_id=doc_id, 
        space_id=space_id, 
        user_id=user_id, 
        chunks=chunks, 
        metadatas=[{"filename": f.filename, "page": idx//1} for idx,_ in enumerate(chunks)],
        context_type=context_type
    )

    return jsonify({
        "status":"ok",
        "doc_id": doc_id,
        "context_type": context_type,
        "space_or_chat_id": space_id,
        "inserted_chunks": upsert_result.get("inserted", len(chunks)),
        "images_meta": images_meta
    })
