# 批量创建文件夹及其子文件夹

import json
import os

def create_directory_structure(json_file_path, root_folder_name):
    with open(json_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Check the structure of the data and get the list of cities
    if 'features' in data:
        items = data['features']
    elif 'cities' in data:
        items = data['cities']
    else:
        print("Unexpected data structure")
        return

    # Create the root folder
    root_folder_path = os.path.join(os.getcwd(), root_folder_name)
    os.makedirs(root_folder_path, exist_ok=True)

    # Loop through each city and create folders
    for item in items:
        if 'properties' in item:
            properties = item['properties']
            city_name = properties['name']
        else:
            city_name = item['name']

        # Create a folder for the city
        city_folder_path = os.path.join(root_folder_path, city_name)
        os.makedirs(city_folder_path, exist_ok=True)

        # Check if there are districts in the city and create folders for them
        if 'districts' in item:
            for district in item['districts']:
                district_name = district['name']
                district_folder_path = os.path.join(city_folder_path, district_name)
                os.makedirs(district_folder_path, exist_ok=True)

if __name__ == "__main__":
    json_file_path = "C:/Users/梁智杰/Desktop/新建文件夹/my-projects/src/components/map/json/210000.json"  # Replace with the path to your JSON file
    root_folder_name = "辽宁"  # Replace with the name of the root folder
    create_directory_structure(json_file_path, root_folder_name)
