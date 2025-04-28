from flask import Flask, jsonify, request
from googletrans import Translator
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
translator = Translator()

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    input_text = data.get('text', '')

    if not input_text:
        return jsonify({'error': 'No text provided'}), 400

    translated = translator.translate(input_text, dest='en')
    return jsonify({'translated_text': translated.text})

if __name__ == '__main__':
    port = 5000
    app.run(host="0.0.0.0", port=port, debug=True)