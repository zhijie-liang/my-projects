# 保留其中设置 rowkey 的代码。

import os
import re


def extract_all_rowkey_code_with_case_from_content(content):
    # Use regular expressions to find all 'case' statements
    case_statements = re.findall(
        r"case '(.*?)':(.*?)break;", content, re.DOTALL)

    extracted_codes = []
    for case_name, case_body in case_statements:
        # Find the lines that contain 'rowkey' in each 'case' statement
        lines = case_body.split("\n")
        rowkey_code = ''.join(
            [line for line in lines if 'rowkey' in line]).strip()
        if rowkey_code:
            extracted_code = f"        case '{case_name}':\n            // 设置 rowkey\n            {rowkey_code}\n        break;"
            extracted_codes.append(extracted_code)

    return "\n".join(extracted_codes)


def save_extracted_code_to_directory(input_directory, output_directory):
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    for filename in os.listdir(input_directory):
        if filename.endswith(".txt"):
            input_file_path = os.path.join(input_directory, filename)
            with open(input_file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            extracted_code = extract_all_rowkey_code_with_case_from_content(
                content)

            output_file_path = os.path.join(output_directory, filename)
            with open(output_file_path, 'w', encoding='utf-8') as file:
                file.write(extracted_code)
            print(f"Processed {filename} and saved to {output_file_path}")


# You can call the function save_extracted_code_to_directory with the path to your input directory and output directory
save_extracted_code_to_directory(
    r"C:\Users\梁智杰\Desktop\核对校验", r"C:\Users\梁智杰\Desktop\核对校验\新建文件夹 (3)")
