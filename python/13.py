# 要把批量文件夹里的文件都集合在一个指定文件夹里

import os
import shutil

# 源文件夹路径列表
src_dirs = [
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
]

# 目标文件夹路径
dst_dir = r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\内蒙古\code"

# 确保目标文件夹存在
if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

# 开始移动文件
for src in src_dirs:
    for filename in os.listdir(src):
        src_filepath = os.path.join(src, filename)
        dst_filepath = os.path.join(dst_dir, filename)

        # 检查是否存在同名文件
        counter = 1
        while os.path.exists(dst_filepath):
            name, ext = os.path.splitext(filename)
            dst_filepath = os.path.join(dst_dir, f"{name}_{counter}{ext}")
            counter += 1

        # 移动文件
        shutil.copy(src_filepath, dst_filepath)

print("文件移动完成。")
