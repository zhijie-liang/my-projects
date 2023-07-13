import json
import os

# 获取文件夹中的所有 JSON 文件
directory = 'C:/Users/梁智杰/Desktop/json-simple/地图数据(3)/地图数据2/cities/'  # 将这里替换成你的文件夹路径
json_files = [f for f in os.listdir(directory) if f.endswith('.json')]

# 读取并合并所有 JSON 文件的 "features"
merged_data = {'features': []}
for json_file in json_files:
    with open(os.path.join(directory, json_file), 'r', encoding='utf-8') as f:
        data = json.load(f)
        merged_data['features'].extend(data['features'])

# 将合并后的数据写入新的 JSON 文件
with open('C:/Users/梁智杰/Desktop/json-simple/merged.json', 'w', encoding='utf-8') as f:
    json.dump(merged_data, f, ensure_ascii=False)
