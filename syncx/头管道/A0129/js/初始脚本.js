function convertToIP(numString) {
  if (numString === null || isNaN(numString)) {
    return null;
  }
  // 将数字串转换为4个段的数组
  var segments = [
    (numString >> 24) & 255, // 第一段，左移24位并取低8位
    (numString >> 16) & 255, // 第二段，左移16位并取低8位
    (numString >> 8) & 255,  // 第三段，左移8位并取低8位
    numString & 255          // 第四段，不变
  ];
  // 将4个段的值连接成IP格式
  var ip = segments.join('.');
  return ip;
}

function getUUID() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23];
  var uuid = s.join("");
  return uuid;
}

function convertMapToStr(obj) {
  if (obj === null) {
    return null;
  }
  var jsonStr = JSON.stringify(obj);
  return jsonStr;
}

function convertMapToStr2(obj) {
  if (obj === null) {
    return null;
  }
  var sortObj = {};
  Object.keys(obj).sort().forEach(function (item) {
    var value = obj[item];
    sortObj[item] = value;
  });
  var jsonStr = JSON.stringify(sortObj);
  return jsonStr;
}

function hashcode(strKey) {
  var hash = 0;
  var MAX_VALUE = 0x7fffffff;
  var MIN_VALUE = -0x80000000;
  for (var i = 0; i < strKey.length; i++) {
    hash = hash * 31 + strKey.charCodeAt(i);
    if (hash > MAX_VALUE || hash < MIN_VALUE) {
      hash &= 0xFFFFFFFF;
    }
  }
  return hash;
}

function convertNullToStr(str) {
  if (str === null) {
    return '';
  }
  return str;
}

function convertNullToInt(str) {
  if (str === null) {
    return 0;
  }
  return str;
}

// 定义ftp状态函数
function getFtpStatus(statusCode) {
  switch (statusCode) {
    case "0":
      return "110";
    case "1":
      return "120";
    case "2":
      return "125";
    case "3":
      return "150";
    case "4":
      return "200";
    case "5":
      return "202";
    case "6":
      return "211";
    case "7":
      return "212";
    case "8":
      return "213";
    case "9":
      return "214";
    case "10":
      return "215";
    case "11":
      return "220";
    case "12":
      return "221";
    case "13":
      return "225";
    case "14":
      return "226";
    case "15":
      return "227";
    case "16":
      return "228";
    case "17":
      return "229";
    case "18":
      return "230";
    case "19":
      return "250";
    case "20":
      return "257";
    case "21":
      return "331";
    case "22":
      return "332";
    case "23":
      return "350";
    case "24":
      return "421";
    case "25":
      return "425";
    case "26":
      return "426";
    case "27":
      return "450";
    case "28":
      return "451";
    case "29":
      return "452";
    case "30":
      return "500";
    case "31":
      return "501";
    case "32":
      return "502";
    case "33":
      return "503";
    case "34":
      return "504";
    case "35":
      return "530";
    case "36":
      return "532";
    case "37":
      return "550";
    case "38":
      return "551";
    case "39":
      return "552";
    case "40":
      return "553";
    default:
      return "Unknown StatusCode";
  }
}

// 定义ftp状态描述函数
function getStatusDescription(statusCode) {
  switch (statusCode) {
    case "110":
      return "Restart marker reply/重新启动标记答复";
    case "120":
      return "Service ready in nnn minutes/服务已就绪,在nnn分钟后开始";
    case "125":
      return "Data connection already open; transfer starting/数据连接已打开,正在开始传输";
    case "150":
      return "File status okay; about to open data connection/文件状态正常,准备打开数据连接";
    case "200":
      return "OK/命令确定";
    case "202":
      return "Command not implemented, superfluous at this site/未执行命令,站点上的命令过多";
    case "211":
      return "System status, or system help reply/系统状态,或系统帮助答复";
    case "212":
      return "Directory status/目录状态";
    case "213":
      return "File status/文件状态";
    case "214":
      return "Help message/帮助消息";
    case "215":
      return "NAME system type/NAME系统类型";
    case "220":
      return "Service ready for new user/服务就绪,可以执行新用户的请求";
    case "221":
      return "Service closing control connection/服务关闭控制连接";
    case "225":
      return "Data connection open; no transfer in progress/数据连接打开,没有进行中的传输";
    case "226":
      return "Closing data connection/关闭数据连接";
    case "227":
      return "Entering Passive Mode <h1,h2,h3,h4,p1,p2>/进入被动模式(h1,h2,h3,h4,p1,p2)";
    case 228:
      return "Entering Long Passive Mode/进入长时间被动模式";
    case "229":
      return "Extended Passive Mode Entered/进入扩展被动模式";
    case "230":
      return "User logged in, proceed/户已登录，继续进行";
    case "250":
      return "Requested file action okay, completed/请求的文件操作正确,已完成";
    case "257":
      return "PATHNAME created/已创建PATHNAME";
    case "331":
      return "User name okay, need password/用户名正确,需要密码";
    case "332":
      return "Need account for login/需要登录帐户";
    case "350":
      return "Requested file action pending further information/请求的文件操作正在等待进一步的信息";
    case "421":
      return "Service not available, closing control connection/服务不可用,正在关闭控制连接";
    case "425":
      return "Can't open data connection/无法打开数据连接";
    case "426":
      return "Connection closed; transfer aborted/连接被关闭,数据传输中断";
    case "450":
      return "Requested file action not taken/未执行请求的文件操作,文件不可用";
    case "451":
      return "Requested action aborted. Local error in processing/请求的操作异常终止:正在处理本地错误";
    case "452":
      return "Requested action not taken/未执行请求的操作,系统存储空间不够";
    case "500":
      return "Syntax error, command unrecognized/语法错误，命令无法识别";
    case "501":
      return "Syntax error in parameters or arguments/在参数中有语法错误";
    case "502":
      return "Command not implemented/未执行命令";
    case "503":
      return "Bad sequence of commands/错误的命令序列";
    case "504":
      return "Command not implemented for that parameter/未执行该参数的命令";
    case "530":
      return "Not logged in/未登录";
    case "532":
      return "Need account for storing files/存储文件需要帐户";
    case "550":
      return "Requested action not taken/未执行请求的操作,文件不可用";
    case "551":
      return "Requested action aborted. Page type unknown/请求的操作异常终止:未知的页面类型";
    case "552":
      return "Requested file action aborted/请求的文件操作异常终止:超出存储分配(对于当前目录或数据集)";
    case "553":
      return "Requested action not taken/未执行请求的操作,不允许的文件名";
    default:
      return "Unknown StatusCode";
  }
}

// 封装计算时间差的函数
function getTimeDifference(timestamp1, timestamp2) {
  // 将时间戳转换为Date对象
  var date1 = new Date(timestamp1 / 1000);
  var date2 = new Date(timestamp2 / 1000);
  return date2 - date1;
}

function convertToIP(numString) {
  if (numString === null || isNaN(numString)) {
    return null;
  }
  // 将数字串转换为4个段的数组
  var segments = [
    (numString >> 24) & 255, // 第一段，左移24位并取低8位
    (numString >> 16) & 255, // 第二段，左移16位并取低8位
    (numString >> 8) & 255,  // 第三段，左移8位并取低8位
    numString & 255          // 第四段，不变
  ];

  // 将4个段的值连接成IP格式
  var ip = segments.join('.');

  return ip;
}

// 第十二个脚本：转义字符转大写
function convertLowercaseUnicodeToUppercase(inputString) {
  // 使用正则表达式匹配`\u`后的四位字符
  var regex = /\\u[a-f0-9]{4}/g;

  // 使用replace方法将匹配到的字符进行转换
  var resultString = inputString.replace(regex, function (match) {
    // 将匹配到的字符转换为大写
    return match.toUpperCase().replace(/\\U/g, '\\u');
  });

  return resultString;
}
state.convertLowercaseUnicodeToUppercase = convertLowercaseUnicodeToUppercase;
state.convertNullToStr = convertNullToStr;
state.convertNullToInt = convertNullToInt;
state.hashcode = hashcode;
state.getUUID = getUUID;
state.convertToIP = convertToIP;
state.convertMapToStr = convertMapToStr;
state.convertMapToStr2 = convertMapToStr2;
state.getFtpStatus = getFtpStatus;
state.getStatusDescription = getStatusDescription;
state.getTimeDifference = getTimeDifference;
state.convertToIP = convertToIP;