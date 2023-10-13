# 只合并kml文件

import os


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
    merged_content = base_content[:insert_index] + \
        '\n'.join(folder_contents) + base_content[insert_index:]
    output_path = os.path.join(directory, "合并.kml")
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(merged_content)
    print(f"在 {directory} 中的KML文件合并完成！")


# 包含多个源文件夹路径的列表
base_directories = [
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

# 遍历路径列表，对每个源文件夹进行操作
for base_directory in base_directories:
    subdirectories = [os.path.join(base_directory, d) for d in os.listdir(
        base_directory) if os.path.isdir(os.path.join(base_directory, d))]
    for subdirectory in subdirectories:
        kml_directory = os.path.join(subdirectory, 'kml')
        if os.path.exists(kml_directory):
            merge_kml_as_text(kml_directory)
