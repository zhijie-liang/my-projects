# 批量删掉二级目录以下的所有三级及以下目录。然后创建code

import os
import shutil


def process_directories(parent_dir):
    """
    Deletes all subdirectories under each top directory
    located inside the parent directory, and then creates
    a 'code' directory inside each top directory.
    """
    if os.path.exists(parent_dir):
        for top_dir in os.listdir(parent_dir):
            top_path = os.path.join(parent_dir, top_dir)
            if os.path.isdir(top_path):
                # Delete all subdirectories inside this top directory
                for subdir in os.listdir(top_path):
                    full_subdir_path = os.path.join(top_path, subdir)
                    if os.path.isdir(full_subdir_path):
                        shutil.rmtree(full_subdir_path)
                        print(f"Deleted {full_subdir_path}")

                # Create the 'code' directory inside this top directory
                code_dir = os.path.join(top_path, 'code')
                os.makedirs(code_dir, exist_ok=True)
                print(f"Created {code_dir}")
    else:
        print(f"{parent_dir} does not exist.")


parent_directory = r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\黑龙江"

process_directories(parent_directory)
