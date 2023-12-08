import phoenixdb

# Phoenix 数据库连接信息
database_url = 'http://172.20.16.25:8765'
schema_name = 'lzjcs'

# 连接到 Phoenix
conn = phoenixdb.connect(database_url, autocommit=True)

try:
    cursor = conn.cursor()

    # 查询指定 schema 下的所有表
    cursor.execute(
        f"SELECT TABLE_NAME FROM SYSTEM.CATALOG WHERE TABLE_SCHEM = '{schema_name}' AND TABLE_TYPE = 'TABLE'")
    tables = cursor.fetchall()

    # 为每个表生成并执行 DROP TABLE 语句
    for table in tables:
        drop_statement = f"DROP TABLE IF EXISTS {schema_name}.{table[0]}"
        print(f"Executing: {drop_statement}")
        cursor.execute(drop_statement)

    print(f"All tables in schema '{schema_name}' have been dropped.")
finally:
    conn.close()
