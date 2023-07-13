import json

# 加载原始数据
with open('C:/Users/梁智杰/Desktop/json-simple/china.json', 'r', encoding='utf-8') as source_file:
    data = json.load(source_file)

# 初始化新数据结构
new_data = {"districts": []}

# 遍历原始数据并提取districts信息
for province in data["provinces"]:
    if "cities" in province:  # 检查 "cities" 键是否存在
        for city in province["cities"]:
            if "districts" in city:  # 检查 "districts" 键是否存在
                for district in city["districts"]:
                    # 提取需要的信息
                    new_district = {
                        "adcode": district["adcode"],
                        "name": district["name"],
                        "center": district["center"]
                    }
                    # 添加到新数据结构中
                    new_data["districts"].append(new_district)

# 写入新的 JSON 文件
with open('C:/Users/梁智杰/Desktop/json-simple/zhongguooutput.json', 'w', encoding='utf-8') as new_file:
    json.dump(new_data, new_file, ensure_ascii=False, indent=2)
