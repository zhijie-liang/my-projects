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
    r"D:\梁智杰\BMDownload\湖南\娄底市",
    r"D:\梁智杰\BMDownload\湖南\岳阳市",
    r"D:\梁智杰\BMDownload\湖南\常德市",
    r"D:\梁智杰\BMDownload\湖南\张家界市",
    r"D:\梁智杰\BMDownload\湖南\怀化市",
    r"D:\梁智杰\BMDownload\湖南\株洲市",
    r"D:\梁智杰\BMDownload\湖南\永州市",
    r"D:\梁智杰\BMDownload\湖南\湘潭市",
    r"D:\梁智杰\BMDownload\湖南\湘西土家族苗族自治州",
    r"D:\梁智杰\BMDownload\湖南\益阳市",
    r"D:\梁智杰\BMDownload\湖南\衡阳市",
    r"D:\梁智杰\BMDownload\湖南\邵阳市",
    r"D:\梁智杰\BMDownload\湖南\郴州市",
    r"D:\梁智杰\BMDownload\湖南\长沙市"
]

# 遍历路径列表，对每个源文件夹执行 collect_kml_files 函数
for src_folder in src_folders:
    collect_kml_files(src_folder)
