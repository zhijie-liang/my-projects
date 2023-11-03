import pandas as pd

# Function to simplify and update the data type description
def update_data_type(data_type):
    # Update the data type according to the specified rules
    mapping = {'int': 'int', 'tinyint': 'int', 'smallint': 'int',
               'bigint': 'long', 'float': 'double', 'varchar': 'varchar'}
    return mapping.get(data_type, data_type)  # Default to original if not in mapping

# Function to compare data types and return 'yes' or 'no'
def compare_data_types(type1, type2):
    return 'yes' if type1 == type2 else 'no'

# Load the already processed Excel file
file_path = r"C:\Users\梁智杰\Desktop\核对校验\9.xlsx"  # Replace with your file path
excel_data = pd.ExcelFile(file_path)

# Get the sheet names
sheet_names = excel_data.sheet_names

# Further process each sheet and update the data types
final_processed_sheets = {}
for sheet in sheet_names:
    # Read the sheet into a DataFrame
    df = pd.read_excel(excel_data, sheet_name=sheet)
    
    # Update the third column according to the new rules
    df.iloc[:, 2] = df.iloc[:, 2].apply(update_data_type)
    
    # Add a new sixth column with comparison results
    df['Comparison'] = df.apply(lambda row: compare_data_types(row.iloc[2], row.iloc[4]), axis=1)
    
    # Save the final processed DataFrame
    final_processed_sheets[sheet] = df

# Save the final processed data to a new Excel file
final_output_file_path = r"C:\Users\梁智杰\Desktop\核对校验\10.xlsx"  # Replace with the desired output file path
with pd.ExcelWriter(final_output_file_path) as writer:
    for sheet_name, df in final_processed_sheets.items():
        df.to_excel(writer, sheet_name=sheet_name, index=False)

# You can now access the final_processed_cs.xlsx file at the specified path
