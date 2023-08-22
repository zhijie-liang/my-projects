import requests
import json

class Chatbot:
    def __init__(self, api_key):
        self.api_url = "https://api.openai.com/v1/engines/davinci/completions"
        self.api_key = api_key
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json',
            'User-Agent': 'OpenAI-Python-Chatbot'
        }

    def get_response(self, prompt_text):
        data = {
            'prompt': prompt_text,
            'max_tokens': 150,
            'temperature': 0.2  # 降低temperature以获得更稳定的输出
        }

        response = requests.post(self.api_url, headers=self.headers, data=json.dumps(data))
        
        if response.status_code == 200:
            text = response.json()['choices'][0]['text'].strip()
            return self.post_process(text)
        else:
            return f"Error: {response.status_code}, {response.text}"

    def post_process(self, text):
        # 这里你可以添加任何后处理逻辑，例如：
        if len(text.split()) > 20:  # 如果输出超过20个词，只取前20个词
            return ' '.join(text.split()[:20])
        return text

    def chat(self):
        print("Chatbot: 你好! 如果你想退出，请输入'退出'.")
        while True:
            user_input = input("你：")
            if user_input.lower() in ['退出', 'bye']:
                print("Chatbot: 再见！")
                break
            response = self.get_response(user_input)
            print(f"Chatbot: {response}")

if __name__ == '__main__':
    API_KEY = "YOUR_OPENAI_API_KEY"  # 将这里的API Key替换为你的API Key
    bot = Chatbot(API_KEY)
    bot.chat()
