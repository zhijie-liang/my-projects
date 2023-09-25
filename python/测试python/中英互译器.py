import openai

class TranslatorBot:
    def __init__(self, api_key):
        openai.api_key = api_key
        self.engine = "text-davinci-002"
        
    def detect_language(self, text):
        # 简单地检测语言，这只是一个基本的方法，可能需要更复杂的方法来确保准确性
        if any(ord(char) > 127 for char in text):
            return "chinese"
        else:
            return "english"
    
    def get_translation(self, text):
        language = self.detect_language(text)
        
        if language == "chinese":
            prompt_text = f"翻译这个句子成英语: '{text}'"
        else:
            prompt_text = f"Translate this sentence to Chinese: '{text}'"
            
        response = openai.Completion.create(
            engine=self.engine,
            prompt=prompt_text,
            max_tokens=60
        )
        
        return response.choices[0].text.strip()

    def chat(self):
        print("TranslatorBot: 你好! 如果你想退出，请输入'退出'.")
        while True:
            user_input = input("你：")
            if user_input.lower() in ['退出', 'bye']:
                print("TranslatorBot: 再见！")
                break
            translation = self.get_translation(user_input)
            print(f"TranslatorBot: {translation}")

if __name__ == '__main__':
    API_KEY = "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"  # 将这里的API Key替换为你的API Key
    bot = TranslatorBot(API_KEY)
    bot.chat()
