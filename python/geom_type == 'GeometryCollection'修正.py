import os
import geopandas as gpd
from shapely.geometry import Polygon

def process_geometry(geometry):
    modified = False
    if geometry.geom_type == 'GeometryCollection':
        polygons = [geom for geom in geometry.geoms if geom.geom_type == 'Polygon']
        if polygons:
            main_polygon = max(polygons, key=lambda geom: geom.area)
            holes = [geom.exterior.coords for geom in polygons if geom != main_polygon]
            new_polygon = Polygon(shell=main_polygon.exterior.coords, holes=holes)
            modified = True
            return new_polygon, modified
    return geometry, modified

def process_file(input_path, output_path):
    gdf = gpd.read_file(input_path)
    modified = False
    gdf['geometry'], geom_modified = zip(*gdf['geometry'].apply(process_geometry))
    if any(geom_modified):
        modified = True
    
    gdf.to_file(output_path, driver='GeoJSON')
    return modified

# 指定输入和输出文件夹
input_folder = "C:/Users/梁智杰/Desktop/新建文件夹/my-projects/public/map/dtsj3/china/code"
output_folder = "C:/Users/梁智杰/Desktop/新建文件夹/my-projects/public/map/dtsj3/china/code"

for filename in os.listdir(input_folder):
    if filename.endswith(".json"):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)
        modified = process_file(input_path, output_path)
        if modified:
            print(f"{filename} 已修正")
        else:
            print(f"{filename} 无需修正")
