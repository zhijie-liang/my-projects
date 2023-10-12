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
    r"D:\梁智杰\BMDownload\湖北\仙桃市",
    r"D:\梁智杰\BMDownload\湖北\十堰市",
    r"D:\梁智杰\BMDownload\湖北\咸宁市",
    r"D:\梁智杰\BMDownload\湖北\天门市",
    r"D:\梁智杰\BMDownload\湖北\孝感市",
    r"D:\梁智杰\BMDownload\湖北\宜昌市",
    r"D:\梁智杰\BMDownload\湖北\恩施土家族苗族自治州",
    r"D:\梁智杰\BMDownload\湖北\武汉市",
    r"D:\梁智杰\BMDownload\湖北\潜江市",
    r"D:\梁智杰\BMDownload\湖北\神农架林区",
    r"D:\梁智杰\BMDownload\湖北\荆州市",
    r"D:\梁智杰\BMDownload\湖北\荆门市",
    r"D:\梁智杰\BMDownload\湖北\襄阳市",
    r"D:\梁智杰\BMDownload\湖北\鄂州市",
    r"D:\梁智杰\BMDownload\湖北\随州市",
    r"D:\梁智杰\BMDownload\湖北\黄冈市",
    r"D:\梁智杰\BMDownload\湖北\黄石市"
]

# 遍历路径列表，对每个源文件夹进行操作
for base_directory in base_directories:
    subdirectories = [os.path.join(base_directory, d) for d in os.listdir(
        base_directory) if os.path.isdir(os.path.join(base_directory, d))]
    for subdirectory in subdirectories:
        kml_directory = os.path.join(subdirectory, 'kml')
        if os.path.exists(kml_directory):
            merge_kml_as_text(kml_directory)
