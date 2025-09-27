import os
import pdfplumber
import docx
from PIL import Image
import pytesseract
import fitz # PyMuPDF
# Using the top-level package import as requested, 
# and accessing sub-modules later via the 'mp.editor' path.
import moviepy as mp

def extract_text_from_pdf(path):
    text = []
    try:
        with pdfplumber.open(path) as pdf:
            for p in pdf.pages:
                t = p.extract_text() or ""
                text.append(t)
    except Exception:
        # fallback to PyMuPDF (fitz)
        doc = fitz.open(path)
        for pg in doc:
            text.append(pg.get_text())
    return "\n\n".join(text)

def extract_text_from_docx(path):
    doc = docx.Document(path)
    return "\n\n".join([p.text for p in doc.paragraphs])

def extract_text_from_image(path):
    img = Image.open(path)
    # Note: Ensure Tesseract is installed on the system for this to work
    return pytesseract.image_to_string(img)

def extract_text_from_video(path):
    """
    Extracts the audio track from a video file using moviepy, saves it as a WAV,
    and returns a placeholder for the ASR transcription.
    """
    # CRITICAL CHANGE: Accessing VideoFileClip via mp.editor, 
    # since we only imported 'moviepy as mp'.
    clip = mp.editor.VideoFileClip(path)
    audio_path = f"{path}.wav"
    
    # Writing the audio file
    # verbose and logger set to None to suppress console output during processing
    clip.audio.write_audiofile(audio_path, verbose=False, logger=None)
    
    # TODO: Implement ASR (e.g., call a Whisper or OpenAI API) 
    # to transcribe `audio_path`.
    # Placeholder:
    return "TRANSCRIBED_AUDIO_PLACEHOLDER"

def extract_text_from_file(path):
    """
    Universal file extractor. Returns (text, images_meta)
    images_meta is a simple list of image placeholders (we currently OCR images inline).
    """
    ext = os.path.splitext(path)[1].lower()
    images_meta = []
    
    if ext in [".pdf"]:
        text = extract_text_from_pdf(path)
        # Note: Image extraction logic is commented out for simplicity/performance
        return text, images_meta
        
    elif ext in [".docx", ".doc"]:
        text = extract_text_from_docx(path)
        return text, images_meta
        
    elif ext in [".png", ".jpg", ".jpeg", ".tiff", ".bmp"]:
        text = extract_text_from_image(path)
        images_meta.append({"path": path})
        return text, images_meta
        
    elif ext in [".mp4", ".mov", ".mkv", ".avi"]:
        text = extract_text_from_video(path)
        return text, images_meta
        
    else:
        # attempt a best-effort text extraction for other file types
        try:
            doc = fitz.open(path)
            pages = [pg.get_text() for pg in doc]
            return "\n\n".join(pages), images_meta
        except Exception as e:
            # Raise exception if file type is truly unsupported
            raise e
