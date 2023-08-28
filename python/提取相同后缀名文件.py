import os
import shutil

def collect_kml_files(src_folder, dst_folder):
    """
    从 src_folder 中的每个子文件夹提取 .kml 文件，并复制到 dst_folder。
    """
    # 确保目标文件夹存在
    if not os.path.exists(dst_folder):
        os.makedirs(dst_folder)

    # 遍历源文件夹中的每个子文件夹
    for foldername in os.listdir(src_folder):
        full_folder_path = os.path.join(src_folder, foldername)
        if os.path.isdir(full_folder_path):
            for filename in os.listdir(full_folder_path):
                if filename.endswith(".kml"):
                    src_path = os.path.join(full_folder_path, filename)
                    dst_path = os.path.join(dst_folder, filename)
                    
                    # 检查目标文件夹中是否已存在同名文件
                    counter = 1
                    base_name = os.path.splitext(filename)[0]
                    while os.path.exists(dst_path):
                        filename = f"{base_name}_{counter}.kml"
                        dst_path = os.path.join(dst_folder, filename)
                        counter += 1
                    
                    shutil.copy(src_path, dst_path)

# 使用示例
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\丰台区"
# dst_folder = r"E:\梁智杰\Bigemap\BMDownload\kml"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\石景山区"
# dst_folder = r"E:\梁智杰\Bigemap\BMDownload\kml"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\海淀区"
src_folder = r"E:\梁智杰\Bigemap\BMDownload\门头沟区"
dst_folder = r"E:\梁智杰\Bigemap\BMDownload\kml"
collect_kml_files(src_folder, dst_folder)
