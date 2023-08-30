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
                # if filename.endswith(".kml"):
                if filename.endswith(".geojson"):
                    src_path = os.path.join(full_folder_path, filename)
                    dst_path = os.path.join(dst_folder, filename)
                    
                    # 检查目标文件夹中是否已存在同名文件
                    counter = 1
                    base_name = os.path.splitext(filename)[0]
                    while os.path.exists(dst_path):
                        # filename = f"{base_name}_{counter}.kml"
                        filename = f"{base_name}_{counter}.geojson"
                        dst_path = os.path.join(dst_folder, filename)
                        counter += 1
                    
                    shutil.copy(src_path, dst_path)

# 使用示例
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\丰台区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\石景山区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\海淀区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\门头沟区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\房山区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\通州区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\昌平区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\大兴区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\怀柔区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\密云区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\平谷区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\顺义区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\延庆区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\宝山区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\崇明区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\奉贤区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\虹口区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\黄浦区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\嘉定区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\金山区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\静安区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\闵行区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\浦东新区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\普陀区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\青浦区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\松江区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\徐汇区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\杨浦区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海\长宁区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\白云区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\从化区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\番禺区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\海珠区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\花都区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\黄埔区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\荔湾区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\南沙区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\天河区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\越秀区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州\增城区"
# src_folder = r"E:\梁智杰\Bigemap\BMDownload\上海"
src_folder = r"E:\梁智杰\Bigemap\BMDownload\广州"
# dst_folder = r"E:\梁智杰\Bigemap\BMDownload\kml"
# dst_folder = r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\上海"
dst_folder = r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广州"
collect_kml_files(src_folder, dst_folder)
