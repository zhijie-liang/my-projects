# 根据字典，批量将地图名文件改为adcode文件

import os

# 创建一个字典，将地图名映射到相应的代码
name_to_code_mapping = {
  "海口市": "460100",
  "三亚市": "460200",
  "三沙市": "460300",
  "儋州市": "460400",
  "五指山市": "469001",
  "琼海市": "469002",
  "文昌市": "469005",
  "万宁市": "469006",
  "东方市": "469007",
  "定安县": "469021",
  "屯昌县": "469022",
  "澄迈县": "469023",
  "临高县": "469024",
  "白沙黎族自治县": "469025",
  "昌江黎族自治县": "469026",
  "乐东黎族自治县": "469027",
  "陵水黎族自治县": "469028",
  "保亭黎族苗族自治县": "469029",
  "琼中黎族苗族自治县": "469030",
  "秀英区": "460105",
  "龙华区": "460106",
  "琼山区": "460107",
  "美兰区": "460108",
  "海棠区": "460202",
  "吉阳区": "460203",
  "天涯区": "460204",
  "崖州区": "460205",
  "西沙区": "460301",
  "南沙区": "460302",
  "西沙群岛": "460321",
  "南沙群岛": "460322",
  "中沙群岛的岛礁及其海域": "460323"
    # 其他映射...
}

# 指定多个文件夹路径
directories = [
    # r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\吉林\通化市\code",
    r"D:\梁智杰\BMDownload\海南\总kml\json"
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
