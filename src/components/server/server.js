const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// 创建 MySQL 数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'sj'
});

// 创建 Express 应用实例
const app = express();

// 配置 CORS 响应头
app.use(cors());

// 处理 /data GET 请求，并返回 JSON 格式数据
app.get('/data', function(req, res) {
  // 从数据库查询数据
  pool.query('SELECT * FROM sj ORDER BY value', function(error, results, fields) {
    if (error) throw error;

    // 将查询结果转换为 JSON 格式数据，并发送给客户端
    res.json(results);
  });
});

// 监听端口号并启动服务器
app.listen(3000, function() { 
  console.log('Server is running on port 3000!');
});