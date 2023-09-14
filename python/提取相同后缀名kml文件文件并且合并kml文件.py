# 提取相同后缀名kml文件文件并且合并kml文件

import os
import shutil

def collect_kml_files(src_folder):
    for foldername in os.listdir(src_folder):
        full_folder_path = os.path.join(src_folder, foldername)
        if os.path.isdir(full_folder_path):
            kml_dst_folder = os.path.join(full_folder_path, 'kml')
            if not os.path.exists(kml_dst_folder):
                os.makedirs(kml_dst_folder)
            for subfoldername in os.listdir(full_folder_path):
                full_subfolder_path = os.path.join(full_folder_path, subfoldername)
                if os.path.isdir(full_subfolder_path):
                    for filename in os.listdir(full_subfolder_path):
                        if filename.endswith(".kml"):
                            src_path = os.path.join(full_subfolder_path, filename)
                            dst_path = os.path.join(kml_dst_folder, filename)
                            counter = 1
                            base_name = os.path.splitext(filename)[0]
                            while os.path.exists(dst_path):
                                filename = f"{base_name}_{counter}.kml"
                                dst_path = os.path.join(kml_dst_folder, filename)
                                counter += 1
                            shutil.copy(src_path, dst_path)

def merge_kml_as_text(directory):
    kml_files = [f for f in os.listdir(directory) if f.endswith('.kml')]
    kml_files = [os.path.join(directory, f) for f in kml_files]
    if not kml_files:
        return
    with open(kml_files[0], 'r', encoding='utf-8') as file:
        base_content = file.read()
    kml_files = kml_files[1:]
    folder_contents = []
    for kml_file in kml_files:
        with open(kml_file, 'r', encoding='utf-8') as file:
            content = file.read()
            start_index = content.find('<Folder>')
            end_index = content.find('</Folder>') + 9
            folder_contents.append(content[start_index:end_index])
    insert_index = base_content.rfind('</Document>')
    merged_content = base_content[:insert_index] + '\n'.join(folder_contents) + base_content[insert_index:]
    output_path = os.path.join(directory, "合并.kml")
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(merged_content)
    print(f"在 {directory} 中的KML文件合并完成！")

# 包含多个源文件夹路径的列表
base_directories = [
    r"D:\梁智杰\BMDownload\内蒙古\阿拉善盟",
    r"D:\梁智杰\BMDownload\内蒙古\兴安盟",
    # ... 添加更多基础目录
]

# 遍历每一个基础目录
for base_directory in base_directories:
    # 首先提取KML文件
    collect_kml_files(base_directory)

    # 然后合并KML文件
    subdirectories = [os.path.join(base_directory, d) for d in os.listdir(base_directory) if os.path.isdir(os.path.join(base_directory, d))]
    for subdirectory in subdirectories:
        kml_directory = os.path.join(subdirectory, 'kml')
        if os.path.exists(kml_directory):
            merge_kml_as_text(kml_directory)
