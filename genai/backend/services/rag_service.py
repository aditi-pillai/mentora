from services.ppt_generator import generate_ppt
from services.quiz_generator import generate_quiz
from services.flashcard_generator import generate_flashcards
from services.vector_service import search_context

def rag_pipeline(user_id, space_id, query, make_ppt=False, make_quiz=False, make_flashcards=False):
    context = search_context(query)
    outputs = {}

    if make_ppt:
        outputs['ppt'] = generate_ppt(context)
    if make_quiz:
        outputs['quiz'] = generate_quiz(context)
    if make_flashcards:
        outputs['flashcards'] = generate_flashcards(context)

    return outputs
