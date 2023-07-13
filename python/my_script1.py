import json

# 从原JSON文件中读取数据
with open("C:/Users/梁智杰/Desktop/json-simple/merged.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 提取需要的属性
new_data = []
for feature in data["features"]:
    new_feature = {
        "adcode": feature["properties"]["adcode"],
        "name": feature["properties"]["name"],
        "center": feature["properties"]["center"]
    }
    new_data.append(new_feature)

# 写入新的JSON文件
with open("C:/Users/梁智杰/Desktop/json-simple/mergednew.json", "w", encoding="utf-8") as f:
    json.dump({"features": new_data}, f, ensure_ascii=False)
