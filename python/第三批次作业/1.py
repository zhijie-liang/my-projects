# .txt转换.txt

import re
import os

def extract_info_from_text(text):
    pattern_case = re.compile(r"case '(.*?)':(.*?)break;", re.DOTALL)
    matches_case = pattern_case.findall(text)

    result = {}

    for tablename, case_block in matches_case:
        pattern_field = re.compile(r"records\[i\].value.(.*?) = detail\[(\d+)\]")
        matches_field = pattern_field.findall(case_block)
        field_mapping = {field: index for field, index in matches_field}
        result[tablename] = field_mapping

    return result

def format_output(data):
    output = ""
    for tablename, fields in data.items():
        output += f"'{tablename}':\n\n"
        for field, index in fields.items():
            output += f"{field}{index}\n"
        output += "\n"
    return output.strip()

def process_files_in_directory(directory):
    # 遍历指定文件夹中的所有.txt文件
    for filename in os.listdir(directory):
        if filename.endswith('.txt'):
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as file:
                text = file.read()
                data = extract_info_from_text(text)
                formatted_output = format_output(data)

                # 输出结果到一个新的文件
                with open(os.path.join(directory, f"processed_{filename}"), 'w', encoding='utf-8') as out_file:
                    out_file.write(formatted_output)

if __name__ == "__main__":
    directory = r"C:\Users\梁智杰\Desktop\核对校验\新建文件夹 (3)"  # 默认为当前目录，可以根据需要修改
    process_files_in_directory(directory)
