var records = sdc.records;
var timestamp = new Date().getTime();
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.MAIL_SEND_ID = state.getUUID();
    records[i].value.FROM_DOMAIN = state.getEmailDomain(records[i].value.FROM_USER);
    records[i].value.TO_DOMAIN = state.getEmailDomain(records[i].value.TO_USER);
    records[i].value.CC_DOMAIN = state.getEmailDomain(records[i].value.CC_USER);
    records[i].value.BCC_DOMAIN = state.getEmailDomain(records[i].value.BCC_USER);
    records[i].value.ISO_TYPE = 'SMTP';
    records[i].value.DATA_LEVEL = '';
    records[i].value.CLASS_CODE_INDUSTRY = '';
    records[i].value.CLASS_CODE_SUBJECT = '';
    records[i].value.CLASS_CODE_AREA = '';
    records[i].value.SENSITIVE_FLAG = '';
    records[i].value.DATA_ELEMENT_CODE = '';
    records[i].value.SMTP_ID = records[i].value['OTHER_ID'];
    records[i].value.ATTACHMENT_DETAILS = state.generateFilePathsJSON(records[i].value['ATTACHMENT_DETAIL'], records[i].value['FILEPATH']);
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    // 封装data
    records[i].value.data = [];
    // 封装root
    var obj = {};
    obj.MAIL_SEND_ID = records[i].value['MAIL_SEND_ID'];
    obj.OTHER_ID = records[i].value['OTHER_ID'];
    obj.RECORD_TIME = records[i].value['RECORDTIME_SMTP'];
    obj.FROM_IP = records[i].value['FROM_IP'];
    obj.FROM_PORT = records[i].value['FROM_PORT'];
    obj.TARGET_IP = records[i].value['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['TARGET_PORT'];
    obj.FROM_USER = state.convertNullToStr(records[i].value['FROM_USER']);
    obj.TO_USER = state.convertNullToStr(records[i].value['TO_USER']);
    obj.CC_USER = state.convertNullToStr(records[i].value['CC_USER']);
    obj.BCC_USER = state.convertNullToStr(records[i].value['BCC_USER']);
    obj.FROM_DOMAIN = state.convertNullToStr(records[i].value['FROM_DOMAIN']);
    obj.TO_DOMAIN = state.convertNullToStr(records[i].value['TO_DOMAIN']);
    obj.CC_DOMAIN = state.convertNullToStr(records[i].value['CC_DOMAIN']);
    obj.BCC_DOMAIN = state.convertNullToStr(records[i].value['BCC_DOMAIN']);
    obj.ISO_TYPE = records[i].value['ISO_TYPE'];
    obj.CERTIFY_CATEGORY = records[i].value['CERTIFY_CATEGORY'];
    obj.MAIL_TOTAL_SIZE = records[i].value['MAIL_TOTAL_SIZE'];
    obj.MAIL_SUBJECT = state.convertNullToStr(records[i].value['MAIL_SUBJECT']);
    obj.CONTENT_DETAILS = state.convertNullToStr(records[i].value['CONTENT_DETAILS']);
    obj.ATTACHMENT_COUNT = records[i].value['ATTACHMENT_COUNT'];
    obj.ATTACHMENT_TOTAL_SIZE = records[i].value['ATTACHMENT_TOTAL_SIZE'];
    obj.ATTACHMENT_DETAILS = state.convertMapToStr(records[i].value['ATTACHMENT_DETAILS']);
    obj.SMTP_ID = records[i].value['SMTP_ID'];
    obj.SENDDATE = records[i].value['SENDDATE'];
    obj.REQ_TOTAL_COUNTS = records[i].value['REQ_TOTAL_COUNTS'];
    obj.RES_TOTAL_COUNTS = records[i].value['RES_TOTAL_COUNTS'];
    obj.REQ_BYTES = records[i].value['REQ_BYTES'];
    obj.RSP_BYTES = records[i].value['RSP_BYTES'];
    obj.REQ_PACKETS = records[i].value['REQ_PACKETS'];
    obj.RSP_PACKET = records[i].value['RSP_PACKET'];
    obj.RETRANS_REQKTS = records[i].value['RETRANS_REQKTS'];
    obj.RETRANS_REQBYTES = records[i].value['RETRANS_REQBYTES'];
    obj.RETRANS_PSPPKTS = records[i].value['RETRANS_PSPPKTS'];
    obj.RETRANS_PSPBYTES = records[i].value['RETRANS_PSPBYTES'];
    obj.REQ_TIME = records[i].value['REQ_TIME'];
    obj.RSP_TIME = records[i].value['RSP_TIME'];
    obj.RETRANS_REQBYTES = records[i].value['RETRANS_REQBYTES'];
    obj.RETRANS_PSPPKTS = records[i].value['RETRANS_PSPPKTS'];
    obj.RETRANS_PSPBYTES = records[i].value['RETRANS_PSPBYTES'];
    obj.REQ_TIME = records[i].value['REQ_TIME'];
    obj.APM_FLAG = state.convertNullToStr(records[i].value['APM_FLAG']);
    obj.SOURCE_TYPE = records[i].value['SOURCE_TYPE'];
    obj.DATA_LEVEL = records[i].value['DATA_LEVEL'];
    obj.CLASS_CODE_INDUSTRY = records[i].value['CLASS_CODE_INDUSTRY'];
    obj.CLASS_CODE_SUBJECT = records[i].value['CLASS_CODE_SUBJECT'];
    obj.CLASS_CODE_AREA = records[i].value['CLASS_CODE_AREA'];
    obj.SENSITIVE_FLAG = records[i].value['SENSITIVE_FLAG'];
    obj.DATA_ELEMENT_CODE = records[i].value['DATA_ELEMENT_CODE'];
    records[i].value.root = obj;
    // 封装payload
    var obj1 = {};
    obj1.count = 2;
    obj1.ts = timestamp;
    obj1.id = '654ae6227677ca438af3703f:origin';
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

// 初始脚本1： 参见A0100公共脚本
// 初始脚本2： 邮件字段获取函数脚本
function getEmailDomain(email) {
  // 首先判断字段是否为空
  if (email == null || email.trim() === "") {
    return null;
  }
  // 去除尖括号（< 和 >）
  email = email.replace(/<|>/g, "").trim();
  // 使用正则表达式查找@符号的位置和数量
  var atSymbolIndex = email.indexOf("@");
  var atSymbolCount = (email.match(/@/g) || []).length;

  // 如果只存在一个@符号，直接获取@后的全部
  if (atSymbolCount === 1) {
    return email.substring(atSymbolIndex + 1);
  }
  // 如果存在两个@符号，进行分割获取域名
  else if (atSymbolCount === 2) {
    var domainParts = email.split("@");
    if (domainParts.length === 3) {
      return domainParts[2];
    }
  }
  // 如果不符合上述条件，返回null或者自定义值，具体根据需求而定
  return null;
}

function generateFilePathsJSON(AttachmentDetails, FilePath) {
  if (!AttachmentDetails) {
    return [];
  }

  var files = AttachmentDetails.split(";").filter(function (item) {
    return item.startsWith("multipart_");
  });

  return JSON.stringify(
    files.map(function (item) {
      var startIndex = item.indexOf("(") + 1;
      var endIndex = item.lastIndexOf("(");
      var fileName = item.slice(10, endIndex);

      return FilePath + fileName;
    })
  );
}
state.generateFilePathsJSON = generateFilePathsJSON;
state.getEmailDomain = getEmailDomain;
