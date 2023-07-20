const express = require('express');
const XLSX = require('xlsx');
const app = express();
const port = 7000;

app.get('/export', (req, res) => {
  let data = [
    ["序号", "ID", "公司名", "创始人", "类别", "公司排名变化", "年份", "国家", "投资人", "市值", "退出原因"],
    ...tableData.map((item, index) => [
      index + 1,
      item.ID,
      item.NAME,
      item.FOUNDERS,
      item.HLW_CATE_NAME,
      item.RANK_CHANGE,
      item.YEAR,
      item.COUNTRY,
      item.INVERSTORS,
      item.VALUATION,
      item.QUIT_REASON,
    ]),
  ];
  

  let worksheet = XLSX.utils.aoa_to_sheet(data);
  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write workbook to a buffer
  let buffer = XLSX.write(workbook, {bookType:'xlsx', type:'buffer'});

  // Set headers
  res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  // Send the buffer
  res.send(buffer);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
