import openai

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

    def chat(self):
        print("聊天机器人: 你好! 如果你想退出，请输入'退出'.")
        while True:
            user_input = input("用户：")
            if user_input.lower() in ['退出', 'bye']:
                print("聊天机器人: 再见！")
                break
            bot_response = self.get_response(user_input)
            print(f"聊天机器人: {bot_response}")

if __name__ == '__main__':
    API_KEY = "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"  # 将这里的API Key替换为你的API Key
    bot = IntelligentChatbot(API_KEY)
    bot.chat()
