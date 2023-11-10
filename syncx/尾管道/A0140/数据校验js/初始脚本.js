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
state.convertNullToStr = convertNullToStr;
state.hashcode = hashcode;
state.getUUID = getUUID;
state.convertToIP = convertToIP;
state.convertMapToStr = convertMapToStr;
state.convertMapToStr2 = convertMapToStr2;