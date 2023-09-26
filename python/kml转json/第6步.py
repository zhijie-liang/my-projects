# 创建一个字典，将地图名映射到相应的代码

import json

def extract_districts(data):
    result = {}
    for city in data.get('cities', []):
        for district in city.get('districts', []):
            name = district.get('name')
            adcode = district.get('adcode')
            if name and adcode:
                result[name] = adcode
    return result

# 指定文件路径
filepath = "C:/Users/梁智杰/Desktop/新建文件夹/my-projects/src/components/map/json/330000.json"  # 请替换为你的文件路径

# 读取 JSON 文件
with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 提取 districts 下的所有 name 和 adcode
districts_data = extract_districts(data)

# 打印结果
print(districts_data)
