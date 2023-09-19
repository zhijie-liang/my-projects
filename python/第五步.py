# 批量修改文件后缀名

import os


def batch_rename_extension(src_dir, original_ext, new_ext):
    """
    在指定目录中批量修改文件后缀名。

    参数:
    - src_dir: 要修改的文件的目录
    - original_ext: 原始后缀名 (例如：'.txt')
    - new_ext: 新的后缀名 (例如：'.md')
    """
    for file_name in os.listdir(src_dir):
        if file_name.endswith(original_ext):
            base_name = os.path.splitext(file_name)[0]
            new_name = base_name + new_ext
            os.rename(os.path.join(src_dir, file_name),
                      os.path.join(src_dir, new_name))
            print(f"Renamed: {file_name} -> {new_name}")


# 目录列表
dir_list = [
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\丹东市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\大连市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\抚顺市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\朝阳市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\本溪市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\沈阳市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\盘锦市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\营口市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\葫芦岛市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\辽阳市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\铁岭市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\锦州市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\阜新市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\辽宁\鞍山市\code"
    # 添加更多目录...
]

original_ext = '.geojson'   # 替换为你想要替换的原始后缀
new_ext = '.json'           # 替换为你想要的新后缀

# 遍历每个目录并执行批量重命名
for dir in dir_list:
    batch_rename_extension(dir, original_ext, new_ext)
