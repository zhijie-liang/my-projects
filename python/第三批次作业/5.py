# 处理4.py

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


def extract_fields_from_rowkey(rowkey_code):
    # Extract all field names from the rowkey code
    fields = re.findall(r"records\[i\]\.value\['(.*?)'\]", rowkey_code)
    return '、'.join(fields)


def refine_extracted_code(content):
    # Extract all 'case' statements with their respective table names
    case_statements = re.findall(
        r"case '(.*?)':\n(.*?)break;", content, re.DOTALL)

    refined_codes = []
    for case_name, case_body in case_statements:
        # Extract the fields from the rowkey setting code
        rowkey_code = ''.join(
            [line for line in case_body.split("\n") if 'rowkey' in line]).strip()
        fields_list = extract_fields_from_rowkey(rowkey_code)

        refined_code = f"case '{case_name}':\n{fields_list}"
        refined_codes.append(refined_code)

    return "\n".join(refined_codes)


def save_refined_code_to_directory(input_directory, output_directory):
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    for filename in os.listdir(input_directory):
        if filename.endswith(".txt"):
            input_file_path = os.path.join(input_directory, filename)
            with open(input_file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            refined_code = refine_extracted_code(content)

            output_file_path = os.path.join(output_directory, filename)
            with open(output_file_path, 'w', encoding='utf-8') as file:
                file.write(refined_code)
            print(f"Processed {filename} and saved to {output_file_path}")


# You can call the function save_refined_code_to_directory with the path to your input directory and output directory
save_refined_code_to_directory(
    r"C:\Users\梁智杰\Desktop\核对校验\4", r"C:\Users\梁智杰\Desktop\核对校验\5")
