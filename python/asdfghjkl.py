import json

def modify_json():
    # 输入和输出文件的固定路径
    input_filepath = 'C:/Users/梁智杰/Desktop/新建文件夹/my-projects/src/components/map/行政区划级联数据(含乡镇街道)/and/河北/唐山市/code/130202.json'
    output_filepath = 'C:/Users/梁智杰/Desktop/新建文件夹/my-projects/src/components/map/行政区划级联数据(含乡镇街道)/and/河北/唐山市/code/2.json'
    
    # 从输入文件读取JSON数据
    with open(input_filepath, 'r') as f:
        data = json.load(f)
    
    # 提取第一个Feature中的所有Polygon坐标
    all_polygons = [geom['coordinates'] for geom in data['features'][0]['geometry']['geometries']]
    
    # 将坐标按长度排序，这样最长的坐标系列会被放在最前面
    all_polygons.sort(key=len, reverse=True)
    
    # 将排序后的坐标集成为一个大的Polygon
    new_geometry = {
        "type": "Polygon",
        "coordinates": all_polygons
    }
    
    # 更新第一个Feature的geometry
    data['features'][0]['geometry'] = new_geometry
    
    # 保存修改后的JSON数据到输出文件
    with open(output_filepath, 'w') as f:
        json.dump(data, f, indent=4)

if __name__ == "__main__":
    modify_json()
