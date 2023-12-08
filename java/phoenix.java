package java;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class phoenix {
    public static void main(String[] args) {
        // 替换为你的 Phoenix JDBC URL
        String url = "jdbc:phoenix:thin:url=http://172.20.16.25:8765;serialization=PROTOBUF";

        try {
            // 加载 JDBC 驱动类
            Class.forName("org.apache.phoenix.queryserver.client.Driver");

            // 建立连接
            try (Connection con = DriverManager.getConnection(url);
                    Statement stmt = con.createStatement()) {

                System.out.println("Connected to the database.");

                // 查询 LZJCS schema 中的所有表
                ResultSet rs = stmt.executeQuery(
                        "SELECT TABLE_NAME FROM SYSTEM.CATALOG WHERE TABLE_SCHEM = 'LZJCS' AND TABLE_TYPE = 'u'");
                List<String> tables = new ArrayList<>();
                while (rs.next()) {
                    tables.add(rs.getString(1));
                }

                // 检查查询到的表名
                System.out.println("Tables to be dropped: " + tables);

                // 为每张表执行 DROP TABLE
                for (String table : tables) {
                    String dropStatement = "DROP TABLE IF EXISTS LZJCS." + table;
                    System.out.println("Executing: " + dropStatement);
                    stmt.execute(dropStatement);
                }

                // 如果需要，提交事务
                con.commit();

                System.out.println("Tables dropped successfully.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
