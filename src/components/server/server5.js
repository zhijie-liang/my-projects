const axios = require('axios');
const fs = require("fs");
const colors = require('colors');






function getData(code="100000_full"){
  axios.get("https://geo.datav.aliyun.com/areas_v3/bound/"+code+".json").then(res=>{
    console.log('=========== 数据读取成功 ==========='.yellow);
    console.log(res.data);
    console.log('========== ============= =========='.yellow);

    /* -------------   生成json文件    --------------*/
    const writerStream = fs.createWriteStream("C:/Users/梁智杰/Pictures/Saved Pictures/"+parseInt(code)+'.json');
    writerStream.write(JSON.stringify(res.data));
    writerStream.end();

    // 文件处理流事件：data, end, and error
    writerStream.on('finish', function () {
      console.log('<<<------------------------------- 写入完成 ------------------------------->>>\n'.green);
    });
    writerStream.on('error', function (err) {
      console.log('<<<------------------------------- 写入错误 ------------------------------->>>\n'.red);
    });

    // 下钻子项
    if(res.data.features.length>1){
      res.data.features.map(item => {
        if(item.properties.childrenNum){
          getData(item.properties.adcode+"_full")
        }else{
          getData(item.properties.adcode)
        }
      })
    }
  }).catch(err=>{
    console.log('========== 数据读取错误 =========='.red);
  })
};
getData();



// function throttled(fn, delay = 800) {
//   let timer = null;
//   return function (...args) {
//     if (!timer) {
//       timer = setTimeout(() => {
//         fn.apply(this, args)
//         timer = null
//       }, delay);
//     }
//   }
// }
