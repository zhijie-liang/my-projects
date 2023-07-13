import json

# Load the original data
with open("C:/Users/梁智杰/Desktop/json-simple/china.json", "r", encoding='utf-8') as f:
    data = json.load(f)

# Process the provinces
new_provinces = []
for province in data['provinces']:
    new_province = province['properties']
    new_province['postal_code'] = ''
    new_province['districts'] = []
    new_provinces.append(new_province)

# Save the processed data
new_data = {'cities': new_provinces}
with open("C:/Users/梁智杰/Desktop/json-simple/zhongguooutput.json", "w", encoding='utf-8') as f:
    json.dump(new_data, f, ensure_ascii=False)
