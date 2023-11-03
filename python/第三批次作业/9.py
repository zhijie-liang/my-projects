

import pandas as pd

# Function to simplify the data type description and remove trailing commas
def simplify_data_type(data_type):
    if pd.isnull(data_type) or not isinstance(data_type, str):
        return data_type  # Return as is if the value is NaN or not a string
    simplified_data_type = data_type.split()[0]  # Split the string and take the first word
    simplified_data_type = simplified_data_type.split('(')[0]  # Remove the parenthesis part
    simplified_data_type = simplified_data_type.rstrip(',')  # Remove any trailing commas
    return simplified_data_type

# Load the Excel file
file_path = r"C:\Users\梁智杰\Desktop\核对校验\9cs.xlsx"  # Replace with your file path
excel_data = pd.ExcelFile(file_path)

# Get the sheet names
sheet_names = excel_data.sheet_names

# Process each sheet and update the data types
processed_sheets = {}
for sheet in sheet_names:
    # Read the sheet into a DataFrame
    df = pd.read_excel(excel_data, sheet_name=sheet)
    
    # Simplify the third and fifth columns, checking for NaN values and non-string types
    df.iloc[:, 2] = df.iloc[:, 2].apply(simplify_data_type)
    df.iloc[:, 4] = df.iloc[:, 4].apply(simplify_data_type)
    
    # Save the processed DataFrame
    processed_sheets[sheet] = df

# Save the processed data to a new Excel file
output_file_path = r"C:\Users\梁智杰\Desktop\核对校验\9.xlsx"  # Replace with the desired output file path
with pd.ExcelWriter(output_file_path) as writer:
    for sheet_name, df in processed_sheets.items():
        df.to_excel(writer, sheet_name=sheet_name, index=False)

# You can now access the processed_cs.xlsx file at the specified path
