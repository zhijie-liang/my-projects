var records = sdc.records;
var timestamp = new Date().getTime();
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.WEB_PAGE_ID = state.getUUID();
    records[i].value.RES_DETAIL = state.getStatusDescription(records[i].value['RES_STATUS']);
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    var reqbody = records[i].value.REQ_BODY;
    var rspbody = records[i].value.RSP_BODY;
    if (reqbody === null) {
      records[i].value.REQ_BODY = reqbody;
    } else {
      records[i].value.REQ_BODY = decodeURIComponent(reqbody).replace(/\+/g, " ");
    }
    if (rspbody === null) {
      records[i].value.RSP_BODY = rspbody;
    } else {
      records[i].value.RSP_BODY = decodeURIComponent(rspbody).replace(/\+/g, " ");
    }
    // 封装data
    records[i].value.data = [];
    // 封装root
    var obj = {};
    obj.WEB_PAGE_ID = records[i].value['WEB_PAGE_ID'];
    obj.RECORD_TIME = records[i].value['RECORDTIME_HTTPPAGEVIEW'];
    obj.FROM_IP = records[i].value['FROM_IP'];
    obj.FROM_PORT = records[i].value['FROM_PORT'];
    obj.TARGET_IP = records[i].value['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['TARGET_PORT'];
    obj.HTTP_TYPE = records[i].value['HTTP_TYPE'];
    obj.URL = records[i].value['URL'];
    obj.HTTP_VERSION = records[i].value['HTTP_VERSION'];
    obj.RES_STATUS = records[i].value['RES_STATUS'];
    obj.RES_DETAIL = records[i].value['RES_DETAIL'];
    obj.REQ_TIME = records[i].value['REQ_TIME'];
    obj.RSP_TIME = records[i].value['RSP_TIME'];
    obj.PAGE_TIME = records[i].value['PAGE_TIME'];
    obj.LOAD_TIME = records[i].value['LOAD_TIME'];
    obj.CLIENT_OS = records[i].value['CLIENT_OS'];
    obj.CLIENT_EXPLORER = records[i].value['CLIENT_EXPLORER'];
    obj.CLIENT_DEVICE = records[i].value['CLIENT_DEVICE'];
    obj.REQ_BODY = state.convertNullToStr(records[i].value['REQ_BODY']);
    obj.RSP_BODY = state.convertNullToStr(records[i].value['RSP_BODY']);
    obj.REQ_COUNT = records[i].value['REQ_COUNT'];
    obj.REQ_BYTES = records[i].value['REQ_BYTES'];
    obj.RSP_BYTES = records[i].value['RSP_BYTES'];
    obj.PAGE_ID = records[i].value['PAGE_ID'];
    obj.APM_FLAG = state.convertNullToStr(records[i].value['APM_FLAG']);
    obj.SOURCE_TYPE = records[i].value['SOURCE_TYPE'];
    records[i].value.root = obj;
    // 封装payload
    var obj1 = {};
    obj1.count = 3;
    obj1.ts = timestamp;
    obj1.id = '6549f1467677ca438af37032:origin';
    var dataStr = state.convertMapToStr(records[i].value['data']);
    obj1.data_hash = state.hashcode(dataStr) + '';
    var rootS = state.convertMapToStr2(records[i].value['root']);
    var rootStr = state.convertLowercaseUnicodeToUppercase(rootS);
    records[i].value.rootStr = rootStr;
    obj1.root_hash = state.hashcode(rootStr) + '';
    records[i].value.payload = obj1;
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}

// 初始脚本： 封装主脚本初始脚本函数
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

function getStatusDescription(statusCode) {
  switch (statusCode) {
    case 0:
      return "Request Not Initialized/请求未初始化";
    case 100:
      return "Continue/请继续";
    case 101:
      return "Switching Protocols/切换协议";
    case 200:
      return "OK/请求成功";
    case 201:
      return "Created/已创建";
    case 202:
      return "Accepted/服务器已接受请求,但尚未处理";
    case 203:
      return "Non-Authoritative Information/非权威信息";
    case 204:
      return "No Content/无响应内容";
    case 205:
      return "Reset Content/重置内容";
    case 206:
      return "Partial Content/部分内容";
    case 300:
      return "Multiple Choices/多个选择";
    case 301:
      return "Moved Permanently/被请求的资源已永久移动到新位置";
    case 302:
      return "Found";
    case 303:
      return "See Other/对应当前请求的响应可以在另一个 URI 上被找到";
    case 304:
      return "Not Modified/无改变";
    case 305:
      return "Use Proxy/被请求的资源必须通过指定的代理才能被访问";
    case 307:
      return "Temporary Redirect/临时重定向";
    case 400:
      return "Bad Request/请求错误";
    case 401:
      return "Unauthorized/未经授权";
    case 402:
      return "Payment Required/为将来可能的需求而预留";
    case 403:
      return "Forbidden/禁止请求";
    case 404:
      return "Not Found/请求失败";
    case 405:
      return "Method Not Allowed/请求方法不能被用于请求相应的资源";
    case 406:
      return "Not Acceptable/请求的资源的内容特性无法满足请求头中的条件,因而无法生成响应实体";
    case 407:
      return "Proxy Authentication Required/需要代理认证";
    case 408:
      return "Request Timeout/请求超时";
    case 409:
      return "Conflict/冲突";
    case 410:
      return "Gone/被请求的资源在服务器上已经不再可用";
    case 411:
      return "Length Required/服务器拒绝在没有定义 Content-Length 头的情况下接受请求";
    case 412:
      return "Precondition Failed/服务器在验证在请求的头字段中给出先决条件时,没能满足其中的一个或多个";
    case 413:
      return "Request Entity Too Large/请求提交的实体数据大小超过了服务器愿意或者能够处理的范围";
    case 414:
      return "Request-URI Too Long/请求的URI 长度超过了服务器能够解释的长度";
    case 415:
      return "Unsupported Media Type/请求中提交的实体并不是服务器中所支持的格式";
    case 416:
      return "Requested Range Not Satisfiable/Range请求头不能满足";
    case 417:
      return "Expectation Failed/请求头 Expect 中指定的预期内容无法被服务器满足";
    case 421:
      return "too many connections/连接过多";
    case 422:
      return "Unprocessable Entity/请求格式正确,但是由于含有语义错误,无法响应";
    case 423:
      return "RLocked/当前资源被锁定";
    case 424:
      return "Failed Dependency/之前的某个请求发生的错误,导致当前请求失败";
    case 500:
      return "Internal Server Error/服务器内部错误";
    case 501:
      return "Not Implemented/服务器不支持当前请求";
    default:
      return "Unknown StatusCode";
  }
}

// 封装计算时间差的函数
function getTimeDifference(timestamp1, timestamp2) {
  // 将时间戳转换为Date对象
  var date1 = new Date(timestamp1 / 1000);
  var date2 = new Date(timestamp2 / 1000);
  return date1 - date2;
}
state.getStatusDescription = getStatusDescription;
state.getTimeDifference = getTimeDifference;
state.convertNullToStr = convertNullToStr;
state.hashcode = hashcode;
state.getUUID = getUUID;
state.convertToIP = convertToIP;
state.convertMapToStr = convertMapToStr;
state.convertMapToStr2 = convertMapToStr2;
