from flask import Flask, jsonify, request
from googletrans import Translator
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
translator = Translator()

@app.route('/translate',methods=['POST'])
async def translate_text():
    data = request.get_json()
    input_text = data.get('text', '')

    if not input_text:
        return jsonify({'error': 'No text provided'}), 400

    translated = await translator.translate(input_text, dest='en')
    return jsonify({'translated_text': translated.text})

if __name__ == '__main__':
    app.run(debug=True)        