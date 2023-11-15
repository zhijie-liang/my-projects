import re


def extract_sql_fields(sql_file_path):
    with open(sql_file_path, 'r', encoding='utf-8') as file:
        sql_content = file.read()
        fields = re.findall(r'\b(\w+)\s+\w+', sql_content)
        return fields


def adjust_js_obj_fields(js_file_path, fields):
    with open(js_file_path, 'r', encoding='utf-8') as file:
        js_content = file.readlines()

    obj_start, obj_end = None, None
    for idx, line in enumerate(js_content):
        if 'var obj = {};' in line:
            obj_start = idx
        elif 'records[i].value.root = obj;' in line:
            obj_end = idx
            break

    if obj_start is None or obj_end is None:
        raise ValueError("未能在文件中找到 obj 对象的定义")

    # 按 SQL 字段顺序重排 JavaScript 中 obj 的字段
    obj_content = ['var obj = {};\n']
    for field in fields:
        for line in js_content[obj_start:obj_end]:
            if f"obj.{field} =" in line:
                obj_content.append(line)
                break
    obj_content.append('records[i].value.root = obj;\n')

    return js_content[:obj_start] + obj_content + js_content[obj_end + 1:]


def main(sql_file_path, js_file_path, output_file_path):
    fields = extract_sql_fields(sql_file_path)
    adjusted_js_content = adjust_js_obj_fields(js_file_path, fields)
    with open(output_file_path, 'w', encoding='utf-8') as file:
        file.writelines(adjusted_js_content)
    print(f"文件已重新排序并保存在：{output_file_path}")


# 请替换以下路径为您的文件路径
sql_file_path = r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\129\原本\业务表.sql'
js_file_path = r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\129\原本\newZeppelin.js'
output_file_path = r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\129\对比\排序Zeppelin.js'

main(sql_file_path, js_file_path, output_file_path)
