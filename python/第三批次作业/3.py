# .xlsx转换.txt

import pandas as pd
import os


def xlsx_to_txt_final_fixed_v8(input_xlsx_path, output_txt_path):
    # Read the Excel file with header=None to avoid considering the first row as header
    df = pd.read_excel(input_xlsx_path, header=None)

    # Initialize txt content list
    txt_content = []
    current_table = None

    for index, row in df.iterrows():
        # Check if we have a new table name
        table_name = row[0]
        if pd.notna(table_name) and table_name != current_table:
            # If we have a current table (not the first one), add a newline for separation
            if current_table:
                txt_content.append("\n")
            current_table = table_name
            txt_content.append(f"'{current_table}':\n\n")

        # Add column name and index
        column_name = row[2]
        column_index = row[1]
        txt_content.append(f"{column_name}{column_index}\n")

    # Write to the output .txt file
    with open(output_txt_path, 'w', encoding='utf-8') as txt_file:
        txt_file.writelines(txt_content)


# Example usage:
input_directory = r"C:\Users\梁智杰\Desktop\核对校验\1"
output_directory = r"C:\Users\梁智杰\Desktop\核对校验\1"
for file_name in os.listdir(input_directory):
    if file_name.endswith('.xlsx'):
        xlsx_path = os.path.join(input_directory, file_name)
        txt_path = os.path.join(
            output_directory, file_name.replace('.xlsx', '.txt'))
        xlsx_to_txt_final_fixed_v8(xlsx_path, txt_path)
