# routes/voice_to_text.py
import speech_recognition as sr
from flask import Blueprint, jsonify, request

# Define Blueprint
voice_to_text_bp = Blueprint('voice_to_text', __name__)

# Supported language codes for Google Speech Recognition
LANGUAGE_CODES = {
    "en": "en-IN",  # English (India)
    "hi": "hi-IN",  # Hindi
    "kn": "kn-IN",  # Kannada
}

@voice_to_text_bp.route('/voice-to-text', methods=['POST'])
def voice_to_text():
    data = request.json
    lang = data.get('language', 'en')  # Default to English
    language_code = LANGUAGE_CODES.get(lang)

    if not language_code:
        return jsonify({'error': f"Unsupported language code: '{lang}'"}), 400

    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print(f"Listening for language: {language_code}")
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio, language=language_code)
        return jsonify({'text': text})
    except sr.UnknownValueError:
        return jsonify({'error': 'Could not understand audio'}), 400
    except sr.RequestError:
        return jsonify({'error': 'Speech service unavailable'}), 500
