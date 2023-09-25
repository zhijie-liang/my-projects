from googletrans import Translator, LANGUAGES

def translate_text(text, src, dest):
    translator = Translator()
    try:
        translation = translator.translate(text, src=src, dest=dest)
        return translation.text
    except Exception as e:
        print(f"Error: {e}")
        return None

def main():
    while True:
        print("选择操作：")
        print("1. 英文 -> 中文")
        print("2. 中文 -> 英文")
        print("3. 退出")
        choice = input("请输入你的选择 (1/2/3): ")

        if choice == "1":
            text = input("请输入要翻译的英文: ")
            print("翻译结果: ", translate_text(text, 'en', 'zh-cn'))
        elif choice == "2":
            text = input("请输入要翻译的中文: ")
            print("翻译结果: ", translate_text(text, 'zh-cn', 'en'))
        elif choice == "3":
            print("谢谢使用，再见!")
            break
        else:
            print("无效的选择，请重新选择!")

if __name__ == "__main__":
    main()
