# services/llm_utils.py
import os, re, json
import google.generativeai as genai
from config import GEMINI_MODEL, GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

def call_chat(prompt: str, system: str = None, temperature: float = 0.0, max_tokens: int = 800):
    try:
        model = genai.GenerativeModel(GEMINI_MODEL)
        
        # Combine system and user prompts for Gemini
        full_prompt = prompt
        if system:
            full_prompt = f"{system}\n\n{prompt}"
        
        # Configure safety settings to be more permissive for educational content
        safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_ONLY_HIGH"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_ONLY_HIGH"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_ONLY_HIGH"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_ONLY_HIGH"
            }
        ]
        
        generation_config = genai.types.GenerationConfig(
            temperature=temperature,
            max_output_tokens=max_tokens,
        )
        
        response = model.generate_content(
            full_prompt, 
            generation_config=generation_config,
            safety_settings=safety_settings
        )
        
        # Handle different response scenarios
        if not response.candidates:
            print("Warning: No candidates returned from Gemini API")
            return "Sorry, I couldn't generate a response. Please try rephrasing your request."
        
        candidate = response.candidates[0]
        
        # Check finish reason
        if candidate.finish_reason == 1:  # STOP - normal completion
            if candidate.content and candidate.content.parts:
                return candidate.content.parts[0].text
            else:
                return "Response generated but no content available."
        
        elif candidate.finish_reason == 2:  # MAX_TOKENS
            if candidate.content and candidate.content.parts:
                return candidate.content.parts[0].text + " [Response truncated due to length]"
            else:
                return "Response was too long and was truncated."
        
        elif candidate.finish_reason == 3:  # SAFETY
            return "I cannot generate content for this request due to safety guidelines. Please try rephrasing your request."
        
        elif candidate.finish_reason == 4:  # RECITATION
            return "I cannot generate this content due to potential copyright issues. Please try a different request."
        
        else:
            return f"Generation stopped for unknown reason (code: {candidate.finish_reason}). Please try again."
            
    except Exception as e:
        print(f"Error calling Gemini API: {str(e)}")
        return f"Error generating response: {str(e)}"

def extract_json(text: str):
    # find first {...} or [ ... ] block
    text = text.strip()
    # remove code fences
    text = re.sub(r"```(?:json)?\n", "", text)
    m = re.search(r"(\{[\s\S]*\}|\[[\s\S]*\])", text)
    candidate = m.group(1) if m else text
    try:
        return json.loads(candidate)
    except Exception:
        try:
            # try single-quote to double
            return json.loads(candidate.replace("'", '"'))
        except Exception:
            return None
