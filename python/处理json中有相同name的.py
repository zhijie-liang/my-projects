import json
from collections import defaultdict

# 加载所提供的JSON文件
with open("C:/Users/梁智杰/Desktop/新建文件夹/my-projects/public/map/dtsj3/all/110108.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# 按'name'属性进行分组
grouped_by_name = defaultdict(list)
for feature in data['features']:
    grouped_by_name[feature['properties']['name']].append(feature)

# 按'coordinates'的长度降序排序每个组，然后合并
merged_features = []
for name, features in grouped_by_name.items():
    sorted_features = sorted(features, key=lambda x: len(x['geometry']['coordinates'][0]), reverse=True)
    merged_feature = sorted_features[0]
    for feature in sorted_features[1:]:
        merged_feature['geometry']['coordinates'].extend(feature['geometry']['coordinates'])
    merged_features.append(merged_feature)

# 使用合并后的features更新原始数据结构
data['features'] = merged_features

# 将处理后的数据保存回原JSON文件
with open("C:/Users/梁智杰/Desktop/新建文件夹/my-projects/public/map/dtsj3/all/110108.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False)
