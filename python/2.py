# 合并kml文件

import os

def merge_kml_as_text(directory):
    # 获取目录下的所有.kml文件
    kml_files = [f for f in os.listdir(directory) if f.endswith('.kml')]
    kml_files = [os.path.join(directory, f) for f in kml_files]

    # 如果该目录下没有.kml文件，直接返回
    if not kml_files:
        return

    # 从第一个.kml文件中获取基础结构
    with open(kml_files[0], 'r', encoding='utf-8') as file:
        base_content = file.read()

    # 删除第一个文件从列表中，因为我们已经有它的内容了
    kml_files = kml_files[1:]

    # 从其他文件中获取 <Folder>...</Folder> 内容
    folder_contents = []
    for kml_file in kml_files:
        with open(kml_file, 'r', encoding='utf-8') as file:
            content = file.read()
            start_index = content.find('<Folder>')
            end_index = content.find('</Folder>') + 9  # 加 9 以包含 '</Folder>'
            folder_contents.append(content[start_index:end_index])

    # 在第一个文件的内容中找到插入位置，并插入其他文件的 <Folder>...</Folder> 内容
    insert_index = base_content.rfind('</Document>')
    merged_content = base_content[:insert_index] + '\n'.join(folder_contents) + base_content[insert_index:]

    # 保存到新文件
    output_path = os.path.join(directory, "合并.kml")
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(merged_content)

    print(f"在 {directory} 中的KML文件合并完成！")

base_directory = r"E:\梁智杰\Bigemap\BMDownload\安徽\芜湖市"
subdirectories = [os.path.join(base_directory, d) for d in os.listdir(base_directory) if os.path.isdir(os.path.join(base_directory, d))]

for subdirectory in subdirectories:
    kml_directory = os.path.join(subdirectory, 'kml')
    if os.path.exists(kml_directory):
        merge_kml_as_text(kml_directory)


