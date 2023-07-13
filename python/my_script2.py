import json
import os

# input file directory
input_folder_path = "C:/Users/梁智杰/Desktop/地图/地图geojson文件/中华人民共和国_100000/地图数据(3)/地图数据/provinces/330000"

# output file directory
output_folder_path = "C:/Users/梁智杰/Desktop/地图/地图geojson文件/中华人民共和国_100000/地图数据(3)/新地图数据/provinces/330000"

# create the output directory if it does not exist
os.makedirs(output_folder_path, exist_ok=True)

# iterate over all the json files
for file_name in os.listdir(input_folder_path):
    if file_name.endswith('.json'):
        # open and load the file content
        with open(os.path.join(input_folder_path, file_name), 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        new_features = []  # this list will hold the simplified features
        # iterate over all the features in the features list
        for feature in data['features']:
            # get the properties dictionary
            properties = feature['properties']
            # get the keys we want to keep
            keys_to_keep = ['adcode', 'name', 'center']
            # get all the keys that are in the properties but not in keys_to_keep
            keys_to_remove = [key for key in properties if key not in keys_to_keep]
            
            # remove these keys
            for key in keys_to_remove:
                del properties[key]

            # add the simplified feature to the new features list
            new_features.append({'properties': properties})
        
        # create the new data dictionary
        new_data = {'features': new_features}
        
        # save the updated data to a new file
        with open(os.path.join(output_folder_path, file_name), 'w', encoding='utf-8') as outfile:
            json.dump(new_data, outfile, ensure_ascii=False)
