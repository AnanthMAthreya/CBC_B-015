# routes/text_to_speech.py

from flask import Blueprint, request, send_file, jsonify
from gtts import gTTS
import os

# Define the blueprint
tts_bp = Blueprint('text_to_speech', __name__)

# Supported languages for gTTS
SUPPORTED_LANGUAGES = {
    'hi': 'Hindi',
    'en': 'English',
    'kn': 'Kannada'
}

@tts_bp.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    data = request.json
    text = data.get('text')
    lang = data.get('lang', 'hi')  # Default to Hindi if not provided

    if not text:
        return jsonify({"error": "Text is required"}), 400

    if lang not in SUPPORTED_LANGUAGES:
        return jsonify({
            "error": f"Language '{lang}' not supported. Supported languages are: {', '.join(SUPPORTED_LANGUAGES.keys())}."
        }), 400

    try:
        tts = gTTS(text=text, lang=lang)
        filename = "output.mp3"
        tts.save(filename)

        return send_file(filename, mimetype="audio/mpeg", as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
