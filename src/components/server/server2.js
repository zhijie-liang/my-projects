const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'sj'
});

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.get('/api/companies', (req, res) => {
  let sqlList = 'SELECT * FROM Companies';
  let sqlCount = 'SELECT COUNT(*) AS total FROM Companies';
  
  db.query(sqlCount, (err, countResult) => {
    if(err) throw err;
    
    db.query(sqlList, (err, listResult) => {
      if(err) throw err;

      res.send({
        code: 200,
        message: "请求成功",
        result: {
          total: 1311,
          list: listResult
        },
        timestamp: new Date().getTime()
      });
    });
  });
});


app.listen('5000', () => {
  console.log('Server started on port 5000');
});
