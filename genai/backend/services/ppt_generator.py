# services/ppt_generator.py
import os, uuid, requests
from io import BytesIO
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from services.context_builder import build_full_context
from services.llm_utils import call_chat, extract_json
from config import PPT_DIR

def _add_title_slide(prs, title, subtitle):
    """Create an enhanced title slide with professional styling"""
    slide = prs.slides.add_slide(prs.slide_layouts[0])
    
    # Add title with styling
    if slide.shapes.title:
        slide.shapes.title.text = title
        title_frame = slide.shapes.title.text_frame
        title_para = title_frame.paragraphs[0]
        title_para.font.size = Pt(44)
        title_para.font.bold = True
        title_para.font.color.rgb = RGBColor(44, 62, 80)  # Dark blue
        title_para.alignment = PP_ALIGN.CENTER
    
    # Try to find subtitle placeholder
    subtitle_added = False
    for placeholder in slide.placeholders:
        try:
            if placeholder.placeholder_format.idx == 1:  # Subtitle placeholder
                placeholder.text = subtitle
                sub_frame = placeholder.text_frame
                sub_para = sub_frame.paragraphs[0]
                sub_para.font.size = Pt(24)
                sub_para.font.color.rgb = RGBColor(127, 140, 141)  # Gray
                sub_para.alignment = PP_ALIGN.CENTER
                subtitle_added = True
                break
        except Exception:
            continue
    
    # If no subtitle placeholder found, create styled text box
    if not subtitle_added and subtitle:
        try:
            left = Inches(1)
            top = Inches(2.5)
            width = Inches(8.5)
            height = Inches(1.5)
            textbox = slide.shapes.add_textbox(left, top, width, height)
            textbox.text = subtitle
            sub_frame = textbox.text_frame
            sub_para = sub_frame.paragraphs[0]
            sub_para.font.size = Pt(24)
            sub_para.font.color.rgb = RGBColor(127, 140, 141)
            sub_para.alignment = PP_ALIGN.CENTER
        except Exception:
            pass
    
    # Add decorative element
    try:
        # Add a subtle line under title
        line = slide.shapes.add_connector(
            1, Inches(2), Inches(2.2), Inches(8.5), Inches(2.2)
        )
        line.line.color.rgb = RGBColor(52, 152, 219)  # Blue accent
        line.line.width = Pt(3)
    except Exception:
        pass

def _add_content_slide(prs, heading, bullets, image_bytes=None):
    """Create enhanced content slide with professional layout and styling"""
    # Use blank slide for maximum control
    slide = prs.slides.add_slide(prs.slide_layouts[6])  # Blank layout
    
    # Determine layout based on content and image
    has_image = image_bytes is not None
    
    # Add styled title
    title_left = Inches(0.5)
    title_top = Inches(0.3)
    title_width = Inches(9)
    title_height = Inches(1)
    
    title_box = slide.shapes.add_textbox(title_left, title_top, title_width, title_height)
    title_frame = title_box.text_frame
    title_para = title_frame.paragraphs[0]
    title_para.text = heading
    title_para.font.size = Pt(32)
    title_para.font.bold = True
    title_para.font.color.rgb = RGBColor(44, 62, 80)  # Dark blue
    title_para.alignment = PP_ALIGN.LEFT
    
    # Add accent line under title
    try:
        line = slide.shapes.add_connector(
            1, Inches(0.5), Inches(1.4), Inches(9.5), Inches(1.4)
        )
        line.line.color.rgb = RGBColor(52, 152, 219)  # Blue accent
        line.line.width = Pt(2)
    except Exception:
        pass
    
    # Layout content based on whether we have an image
    if has_image:
        # Two-column layout: content on left, image on right
        content_left = Inches(0.5)
        content_top = Inches(1.8)
        content_width = Inches(5.5)
        content_height = Inches(4.5)
        
        image_left = Inches(6.5)
        image_top = Inches(1.8)
        image_width = Inches(3.5)
        image_height = Inches(2.6)
    else:
        # Full-width content
        content_left = Inches(0.5)
        content_top = Inches(1.8)
        content_width = Inches(9)
        content_height = Inches(4.5)
    
    # Add content box with styling
    content_box = slide.shapes.add_textbox(content_left, content_top, content_width, content_height)
    tf = content_box.text_frame
    tf.word_wrap = True
    tf.auto_size = None
    
    # Add bullet points with enhanced styling
    if bullets:
        for i, bullet in enumerate(bullets):
            if not bullet or not str(bullet).strip():
                continue
                
            if i == 0:
                para = tf.paragraphs[0]
            else:
                para = tf.add_paragraph()
            
            para.text = str(bullet).strip()
            para.level = 0
            para.font.size = Pt(18)
            para.font.color.rgb = RGBColor(52, 73, 94)  # Dark gray
            para.space_after = Pt(12)
            para.font.name = 'Calibri'
    
    # Add image with professional styling
    if has_image and image_bytes:
        try:
            img = BytesIO(image_bytes)
            pic = slide.shapes.add_picture(img, image_left, image_top, width=image_width, height=image_height)
            
            # Add subtle border to image
            pic.line.color.rgb = RGBColor(189, 195, 199)
            pic.line.width = Pt(1)
        except Exception as e:
            print(f"Error adding image: {e}")
    
    # Add slide number
    try:
        slide_num_box = slide.shapes.add_textbox(Inches(9), Inches(6.8), Inches(0.8), Inches(0.3))
        slide_num_frame = slide_num_box.text_frame
        slide_num_para = slide_num_frame.paragraphs[0]
        slide_num_para.text = str(len(prs.slides))
        slide_num_para.font.size = Pt(12)
        slide_num_para.font.color.rgb = RGBColor(149, 165, 166)
        slide_num_para.alignment = PP_ALIGN.RIGHT
    except Exception:
        pass

def fetch_image(keyword: str, size="1200x800"):
    """Fetch high-quality images from multiple sources"""
    # Enhanced keyword mapping for better images
    keyword_mapping = {
        'machine learning': 'artificial-intelligence-technology',
        'ai': 'artificial-intelligence',
        'data science': 'data-analytics-dashboard',
        'python': 'programming-code',
        'algorithm': 'computer-algorithm-flowchart',
        'neural network': 'neural-network-brain',
        'deep learning': 'deep-learning-ai',
        'statistics': 'statistics-charts-graphs',
        'programming': 'computer-programming',
        'technology': 'modern-technology',
        'education': 'online-learning-education',
        'learning': 'student-learning-books',
        'business': 'business-meeting-presentation',
        'finance': 'financial-charts-analysis',
        'marketing': 'digital-marketing-strategy',
        'science': 'laboratory-research-science'
    }
    
    # Use enhanced keyword if available
    enhanced_keyword = keyword_mapping.get(keyword.lower(), keyword)
    
    # Try multiple image sources
    sources = [
        f"https://source.unsplash.com/{size}/?{requests.utils.quote(enhanced_keyword)}",
        f"https://source.unsplash.com/{size}/?{requests.utils.quote(keyword)}",
        f"https://picsum.photos/{size}/?random={hash(keyword) % 1000}"
    ]
    
    for url in sources:
        try:
            r = requests.get(url, timeout=8)
            if r.status_code == 200 and len(r.content) > 1000:  # Ensure we got actual image data
                return r.content
        except Exception:
            continue
    
    return None

def generate_ppt(user_id: str, space_id: str, chat_recent: str = "", filename: str = None, max_slides: int = 8, context_type: str = "space"):
    ctx = build_full_context(user_id=user_id, space_id=space_id, chat_recent=chat_recent, mode="ppt", context_type=context_type)
    merged = ctx["merged_text"]
    prompt = f"""
You are an expert presentation designer creating a comprehensive, professional presentation. 
Using the CONTEXT below, create a detailed presentation outline with {max_slides} content slides.

Requirements:
1. Create engaging, descriptive slide titles that capture key concepts
2. Each slide should have 4-6 detailed, informative bullet points
3. Include relevant, specific image keywords for professional visuals
4. Structure content logically with clear flow and progression
5. Make content educational, comprehensive, and practical
6. Include specific examples, statistics, key facts, or real-world applications
7. Ensure bullet points are substantive (not just single words)

Return ONLY this JSON format:
{{
  "title": "Professional, descriptive presentation title",
  "subtitle": "Comprehensive subtitle explaining the presentation scope",
  "slides": [
    {{
      "heading": "Detailed slide title explaining the specific topic or concept",
      "bullets": [
        "Comprehensive bullet point with specific details, examples, or explanations (15+ words)",
        "Another detailed point covering key aspects, benefits, or applications with context",
        "Third point explaining important concepts, methodologies, or practical implications",
        "Fourth point with real-world examples, case studies, or statistical information",
        "Fifth point covering best practices, common pitfalls, or advanced considerations"
      ],
      "image_keyword": "specific-relevant-professional-keyword"
    }}
  ]
}}

CONTEXT:
{merged}
"""
    reply = call_chat(prompt, temperature=0.2, max_tokens=1400)
    outline = extract_json(reply)
    
    # Validate and fix outline structure
    if not outline or not isinstance(outline, dict):
        outline = {}
    
    if "title" not in outline or not outline["title"]:
        outline["title"] = "Study Guide"
    
    if "slides" not in outline or not isinstance(outline["slides"], list):
        # Enhanced fallback outline generation
        parts = [p.strip() for p in merged.split("\n\n") if p.strip()][:max_slides]
        outline["slides"] = []
        
        for i, part in enumerate(parts):
            if part:
                # Create more meaningful titles and content
                sentences = part.split('. ')
                heading = sentences[0][:60] + ("..." if len(sentences[0]) > 60 else "")
                
                # Create bullet points from the content
                bullets = []
                if len(sentences) > 1:
                    for sentence in sentences[1:6]:  # Up to 5 bullets
                        if sentence.strip():
                            bullets.append(sentence.strip())
                else:
                    # Split long paragraph into bullet points
                    words = part.split()
                    chunk_size = 15
                    for j in range(0, min(len(words), 75), chunk_size):  # Max 5 bullets
                        chunk = ' '.join(words[j:j+chunk_size])
                        if chunk:
                            bullets.append(chunk)
                
                # If no bullets, use the whole content
                if not bullets:
                    bullets = [part[:200]]
                
                outline["slides"].append({
                    "heading": heading,
                    "bullets": bullets[:5],  # Max 5 bullets per slide
                    "image_keyword": "education"
                })
    
        # Ensure each slide has proper comprehensive structure
        for slide in outline["slides"]:
            if not isinstance(slide, dict):
                slide = {"heading": "Content", "main_points": [], "image_keyword": "education"}
            if "heading" not in slide:
                slide["heading"] = "Content Overview"
            
            # Handle main_points (primary content)
            if "main_points" not in slide or not isinstance(slide["main_points"], list):
                slide["main_points"] = ["Content not available"]
            
            # Handle sub_points (supporting details)
            if "sub_points" not in slide or not isinstance(slide["sub_points"], list):
                slide["sub_points"] = []
            
            # Handle key_definitions (terminology)
            if "key_definitions" not in slide or not isinstance(slide["key_definitions"], list):
                slide["key_definitions"] = []
            
            # Handle examples (practical applications)
            if "examples" not in slide or not isinstance(slide["examples"], list):
                slide["examples"] = []
            
            # Handle technical_details (advanced information)
            if "technical_details" not in slide or not isinstance(slide["technical_details"], list):
                slide["technical_details"] = []
            
            if "image_keyword" not in slide:
                slide["image_keyword"] = "education"
            
            # Ensure backward compatibility with simple bullets format
            if "bullets" not in slide or not isinstance(slide["bullets"], list):
                slide["bullets"] = ["Content not available"]
            
            if "image_keyword" not in slide:
                slide["image_keyword"] = "education"
    
    try:
        prs = Presentation()
        prs.slide_width = Inches(13.33)
        prs.slide_height = Inches(7.5)
        
        # Add title slide
        title = outline.get("title", "Comprehensive Study Guide")
        subtitle = outline.get("subtitle", "Generated by Mentora AI - Your Intelligent Learning Assistant")
        _add_title_slide(prs, title, subtitle)

        slide_meta = []
        for s in outline.get("slides", [])[:max_slides]:
            try:
                img_bytes = None
                kw = s.get("image_keyword","education")
                img_bytes = fetch_image(kw)
                _add_content_slide(prs, s.get("heading",""), s.get("bullets",[]), image_bytes=img_bytes)
                slide_meta.append({"heading": s.get("heading"), "image_keyword": kw})
            except Exception as e:
                print(f"Error adding slide: {e}")
                # Continue with next slide
                continue

        os.makedirs(PPT_DIR, exist_ok=True)
        filename = filename or f"mentora_{uuid.uuid4().hex[:8]}.pptx"
        path = os.path.join(PPT_DIR, filename)
        prs.save(path)
        return {"ppt_path": path, "outline": outline, "provenance": ctx["provenance"]}
    
    except Exception as e:
        print(f"Error generating PPT: {e}")
        # Return a minimal response with error info
        return {
            "ppt_path": None,
            "outline": outline,
            "provenance": ctx["provenance"],
            "error": str(e)
        }
