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
            os.rename(os.path.join(src_dir, file_name), os.path.join(src_dir, new_name))
            print(f"Renamed: {file_name} -> {new_name}")

# 目录列表
dir_list = [
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\山西\临汾市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\山西\吕梁市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\山西\太原市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\山西\忻州市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\山西\晋中市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\山西\晋城市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\山西\朔州市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\山西\运城市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\山西\长治市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\山西\阳泉市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\乌兰察布市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\乌海市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\兴安盟\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\包头市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\呼伦贝尔市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\呼和浩特市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\巴彦淖尔市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\赤峰市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\通辽市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\鄂尔多斯市\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\锡林郭勒盟\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\阿拉善盟\code",
    # 添加更多目录...
]

original_ext = '.geojson'   # 替换为你想要替换的原始后缀
new_ext = '.json'           # 替换为你想要的新后缀

# 遍历每个目录并执行批量重命名
for dir in dir_list:
    batch_rename_extension(dir, original_ext, new_ext)

