import json
import re

# 打开文件
with open("C:/Users/梁智杰/Desktop/新建文件夹/my-projects/public/map/dtsj3/all/110108.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# 遍历features并更新name属性
for feature in data["features"]:
    if "name" in feature["properties"]:
        feature["properties"]["name"] = re.sub(r'\d+', '', feature["properties"]["name"])

# 将修改后的数据写回到文件中
with open("C:/Users/梁智杰/Desktop/新建文件夹/my-projects/public/map/dtsj3/all/110108.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print("处理完毕!")
