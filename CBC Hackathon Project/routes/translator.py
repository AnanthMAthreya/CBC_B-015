from flask import Blueprint, request, jsonify
from deep_translator import GoogleTranslator  # Import the GoogleTranslator class from deep-translator

# Define blueprint
translate_bp = Blueprint('translator', __name__)

# Map your direction keys to Google Translate language codes
LANG_CODE_MAP = {
    "en-hi": ("en", "hi"),
    "hi-en": ("hi", "en"),
    "en-kn": ("en", "kn"),
    "kn-en": ("kn", "en")
}

@translate_bp.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get('text')
    direction = data.get('direction')

    # Check if both text and direction are provided
    if not text or not direction:
        return jsonify({"error": "Both 'text' and 'direction' are required"}), 400

    # Check if the direction is valid
    lang_pair = LANG_CODE_MAP.get(direction)
    if not lang_pair:
        return jsonify({"error": f"Unsupported direction '{direction}'"}), 400

    # Extract source and destination languages
    src, dest = lang_pair
    try:
        # Use deep-translator's GoogleTranslator for translation
        translated_text = GoogleTranslator(source=src, target=dest).translate(text)
        return jsonify({"translated_text": translated_text})
    except Exception as e:
        # Handle exception and return error message
        return jsonify({"error": "Translation failed", "details": str(e)}), 500
