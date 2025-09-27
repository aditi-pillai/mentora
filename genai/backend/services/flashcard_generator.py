# services/flashcard_generator.py
from services.context_builder import build_full_context
from services.llm_utils import call_chat, extract_json

def generate_flashcards(user_id: str, space_id: str, chat_recent: str = "", num_cards: int = 10, context_type: str = "space"):
    ctx = build_full_context(user_id=user_id, space_id=space_id, chat_recent=chat_recent, mode="flashcards", context_type=context_type)
    merged = ctx["merged_text"]
    prompt = f"""
Create {num_cards} comprehensive educational flashcards that facilitate deep learning and retention.

Content Requirements:
- Cover key concepts, definitions, processes, and applications from the provided context
- Include both fundamental concepts and advanced details
- Create cards that test different types of knowledge: definitions, explanations, applications, comparisons
- Ensure cards build upon each other and create a comprehensive learning experience
- Include practical examples and real-world applications where relevant

Flashcard Quality Standards:
- Front side: Clear, specific questions or prompts that test understanding
- Back side: Comprehensive, detailed answers with context and examples
- Include key terminology with complete definitions
- Provide step-by-step explanations for processes or procedures
- Add practical applications and real-world relevance
- Include memory aids, mnemonics, or conceptual connections where helpful

Card Types to Include:
- Definition cards: "What is [concept]?" → Comprehensive definition with context
- Process cards: "How does [process] work?" → Step-by-step explanation with examples
- Application cards: "When would you use [concept]?" → Practical scenarios and use cases
- Comparison cards: "How does [A] differ from [B]?" → Detailed comparison with examples
- Example cards: "Give an example of [concept]" → Specific, detailed examples with explanation

Return JSON with exactly this structure:
{{
  "flashcards": [
    {{
      "front": "Clear, specific question or prompt that tests important knowledge (10-25 words)",
      "back": "Comprehensive answer with definition, explanation, context, and examples (50-150 words)",
      "card_type": "definition|process|application|comparison|example",
      "difficulty_level": "beginner|intermediate|advanced",
      "key_concepts": ["concept1", "concept2"],
      "memory_aids": "Helpful mnemonics, analogies, or conceptual connections",
      "provenance": ["source information"]
    }}
  ]
}}

Ensure cards provide substantial educational value and support effective learning and retention.

CONTEXT:
{merged}
"""
    try:
        reply = call_chat(prompt, temperature=0.2, max_tokens=1000)
        data = extract_json(reply)
        
        # Validate flashcard structure
        if data and isinstance(data, dict) and "flashcards" in data and isinstance(data["flashcards"], list):
            valid_cards = []
            for card in data["flashcards"]:
                if isinstance(card, dict) and "front" in card and "back" in card:
                    # Ensure front and back are strings
                    card["front"] = str(card["front"])
                    card["back"] = str(card["back"])
                    
                    # Add enhanced fields with defaults
                    if "card_type" not in card:
                        card["card_type"] = "definition"
                    if "difficulty_level" not in card:
                        card["difficulty_level"] = "intermediate"
                    if "key_concepts" not in card or not isinstance(card["key_concepts"], list):
                        card["key_concepts"] = []
                    if "memory_aids" not in card:
                        card["memory_aids"] = ""
                    if "provenance" not in card:
                        card["provenance"] = []
                    
                    valid_cards.append(card)
            
            if valid_cards:
                return {"flashcards": valid_cards}
        
        # Enhanced fallback flashcard generation
        print("Using enhanced fallback flashcard generation")
        parts = [p.strip() for p in merged.split("\n\n") if p.strip()][:num_cards]
        cards = []
        
        for i, p in enumerate(parts):
            if p:
                sentences = p.split('. ')
                
                # Create different types of cards based on content
                if len(sentences) >= 3:
                    # Definition card
                    front = f"Define and explain: {sentences[0].split()[:5]}"
                    back = f"Definition: {sentences[0]}. \n\nExplanation: {sentences[1]}. \n\nContext: {sentences[2] if len(sentences) > 2 else 'This concept is fundamental to understanding the broader topic.'}"
                    card_type = "definition"
                elif len(sentences) >= 2:
                    # Process or concept card
                    front = f"Explain the concept: {sentences[0][:60]}..?"
                    back = f"Concept: {sentences[0]}. \n\nDetails: {sentences[1]}. \n\nApplication: This knowledge helps in understanding related concepts and practical applications."
                    card_type = "process"
                else:
                    # General knowledge card
                    words = p.split()
                    if len(words) > 10:
                        front = f"What are the key points about: {' '.join(words[:5])}?"
                        back = f"Key Information: {p[:200]}{'...' if len(p) > 200 else ''}\n\nSignificance: This information provides essential background for understanding the topic comprehensively."
                    else:
                        front = f"Explain: {p[:30]}?"
                        back = f"Explanation: {p}\n\nNote: This represents a key concept in the subject matter."
                    card_type = "application"
                
                # Extract key concepts from the content
                key_concepts = []
                words = p.lower().split()
                important_words = [w for w in words if len(w) > 5 and w not in ['the', 'and', 'that', 'this', 'with', 'from', 'they', 'have', 'been', 'were', 'said', 'each', 'which', 'there', 'what', 'would', 'could', 'should']]
                key_concepts = important_words[:3]  # Top 3 key concepts
                
                cards.append({
                    "front": front,
                    "back": back,
                    "card_type": card_type,
                    "difficulty_level": "intermediate",
                    "key_concepts": key_concepts,
                    "memory_aids": f"Remember: Focus on the main idea and its practical applications.",
                    "provenance": []
                })
        
        # Ensure we have at least one card
        if not cards:
            cards = [{
                "front": "What is this content about?",
                "back": "This appears to be educational material for learning and study purposes.",
                "provenance": []
            }]
        
        return {"flashcards": cards}
        
    except Exception as e:
        print(f"Error generating flashcards: {e}")
        # Return minimal fallback
        return {
            "flashcards": [{
                "front": "What can you learn from this?",
                "back": "Every piece of content has something valuable to teach us!",
                "provenance": []
            }]
        }
