# 批量处理某个文件夹里的xlsx文件。首先将所有xlsx文件浏览一遍，
# 先把首行空缺的xlsx的文件统一删除首行。然后将首行作为导航，
# 将除了（【rank】【site】【manufacturer】【total cores】不区分大小写）这几个的列之外的列全部删掉。
# 最后将处理后的文件输出到指定文件夹里。

import os
import pandas as pd

# 指定源文件夹和目标文件夹
src_folder = "C:/Users/梁智杰/Desktop/数字工作项目组/超级计算机top500（93-22）"
dst_folder = "C:/Users/梁智杰/Desktop/数字工作项目组/超级计算机top500（93-22）/8.py"

# 如果目标文件夹不存在，创建它
if not os.path.exists(dst_folder):
    os.makedirs(dst_folder)

# 遍历源文件夹中的所有文件
for filename in os.listdir(src_folder):
    if filename.endswith(".xlsx"):
        
        filepath = os.path.join(src_folder, filename)
        
        # 读取xlsx文件，不使用首行作为列名
        df = pd.read_excel(filepath, header=None)
        
        # 检查首行是否为空，如果是则删除，并让第二行成为新的列名
        if df.iloc[0].isna().all():
            df = df.iloc[1:]
            new_header = df.iloc[0]
            df = df[1:]
            df.columns = new_header
        
        else:
            df.columns = df.iloc[0]
            df = df[1:]
        
        # 转换列名为小写以便比较
        columns_to_keep = []
        for col in df.columns:
            if str(col).lower() in ["rank", "site", "manufacturer", "total cores", "country"]:
                columns_to_keep.append(col)
        
        # 只保留需要的列
        df = df[columns_to_keep]
        
        # 保存到目标文件夹
        dst_filepath = os.path.join(dst_folder, filename)
        df.to_excel(dst_filepath, index=False)

print("处理完成！")
