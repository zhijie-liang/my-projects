import json

def process_json(data):
    if isinstance(data, list):
        for item in data:
            process_json(item)
    elif isinstance(data, dict):
        if "center" in data:
            x, y = data["center"]
            del data["center"]
            data["longitude"] = str(x)
            data["latitude"] = str(y)
        for value in data.values():
            process_json(value)

# Step 1: Read JSON file with correct encoding
with open('C:/Users/梁智杰/Desktop/json-simple/china.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Step 2: Modify data
process_json(data)

# Step 3: Write data back to JSON file with Unicode decoding
with open('C:/Users/梁智杰/Desktop/json-simple/chinaout.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
