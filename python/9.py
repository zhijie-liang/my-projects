# 批量处理某个文件夹里的xlsx文件。
# 给所有xlsx文件新添加一列（Time）。
# 这一列的内容是该文件的文件名。最后将处理后的文件输出到指定文件夹里。

import os
import pandas as pd

# 指定源文件夹和目标文件夹
src_folder = "C:/Users/梁智杰/Desktop/数字工作项目组/超级计算机top500（93-22）/8.py"
dst_folder = "C:/Users/梁智杰/Desktop/数字工作项目组/超级计算机top500（93-22）/8.py/9.py"

# 如果目标文件夹不存在，创建它
if not os.path.exists(dst_folder):
    os.makedirs(dst_folder)

# 遍历源文件夹中的所有文件
for filename in os.listdir(src_folder):
    if filename.endswith(".xlsx"):
        
        filepath = os.path.join(src_folder, filename)
        # 读取xlsx文件
        df = pd.read_excel(filepath)
        
        # 添加新的列，该列的所有值都是文件名
        df['Time'] = filename
        
        # 保存到目标文件夹
        dst_filepath = os.path.join(dst_folder, filename)
        df.to_excel(dst_filepath, index=False)

print("处理完成！")
