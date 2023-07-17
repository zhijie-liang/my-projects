import os

# 文件夹路径
folder_path = 'C:/Users/梁智杰/Desktop/json-simple/txt'

# 获取文件夹中所有以.txt结尾的文件，并按文件名排序
txt_files = sorted([f for f in os.listdir(folder_path) if f.endswith('.txt')])

# 合并所有txt文件的内容
merged_data = ''
for txt_file in txt_files:
    file_path = os.path.join(folder_path, txt_file)
    with open(file_path, 'r') as file:
        merged_data += file.read() + '/n'

# 将合并后的内容写入合并文件
with open('C:/Users/梁智杰/Desktop/json-simple/txt/merged_file.txt', 'w') as merged_file:
    merged_file.write(merged_data)

print("文件合并完成！")
