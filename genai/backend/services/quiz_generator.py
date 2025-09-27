# services/quiz_generator.py
from services.context_builder import build_full_context
from services.llm_utils import call_chat, extract_json

def generate_quiz(user_id: str, space_id: str, chat_recent: str = "", num_questions: int = 6, context_type: str = "space"):
    ctx = build_full_context(user_id=user_id, space_id=space_id, chat_recent=chat_recent, mode="quiz", context_type=context_type)
    merged = ctx["merged_text"]
    prompt = f"""
Generate a comprehensive educational quiz with exactly {num_questions} multiple-choice questions based on the provided context.

Content Requirements:
- Create questions that test different levels of understanding (basic recall, comprehension, application, analysis)
- Include questions about key concepts, definitions, practical applications, and theoretical foundations
- Ensure questions are academically rigorous and educationally valuable
- Cover different aspects of the topic comprehensively
- Include both factual and conceptual questions

Question Quality Standards:
- Each question should be clear, unambiguous, and well-structured
- Provide exactly 4 options labeled "a", "b", "c", and "d"
- Ensure only one option is clearly correct
- Make incorrect options plausible but distinctly wrong
- Include comprehensive explanations that provide educational value
- Questions should be challenging but fair for the educational level

For each question, provide detailed explanations that:
- Explain why the correct answer is right
- Briefly explain why other options are incorrect
- Provide additional context or related information
- Include practical applications or real-world relevance where applicable

Output format - Return valid JSON with exactly this structure:
{{
  "quiz": [
    {{
      "question": "Clear, specific question testing important concept (aim for 15-30 words)",
      "options": {{
        "a": "First option with specific, detailed answer",
        "b": "Second option with plausible but incorrect information", 
        "c": "Third option with related but wrong concept",
        "d": "Fourth option with clearly incorrect but reasonable-sounding answer"
      }},
      "answer": "a",
      "explanation": "Comprehensive explanation covering why 'a' is correct, why other options are wrong, additional context, and practical relevance (50-100 words)",
      "difficulty_level": "intermediate",
      "concept_category": "main concept being tested",
      "provenance": ["source information"]
    }}
  ]
}}

Generate exactly {num_questions} questions with varied difficulty levels and comprehensive coverage.

CONTEXT:
{merged}
"""
    try:
        reply = call_chat(prompt, temperature=0.2, max_tokens=1200)
        data = extract_json(reply)
        
        # Validate quiz structure
        if data and isinstance(data, dict) and "quiz" in data and isinstance(data["quiz"], list):
            # Ensure each question has proper structure
            valid_questions = []
            for q in data["quiz"]:
                if isinstance(q, dict) and "question" in q and "options" in q and "answer" in q:
                    # Handle both list and dict formats for options
                    if isinstance(q["options"], list):
                        # Convert list to dict format
                        options_list = q["options"]
                        q["options"] = {
                            "a": options_list[0] if len(options_list) > 0 else "Option A",
                            "b": options_list[1] if len(options_list) > 1 else "Option B", 
                            "c": options_list[2] if len(options_list) > 2 else "Option C",
                            "d": options_list[3] if len(options_list) > 3 else "Option D"
                        }
                    elif not isinstance(q["options"], dict):
                        q["options"] = {"a": "Option A", "b": "Option B", "c": "Option C", "d": "Option D"}
                    
                    # Ensure all required option keys exist
                    for key in ["a", "b", "c", "d"]:
                        if key not in q["options"]:
                            q["options"][key] = f"Option {key.upper()}"
                    
                    # Ensure answer is valid
                    if q["answer"] not in ["a", "b", "c", "d"]:
                        q["answer"] = "a"  # Default to first option
                    
                    # Ensure explanation exists
                    if "explanation" not in q:
                        q["explanation"] = "No explanation provided."
                    
                    # Add enhanced fields with defaults
                    if "difficulty_level" not in q:
                        q["difficulty_level"] = "intermediate"
                    if "concept_category" not in q:
                        q["concept_category"] = "general"
                    if "provenance" not in q:
                        q["provenance"] = []
                    
                    valid_questions.append(q)
            
            if valid_questions:
                return {"quiz": valid_questions}
        
        # Enhanced fallback quiz generation
        print("Using enhanced fallback quiz generation")
        parts = [p.strip() for p in merged.split("\n\n") if p.strip()][:num_questions]
        qlist = []
        
        for i, p in enumerate(parts):
            if p:
                sentences = p.split('. ')
                # Create more sophisticated questions
                if len(sentences) >= 3:
                    question = f"Based on the content, {sentences[0].lower()}. What can be concluded?"
                    correct_answer = sentences[1].strip()
                    options = {
                        "a": correct_answer,
                        "b": f"Alternative interpretation: {sentences[2][:50]}...",
                        "c": "This concept is not well-defined in current literature",
                        "d": "More research is needed to establish clear guidelines"
                    }
                    explanation = f"The correct answer is based on: {'. '.join(sentences[:2])}. This demonstrates the key principle discussed in the material."
                else:
                    question = f"What is the main concept discussed in the following context: '{p[:80]}...'?"
                    correct_answer = f"The primary focus is on {' '.join(p.split()[:5]) if p.split() else 'key concepts'}"
                    options = {
                        "a": correct_answer,
                        "b": "Secondary methodological considerations",
                        "c": "Historical background information", 
                        "d": "Future research directions"
                    }
                    explanation = f"Based on the content analysis, the main focus is clearly established through the key terms and concepts presented."
                
                qlist.append({
                    "question": question,
                    "options": options,
                    "answer": "a",
                    "explanation": explanation,
                    "difficulty_level": "intermediate",
                    "concept_category": f"topic_{i+1}",
                    "provenance": []
                })
        
        # Ensure we have at least one question
        if not qlist:
            qlist = [{
                "question": "What is this document about?",
                "options": ["Educational content", "Technical documentation", "Study material", "Other"],
                "answer": "Educational content",
                "explanation": "This appears to be educational content for learning purposes.",
                "provenance": []
            }]
        
        return {"quiz": qlist}
        
    except Exception as e:
        print(f"Error generating quiz: {e}")
        # Return minimal fallback
        return {
            "quiz": [{
                "question": "What would you like to learn about?",
                "options": ["This topic", "Related subjects", "More details", "All of the above"],
                "answer": "All of the above",
                "explanation": "Learning is always beneficial!",
                "provenance": []
            }]
        }
