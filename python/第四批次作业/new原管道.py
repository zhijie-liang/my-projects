import re

# Reading the '补充字段.txt' content
supplement_fields_path = r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\104\补充字段.txt'
with open(supplement_fields_path, 'r', encoding='utf-8') as file:
    supplement_fields = file.read().splitlines()

# Reading the original '原管道.js' content
yuan_guandao_js_path = r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\104\原管道.js'
with open(yuan_guandao_js_path, 'r', encoding='utf-8') as file:
    yuan_guandao_js_content = file.read()

# Removing lines that contain any of the fields from '补充字段.txt'
for field in supplement_fields:
    yuan_guandao_js_content = re.sub(
        r'.*?' + re.escape(field) + r'.*?\n', '', yuan_guandao_js_content, flags=re.MULTILINE)

# Saving the modified content to a new file named 'new原管道.js'
new_yuan_guandao_js_path = r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\104\new原管道.js'
with open(new_yuan_guandao_js_path, 'w', encoding='utf-8') as file:
    file.write(yuan_guandao_js_content)
