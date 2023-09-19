# 批量更改文件名

import os

# 设定目标文件夹
# 请将这个路径改为你的文件夹路径
folder_path = r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\鞍山市"

# 新名称列表，按照你给定的顺序
new_names = [
    "铁西区",
    "新民市",
    "于洪区",
    "昌图县",
    "调兵山市",
    "开原市",
    "清河区",
    "铁岭县",
    "西丰县",
    "银州区",
    "鲅鱼圈区",
    "大石桥市",
    "盖州市",
    "老边区",
    "西市区",
    "站前区"
]

# 旧名称列表，按照最后修改时间升序
old_names = [
    "map(85).geojson",
    "map(86).geojson",
    "map(87).geojson",
    "map(88).geojson",
    "map(89).geojson",
    "map(90).geojson",
    "map(91).geojson",
    "map(92).geojson",
    "map(93).geojson",
    "map(94).geojson",
    "map(95).geojson",
    "map(96).geojson",
    "map(97).geojson",
    "map(98).geojson",
    "map(99).geojson",
    "map(100).geojson"
]

# 确保新名称和旧名称的数量是相同的
if len(new_names) != len(old_names):
    print("新名称和旧名称的数量不匹配!")
else:
    # 执行文件重命名
    for old_name, new_name in zip(old_names, new_names):
        old_filepath = os.path.join(folder_path, old_name)
        new_filepath = os.path.join(
            folder_path, f"{new_name}.geojson")  # 添加文件扩展名
        os.rename(old_filepath, new_filepath)

    print("文件重命名完成！")
