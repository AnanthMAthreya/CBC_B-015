from flask import Flask, jsonify, request, send_file
from routes.voice_to_text import voice_to_text_bp
from routes.translator import translate_bp
from routes.llm_schemes import llm_schemes_bp
from routes.llm_services import llm_services_bp
from routes.text_to_speech import tts_bp
from routes.retrieve_services import retrieve_services_bp
from routes.retrieve_schemes import retrieve_schemes_bp
import requests
import tempfile
import os
from flask_cors import CORS  # Import CORS

app = Flask(__name__, static_folder='frontend/build', static_url_path='')

# Enable CORS for the entire app
CORS(app)

# Register Blueprints for various routes
app.register_blueprint(voice_to_text_bp, url_prefix='/stt')
app.register_blueprint(translate_bp, url_prefix='/translate')
app.register_blueprint(llm_schemes_bp, url_prefix='/llm/schemes')
app.register_blueprint(llm_services_bp, url_prefix='/llm/services')
app.register_blueprint(tts_bp, url_prefix='/tts')
app.register_blueprint(retrieve_services_bp, url_prefix='/retrieve-services')
app.register_blueprint(retrieve_schemes_bp, url_prefix='/retrieve-schemes')

# Route to handle API requests for processing voice and text input
@app.route('/process', methods=['POST'])
def process():
    # Get category and language from the form
    category = request.form.get('category')
    language_code = request.form.get('language_code', 'hi')  # Default to Hindi (hi)

    # Text path
    if 'text' in request.files:
        text_file = request.files['text']
        user_text = text_file.read().decode('utf-8')
    else:
        # Audio path
        audio_file = request.files.get('audio')
        if not audio_file:
            return jsonify({'error': 'No input provided'}), 400

        # Step 1: Speech-to-Text (Language dynamically selected)
        stt_response = requests.post(
            'http://localhost:5000/stt/voice-to-text',
            files={'file': audio_file},
            data={'language': language_code}  # Use selected language
        )
        if stt_response.status_code != 200:
            return jsonify({'error': 'STT failed'}), 400
        user_text = stt_response.json().get('text')

    # Step 2: Translate to English
    translation_response = requests.post(
        'http://localhost:5000/translate/translate',
        json={'text': user_text, 'direction': f'{language_code}-en'}  # Dynamic translation direction
    )
    if translation_response.status_code != 200:
        return jsonify({'error': 'Translation failed'}), 400
    translated_en = translation_response.json().get('translated_text')

    # Step 3: Query LLM
    if category == 'schemes':
        llm_response = requests.post('http://localhost:5000/llm/schemes/ask-scheme', json={'question': translated_en})
    elif category == 'services':
        llm_response = requests.post('http://localhost:5000/llm/services/ask-service', json={'question': translated_en})
    else:
        return jsonify({'error': 'Invalid category'}), 400

    if llm_response.status_code != 200:
        return jsonify({'error': 'LLM failed'}), 400
    answer_en = llm_response.json().get('answer')

    # Step 4: Translate to the original language (Back translation)
    back_translation = requests.post(
        'http://localhost:5000/translate/translate',
        json={'text': answer_en, 'direction': 'en-' + language_code}  # Back translation
    )
    if back_translation.status_code != 200:
        return jsonify({'error': 'Back translation failed'}), 400
    answer_lang = back_translation.json().get('translated_text')  # Return translated answer

    # Step 5: Text-to-Speech (Dynamic language)
    tts_response = requests.post(
        'http://localhost:5000/tts/text-to-speech',
        json={'text': answer_lang, 'lang': language_code}  # Use dynamic language for TTS
    )
    if tts_response.status_code != 200:
        return jsonify({'error': 'TTS failed'}), 400

    # Save TTS result to temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_audio:
        temp_audio.write(tts_response.content)
        temp_audio_path = temp_audio.name

    # Return audio file as response
    return send_file(temp_audio_path, mimetype='audio/mpeg', as_attachment=False)
   

# Serve React App in Production
@app.route('/')
def serve_react_app():
    return send_file(os.path.join(app.static_folder, 'index.html'))

# Fallback route for React Router
@app.route('/<path:path>')
def serve_react_static(path):
    return send_file(os.path.join(app.static_folder, 'static', path))

if __name__ == '__main__':
    app.run(debug=True)
