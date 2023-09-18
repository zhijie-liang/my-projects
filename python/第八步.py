# 根据字典，批量将地图名文件改为adcode文件

import os

# 创建一个字典，将地图名映射到相应的代码
name_to_code_mapping = {
    "荔湾区": "440103",
    "越秀区": "440104",
    "海珠区": "440105",
    "天河区": "440106",
    "白云区": "440111",
    "黄埔区": "440112",
    "番禺区": "440113",
    "花都区": "440114",
    "南沙区": "440115",
    "从化区": "440117",
    "增城区": "440118",
    "武江区": "440203",
    "浈江区": "440204",
    "曲江区": "440205",
    "始兴县": "440222",
    "仁化县": "440224",
    "翁源县": "440229",
    "乳源瑶族自治县": "440232",
    "新丰县": "440233",
    "乐昌市": "440281",
    "南雄市": "440282",
    "罗湖区": "440303",
    "福田区": "440304",
    "南山区": "440305",
    "宝安区": "440306",
    "龙岗区": "440307",
    "盐田区": "440308",
    "龙华区": "440309",
    "坪山区": "440310",
    "光明区": "440311",
    "香洲区": "440402",
    "斗门区": "440403",
    "金湾区": "440404",
    "龙湖区": "440507",
    "金平区": "440511",
    "濠江区": "440512",
    "潮阳区": "440513",
    "潮南区": "440514",
    "澄海区": "440515",
    "南澳县": "440523",
    "禅城区": "440604",
    "南海区": "440605",
    "顺德区": "440606",
    "三水区": "440607",
    "高明区": "440608",
    "蓬江区": "440703",
    "江海区": "440704",
    "新会区": "440705",
    "台山市": "440781",
    "开平市": "440783",
    "鹤山市": "440784",
    "恩平市": "440785",
    "赤坎区": "440802",
    "霞山区": "440803",
    "坡头区": "440804",
    "麻章区": "440811",
    "遂溪县": "440823",
    "徐闻县": "440825",
    "廉江市": "440881",
    "雷州市": "440882",
    "吴川市": "440883",
    "茂南区": "440902",
    "电白区": "440904",
    "高州市": "440981",
    "化州市": "440982",
    "信宜市": "440983",
    "端州区": "441202",
    "鼎湖区": "441203",
    "高要区": "441204",
    "广宁县": "441223",
    "怀集县": "441224",
    "封开县": "441225",
    "德庆县": "441226",
    "四会市": "441284",
    "惠城区": "441302",
    "惠阳区": "441303",
    "博罗县": "441322",
    "惠东县": "441323",
    "龙门县": "441324",
    "梅江区": "441402",
    "梅县区": "441403",
    "大埔县": "441422",
    "丰顺县": "441423",
    "五华县": "441424",
    "平远县": "441426",
    "蕉岭县": "441427",
    "兴宁市": "441481",
    "城区": "441502",
    "海丰县": "441521",
    "陆河县": "441523",
    "陆丰市": "441581",
    "源城区": "441602",
    "紫金县": "441621",
    "龙川县": "441622",
    "连平县": "441623",
    "和平县": "441624",
    "东源县": "441625",
    "江城区": "441702",
    "阳东区": "441704",
    "阳西县": "441721",
    "阳春市": "441781",
    "清城区": "441802",
    "清新区": "441803",
    "佛冈县": "441821",
    "阳山县": "441823",
    "连山壮族瑶族自治县": "441825",
    "连南瑶族自治县": "441826",
    "英德市": "441881",
    "连州市": "441882",
    "湘桥区": "445102",
    "潮安区": "445103",
    "饶平县": "445122",
    "榕城区": "445202",
    "揭东区": "445203",
    "揭西县": "445222",
    "惠来县": "445224",
    "普宁市": "445281",
    "云城区": "445302",
    "云安区": "445303",
    "新兴县": "445321",
    "郁南县": "445322",
    "罗定市": "445381"
    # 其他映射...
}

# 指定多个文件夹路径
directories = [
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\东莞\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\云浮\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\佛山\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\惠州\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\揭阳\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\梅州\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\汕头\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\汕尾\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\江门\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\河源\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\清远\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\湛江\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\潮州\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\珠海\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\肇庆\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\茂名\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\阳江\code",
    r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\广东\韶关\code"
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
