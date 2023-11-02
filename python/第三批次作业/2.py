# 遍历指定文件夹中的所有.xlsx文件。
# 读取每个文件，并修改第三列中的所有小写字母为大写字母。
# 保存修改后的文件。

import os
import pandas as pd


def uppercase_third_column(directory_path):
    # 遍历指定目录中的所有文件
    for filename in os.listdir(directory_path):
        if filename.endswith(".xlsx"):
            # 构建完整的文件路径
            file_path = os.path.join(directory_path, filename)

            # 读取Excel文件
            df = pd.read_excel(file_path, engine='openpyxl')

            # 将第三列（索引为2）中的所有小写字母转换为大写
            df[df.columns[2]] = df[df.columns[2]].astype(str).str.upper()

            # 将修改后的DataFrame保存回Excel文件
            df.to_excel(file_path, index=False, engine='openpyxl')


# 示例使用：
directory_path = r"C:\Users\梁智杰\Desktop\核对校验\1"
uppercase_third_column(directory_path)
