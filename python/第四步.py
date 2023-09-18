# 批量更改文件名

import os

# 设定目标文件夹
# 请将这个路径改为你的文件夹路径
folder_path = r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\珠海"

# 新名称列表，按照你给定的顺序
new_names = [
    # "",
    # "",
    # "",
    # "",
    # "",
    # "",
    # "",
    # "",
    # "",
    # "",
    # "",
    "斗门区",
    "金湾区",
    "香洲区"
]

# 旧名称列表，按照最后修改时间升序
old_names = [
    "map(1).geojson", "map(2).geojson", "map(3).geojson"
    # , "map(4).geojson", "map(5).geojson",
    # "map(6).geojson", "map(7).geojson", "map(8).geojson", "map(9).geojson", "map(10).geojson",
    # "map(11).geojson", "map(12).geojson", "map(13).geojson", "map(14).geojson", "map(15).geojson",
    # "map(16).geojson", "map(17).geojson", "map(18).geojson", "map(19).geojson", "map(20).geojson",
    # "map(21).geojson", "map(22).geojson", "map(23).geojson", "map(24).geojson", "map(25).geojson"
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
