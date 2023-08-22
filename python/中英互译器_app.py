from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)
API_KEY = "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"
openai.api_key = API_KEY
engine = "text-davinci-002"

def detect_language(text):
    if any(ord(char) > 127 for char in text):
        return "chinese"
    else:
        return "english"

def get_translation(text):
    language = detect_language(text)
    
    if language == "chinese":
        prompt_text = f"翻译这个句子成英语: '{text}'"
    else:
        prompt_text = f"Translate this sentence to Chinese: '{text}'"
    
    response = openai.Completion.create(
        engine=engine,
        prompt=prompt_text,
        max_tokens=60
    )
    
    return response.choices[0].text.strip()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    user_input = request.form.get('user_input')
    translation = get_translation(user_input)
    return jsonify({'translation': translation})

if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='0.0.0.0', port=8000)
    
