
import re


def process_files(sql_file_path, txt_file_path, js_file_path):
    # Read the SQL file
    with open(sql_file_path, 'r', encoding='utf-8') as file:
        sql_content = file.read()

    # Extract field names from the SQL content
    field_pattern = re.compile(r'\b(\w+)\s+\w+')
    fields_from_sql = field_pattern.findall(sql_content)
    cleaned_fields_from_sql = [
        field for field in fields_from_sql if field.isupper() and field != "NOT"]

    # Read the text file and get fields to be removed
    with open(txt_file_path, 'r', encoding='utf-8') as file:
        txt_content = file.read()
    fields_to_remove = [field.strip()
                        for field in txt_content.split('\n') if field.strip()]

    # Remove the fields listed in the text file from the list of fields extracted from the SQL file
    final_fields = [
        field for field in cleaned_fields_from_sql if field not in fields_to_remove]

    # Generating the JavaScript content
    assignment_lines = "\n".join(
        [f"obj.{field} = records[i].value['{field}'];" for field in final_fields if field != "CREATE"])
    js_content = f"""
var obj = {{}};
{assignment_lines}
records[i].value.root = obj;
"""

    # Writing the JavaScript content to the specified file
    with open(js_file_path, 'w', encoding='utf-8') as file:
        file.write(js_content)


# Example usage
process_files(r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\129\原本\业务表.sql',
              r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\129\原本\补充字段.txt', r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\129\对比\业务表.js')
