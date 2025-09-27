# routes/generate_routes.py
from flask import Blueprint, request, jsonify
from services.quiz_generator import generate_quiz
from services.flashcard_generator import generate_flashcards
from services.ppt_generator import generate_ppt

generate_bp = Blueprint("generate", __name__)

@generate_bp.route("/all", methods=["POST"])
def generate_all():
    """
    POST /api/generate/all
    JSON:
      {
        "user_id":"u1",
        "space_id":"s1",  // Can be space_id or chat_id
        "context_type": "space",  // 'space' for extensive contexts, 'chat' for normal chat
        "chat_recent": "short chat text",
        "make_ppt": true,
        "make_quiz": true,
        "make_flashcards": true,
        "ppt_filename": "myfile.pptx",
        "num_questions": 6,
        "num_cards": 10
      }
    """
    data = request.get_json() or {}
    user_id = data.get("user_id", "anon")
    space_id = data.get("space_id", "default_space")
    context_type = data.get("context_type", "space")  # 'space' or 'chat'
    chat_recent = data.get("chat_recent", "")
    make_ppt = data.get("make_ppt", False)
    make_quiz = data.get("make_quiz", False)
    make_flashcards = data.get("make_flashcards", False)
    ppt_filename = data.get("ppt_filename")
    num_questions = int(data.get("num_questions", 6))
    num_cards = int(data.get("num_cards", 10))

    output = {}

    try:
        if make_quiz:
            q = generate_quiz(user_id=user_id, space_id=space_id, chat_recent=chat_recent, num_questions=num_questions, context_type=context_type)
            output["quiz"] = q

        if make_flashcards:
            fc = generate_flashcards(user_id=user_id, space_id=space_id, chat_recent=chat_recent, num_cards=num_cards, context_type=context_type)
            output["flashcards"] = fc

        if make_ppt:
            ppt = generate_ppt(user_id=user_id, space_id=space_id, chat_recent=chat_recent, filename=ppt_filename, context_type=context_type)
            output["ppt"] = ppt

        return jsonify(output)
    
    except Exception as e:
        return jsonify({"error": "generation_failed", "detail": str(e)}), 500
