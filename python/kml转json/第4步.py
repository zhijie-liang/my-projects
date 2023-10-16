# 从D:\黑龙江开始，遍历其中的一级子文件夹（如七台河市）。
# 对每一个一级子文件夹，遍历其中的二级子文件夹（如勃利县）。
# 在每一个二级子文件夹中，找到名为kml的文件夹，并从其中复制名为合并.kml的文件。
# 将这些复制出的合并.kml文件重命名为其所在的二级子文件夹的名称，但文件后缀.kml保持不变。
# 将重命名后的文件保存到一个指定路径的文件夹中。

import os
import shutil

source_dir = r"D:\梁智杰\BMDownload\海南"
destination_dir = r"D:\梁智杰\BMDownload\海南\总kml"  # 请替换为您的目标文件夹路径

# 遍历一级子文件夹
for city in os.listdir(source_dir):
    city_path = os.path.join(source_dir, city)
    
    # 确保是文件夹而非文件，并进入二级子文件夹
    if os.path.isdir(city_path):
        for county in os.listdir(city_path):
            county_path = os.path.join(city_path, county)
            
            # 确保是文件夹，并查找名为kml的文件夹
            if os.path.isdir(county_path) and 'kml' in os.listdir(county_path):
                kml_file = os.path.join(county_path, 'kml', '合并.kml')
                
                # 如果合并.kml文件存在，则复制并重命名
                if os.path.exists(kml_file):
                    destination_file = os.path.join(destination_dir, f"{county}.kml")
                    shutil.copy2(kml_file, destination_file)

print("复制并重命名完成!")
