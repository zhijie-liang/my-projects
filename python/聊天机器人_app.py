from flask import Flask, render_template, request
import openai

app = Flask(__name__)

class IntelligentChatbot:
    def __init__(self, api_key):
        openai.api_key = api_key
        self.engine = "text-davinci-002"
        
    def get_response(self, user_input):
        # 为了使机器人更具智能化，我们使用对话式的提示
        prompt_text = f"以下是一个对话：\n用户: {user_input}\n聊天机器人:"
        
        response = openai.Completion.create(
            engine=self.engine,
            prompt=prompt_text,
            max_tokens=150
        )
        
        return response.choices[0].text.strip()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['user_input']
    bot_response = bot.get_response_web(user_input)
    return render_template('index.html', user_input=user_input, bot_response=bot_response)

if __name__ == '__main__':
    API_KEY = "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"  # 将这里的API Key替换为你的API Key
    bot = IntelligentChatbot(API_KEY)
    
    app.run()