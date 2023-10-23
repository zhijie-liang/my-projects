# 根据字典，批量将地图名文件改为adcode文件

import os

# 创建一个字典，将地图名映射到相应的代码
name_to_code_mapping = {
    "成都市": "510100",
    "自贡市": "510300",
    "攀枝花市": "510400",
    "泸州市": "510500",
    "德阳市": "510600",
    "绵阳市": "510700",
    "广元市": "510800",
    "遂宁市": "510900",
    "内江市": "511000",
    "乐山市": "511100",
    "南充市": "511300",
    "眉山市": "511400",
    "宜宾市": "511500",
    "广安市": "511600",
    "达州市": "511700",
    "雅安市": "511800",
    "巴中市": "511900",
    "资阳市": "512000",
    "阿坝藏族羌族自治州": "513200",
    "甘孜藏族自治州": "513300",
    "凉山彝族自治州": "513400",
    "锦江区": "510104",
    "青羊区": "510105",
    "金牛区": "510106",
    "武侯区": "510107",
    "成华区": "510108",
    "龙泉驿区": "510112",
    "青白江区": "510113",
    "新都区": "510114",
    "温江区": "510115",
    "双流区": "510116",
    "郫都区": "510117",
    "新津区": "510118",
    "金堂县": "510121",
    "大邑县": "510129",
    "蒲江县": "510131",
    "都江堰市": "510181",
    "彭州市": "510182",
    "邛崃市": "510183",
    "崇州市": "510184",
    "简阳市": "510185",
    "自流井区": "510302",
    "贡井区": "510303",
    "大安区": "510304",
    "沿滩区": "510311",
    "荣县": "510321",
    "富顺县": "510322",
    "东区": "510402",
    "西区": "510403",
    "仁和区": "510411",
    "米易县": "510421",
    "盐边县": "510422",
    "江阳区": "510502",
    "纳溪区": "510503",
    "龙马潭区": "510504",
    "泸县": "510521",
    "合江县": "510522",
    "叙永县": "510524",
    "古蔺县": "510525",
    "旌阳区": "510603",
    "罗江区": "510604",
    "中江县": "510623",
    "广汉市": "510681",
    "什邡市": "510682",
    "绵竹市": "510683",
    "涪城区": "510703",
    "游仙区": "510704",
    "安州区": "510705",
    "三台县": "510722",
    "盐亭县": "510723",
    "梓潼县": "510725",
    "北川羌族自治县": "510726",
    "平武县": "510727",
    "江油市": "510781",
    "利州区": "510802",
    "昭化区": "510811",
    "朝天区": "510812",
    "旺苍县": "510821",
    "青川县": "510822",
    "剑阁县": "510823",
    "苍溪县": "510824",
    "船山区": "510903",
    "安居区": "510904",
    "蓬溪县": "510921",
    "大英县": "510923",
    "射洪市": "510981",
    "市中区": "511102",
    "东兴区": "511011",
    "威远县": "511024",
    "资中县": "511025",
    "隆昌市": "511083",
    "沙湾区": "511111",
    "五通桥区": "511112",
    "金口河区": "511113",
    "犍为县": "511123",
    "井研县": "511124",
    "夹江县": "511126",
    "沐川县": "511129",
    "峨边彝族自治县": "511132",
    "马边彝族自治县": "511133",
    "峨眉山市": "511181",
    "顺庆区": "511302",
    "高坪区": "511303",
    "嘉陵区": "511304",
    "南部县": "511321",
    "营山县": "511322",
    "蓬安县": "511323",
    "仪陇县": "511324",
    "西充县": "511325",
    "阆中市": "511381",
    "东坡区": "511402",
    "彭山区": "511403",
    "仁寿县": "511421",
    "洪雅县": "511423",
    "丹棱县": "511424",
    "青神县": "511425",
    "翠屏区": "511502",
    "南溪区": "511503",
    "叙州区": "511504",
    "江安县": "511523",
    "长宁县": "511524",
    "高县": "511525",
    "珙县": "511526",
    "筠连县": "511527",
    "兴文县": "511528",
    "屏山县": "511529",
    "广安区": "511602",
    "前锋区": "511603",
    "岳池县": "511621",
    "武胜县": "511622",
    "邻水县": "511623",
    "华蓥市": "511681",
    "通川区": "511702",
    "达川区": "511703",
    "宣汉县": "511722",
    "开江县": "511723",
    "大竹县": "511724",
    "渠县": "511725",
    "万源市": "511781",
    "雨城区": "511802",
    "名山区": "511803",
    "荥经县": "511822",
    "汉源县": "511823",
    "石棉县": "511824",
    "天全县": "511825",
    "芦山县": "511826",
    "宝兴县": "511827",
    "巴州区": "511902",
    "恩阳区": "511903",
    "通江县": "511921",
    "南江县": "511922",
    "平昌县": "511923",
    "雁江区": "512002",
    "安岳县": "512021",
    "乐至县": "512022",
    "马尔康市": "513201",
    "汶川县": "513221",
    "理县": "513222",
    "茂县": "513223",
    "松潘县": "513224",
    "九寨沟县": "513225",
    "金川县": "513226",
    "小金县": "513227",
    "黑水县": "513228",
    "壤塘县": "513230",
    "阿坝县": "513231",
    "若尔盖县": "513232",
    "红原县": "513233",
    "康定市": "513301",
    "泸定县": "513322",
    "丹巴县": "513323",
    "九龙县": "513324",
    "雅江县": "513325",
    "道孚县": "513326",
    "炉霍县": "513327",
    "甘孜县": "513328",
    "新龙县": "513329",
    "德格县": "513330",
    "白玉县": "513331",
    "石渠县": "513332",
    "色达县": "513333",
    "理塘县": "513334",
    "巴塘县": "513335",
    "乡城县": "513336",
    "稻城县": "513337",
    "得荣县": "513338",
    "西昌市": "513401",
    "木里藏族自治县": "513422",
    "盐源县": "513423",
    "德昌县": "513424",
    "会理市": "513425",
    "会东县": "513426",
    "宁南县": "513427",
    "普格县": "513428",
    "布拖县": "513429",
    "金阳县": "513430",
    "昭觉县": "513431",
    "喜德县": "513432",
    "冕宁县": "513433",
    "越西县": "513434",
    "甘洛县": "513435",
    "美姑县": "513436",
    "雷波县": "513437"
    # 其他映射...
}

# 指定多个文件夹路径
directories = [
    # r"C:\Users\梁智杰\Desktop\新建文件夹\my-projects\src\components\map\行政区划级联数据(含乡镇街道)\and\吉林\通化市\code",
    r"D:\梁智杰\BMDownload\四川\总kml\json"
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
