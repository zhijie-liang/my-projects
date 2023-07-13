import openai

openai.api_key = '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'

response = openai.Completion.create(
  engine="text-davinci-002",
  prompt="翻译这个句子成英语: '你好，世界'",
  max_tokens=60
)

print(response.choices[0].text.strip())
