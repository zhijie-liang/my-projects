import json
import re
from collections import defaultdict
import os

def remove_digits(string):
    return re.sub(r'\d+', '', string)

def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)

    # 按移除数字后的'name'属性进行分组
    grouped_by_name = defaultdict(list)
    for feature in data['features']:
        cleaned_name = remove_digits(feature['properties']['name'])
        grouped_by_name[cleaned_name].append(feature)

    merged_features = []
    for cleaned_name, features in grouped_by_name.items():
        # 合并前先更新 name 属性
        for feature in features:
            feature['properties']['name'] = cleaned_name

        sorted_features = sorted(features, key=lambda x: len(x['geometry']['coordinates'][0]), reverse=True)
        merged_feature = sorted_features[0]
        for feature in sorted_features[1:]:
            merged_feature['geometry']['coordinates'].extend(feature['geometry']['coordinates'])
        merged_features.append(merged_feature)

    data['features'] = merged_features

    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

# 文件夹路径
folder_path = "C:/Users/梁智杰/Desktop/新建文件夹/my-projects/src/components/map/行政区划级联数据(含乡镇街道)/and/北京/lzj"

# 遍历文件夹中的所有文件
for filename in os.listdir(folder_path):
    if filename.endswith(".json"):  # 确保只处理JSON文件
        file_path = os.path.join(folder_path, filename)
        process_file(file_path)
        print(f"{filename} 处理完毕!")

print("所有文件处理完毕!")
