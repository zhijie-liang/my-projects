import os
import shutil

def collect_kml_files(src_folder):
    """
    从 src_folder 中的每个子文件夹提取 .kml 文件，并复制到其新的 'kml' 子文件夹。
    """
    # 遍历源文件夹中的每个子文件夹
    for foldername in os.listdir(src_folder):
        full_folder_path = os.path.join(src_folder, foldername)

        # 只处理子目录
        if os.path.isdir(full_folder_path):
            kml_dst_folder = os.path.join(full_folder_path, 'kml')
            
            if not os.path.exists(kml_dst_folder):
                os.makedirs(kml_dst_folder)
            
            # 遍历该子目录下的所有子文件夹
            for subfoldername in os.listdir(full_folder_path):
                full_subfolder_path = os.path.join(full_folder_path, subfoldername)

                if os.path.isdir(full_subfolder_path):
                    for filename in os.listdir(full_subfolder_path):
                        if filename.endswith(".kml"):
                            src_path = os.path.join(full_subfolder_path, filename)
                            dst_path = os.path.join(kml_dst_folder, filename)
                            
                            # 检查 'kml' 文件夹中是否已存在同名文件
                            counter = 1
                            base_name = os.path.splitext(filename)[0]
                            while os.path.exists(dst_path):
                                filename = f"{base_name}_{counter}.kml"
                                dst_path = os.path.join(kml_dst_folder, filename)
                                counter += 1
                            
                            shutil.copy(src_path, dst_path)

# 使用示例
src_folder = r"E:\梁智杰\Bigemap\BMDownload\河北\廊坊市"
collect_kml_files(src_folder)

