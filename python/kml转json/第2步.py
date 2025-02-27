# 只提取相同后缀名文件

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
                full_subfolder_path = os.path.join(
                    full_folder_path, subfoldername)

                if os.path.isdir(full_subfolder_path):
                    for filename in os.listdir(full_subfolder_path):
                        if filename.endswith(".kml"):
                            src_path = os.path.join(
                                full_subfolder_path, filename)
                            dst_path = os.path.join(kml_dst_folder, filename)

                            # 检查 'kml' 文件夹中是否已存在同名文件
                            counter = 1
                            base_name = os.path.splitext(filename)[0]
                            while os.path.exists(dst_path):
                                filename = f"{base_name}_{counter}.kml"
                                dst_path = os.path.join(
                                    kml_dst_folder, filename)
                                counter += 1

                            shutil.copy(src_path, dst_path)


# 包含多个源文件夹路径的列表
src_folders = [
    r"D:\梁智杰\BMDownload\贵州\六盘水市",
    r"D:\梁智杰\BMDownload\贵州\安顺市",
    r"D:\梁智杰\BMDownload\贵州\毕节市",
    r"D:\梁智杰\BMDownload\贵州\贵阳市",
    r"D:\梁智杰\BMDownload\贵州\遵义市",
    r"D:\梁智杰\BMDownload\贵州\铜仁市",
    r"D:\梁智杰\BMDownload\贵州\黔东南苗族侗族自治州",
    r"D:\梁智杰\BMDownload\贵州\黔南布依族苗族自治州",
    r"D:\梁智杰\BMDownload\贵州\黔西南布依族苗族自治州"
]

# 遍历路径列表，对每个源文件夹执行 collect_kml_files 函数
for src_folder in src_folders:
    collect_kml_files(src_folder)
