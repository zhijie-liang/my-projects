#返回json文件内容，内容格式改成没有空格和分行

import json
import os

# 指定文件夹路径
folder_path = r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\贵州"

# 获取文件夹中的所有文件
for file_name in os.listdir(folder_path):
    # 确保只处理 JSON 文件
    if file_name.endswith('.json'):
        file_path = os.path.join(folder_path, file_name)
        
        # 读取和解析 JSON 数据
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        # 以没有空格和分行的形式将 JSON 数据写回到文件
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, separators=(',', ':'))
