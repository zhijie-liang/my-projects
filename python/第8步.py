# 根据字典，批量将地图名文件改为adcode文件

import os

# 创建一个字典，将地图名映射到相应的代码
name_to_code_mapping = {
    "万州区": "500101",
    "涪陵区": "500102",
    "渝中区": "500103",
    "大渡口区": "500104",
    "江北区": "500105",
    "沙坪坝区": "500106",
    "九龙坡区": "500107",
    "南岸区": "500108",
    "北碚区": "500109",
    "綦江区": "500110",
    "大足区": "500111",
    "渝北区": "500112",
    "巴南区": "500113",
    "黔江区": "500114",
    "长寿区": "500115",
    "江津区": "500116",
    "合川区": "500117",
    "永川区": "500118",
    "南川区": "500119",
    "璧山区": "500120",
    "铜梁区": "500151",
    "潼南区": "500152",
    "荣昌区": "500153",
    "开州区": "500154",
    "梁平区": "500155",
    "城口县": "500229",
    "丰都县": "500230",
    "垫江县": "500231",
    "武隆区": "500156",
    "忠县": "500233",
    "云阳县": "500235",
    "奉节县": "500236",
    "巫山县": "500237",
    "巫溪县": "500238",
    "石柱土家族自治县": "500240",
    "秀山土家族苗族自治县": "500241",
    "酉阳土家族苗族自治县": "500242",
    "彭水苗族土家族自治县": "500243"
    # 其他映射...
}

# 指定多个文件夹路径
directories = [
    # r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\吉林\吉林市\code",
    # r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\吉林\四平市\code",
    # r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\吉林\延边朝鲜族自治州\code",
    # r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\吉林\松原市\code",
    # r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\吉林\白城市\code",
    # r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\吉林\白山市\code",
    # r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\吉林\辽源市\code",
    # r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\吉林\通化市\code",
    r"D:\梁智杰\BMDownload\重庆\总kml\json"
    # 添加更多目录...
]

for directory in directories:
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            # 提取地图名（去掉.json后缀）
            map_name = filename[:-5]

            # 获取新的代码
            code = name_to_code_mapping.get(map_name)

            if code:
                # 构造新的文件名
                new_filename = f"{code}.json"

                # 获取完整的原文件和新文件路径
                old_filepath = os.path.join(directory, filename)
                new_filepath = os.path.join(directory, new_filename)

                # 重命名文件
                os.rename(old_filepath, new_filepath)
            else:
                print(f"未找到 '{map_name}' 的映射代码")
