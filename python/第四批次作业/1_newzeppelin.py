import re

# Defining the file paths
# Replace with the actual path of 'zeppelin.js'
zeppelin_js_path = r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\129\原本\zeppelin.js'
# Replace with the desired path for 'newZeppelin.js'
new_zeppelin_js_path = r'C:\Users\梁智杰\Desktop\新建文件夹\my-projects\Zeppelin\129\原本\newZeppelin.js'

# Reading the original 'zeppelin.js' content
with open(zeppelin_js_path, 'r', encoding='utf-8') as file:
    zeppelin_js_content = file.read()

# Replacing patterns like "state.convertNullToStr(...)" and "... + ''" with direct value assignment
# Keeping comments intact
cleaned_content = re.sub(
    r'state\.convertNullToStr\((.*?)\)( \+ \'\')?;', r'\1;', zeppelin_js_content)
cleaned_content = re.sub(
    r'(obj\.[A-Z_]+) = (.*?)( \+ \'\');', r'\1 = \2;', cleaned_content)

# Saving the modified content to the new file 'newZeppelin.js'
with open(new_zeppelin_js_path, 'w', encoding='utf-8') as file:
    file.write(cleaned_content)
