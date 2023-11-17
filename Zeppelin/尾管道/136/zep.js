var records = sdc.records;
var timestamp = new Date().getTime();
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.flag = 'T';
    // payload转换
    var payobj = {};
    payobj.count = records[i].value['payload']['count'];
    payobj.ts = records[i].value['payload']['ts'];
    payobj.id = records[i].value['payload']['id'];
    payobj.data_hash = records[i].value['payload']['data_hash'];
    payobj.root_hash = records[i].value['payload']['root_hash'];
    // data转换
    var dataArr = [];
    dataArr[0] = records[i].value['data'][0];
    dataArr[1] = records[i].value['data'][1];
    // root转换
    var obj = {};
    obj.MAIL_RECEIVE_ITEM_ID = records[i].value['root']['MAIL_RECEIVE_ITEM_ID'];
    obj.RECORD_TIME = records[i].value['root']['RECORD_TIME'];
    obj.OTHER_ID = records[i].value['root']['OTHER_ID'];
    obj.FROM_IP = records[i].value['root']['FROM_IP'];
    obj.FROM_PORT = records[i].value['root']['FROM_PORT'];
    obj.TARGET_IP = records[i].value['root']['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['root']['TARGET_PORT'];
    obj.FROM_USER = state.convertNullToStr(records[i].value['root']['FROM_USER']);
    obj.TO_USER = state.convertNullToStr(records[i].value['root']['TO_USER']);
    obj.CC_USER = state.convertNullToStr(records[i].value['root']['CC_USER']);
    obj.BCC_USER = state.convertNullToStr(records[i].value['root']['BCC_USER']);
    obj.FROM_DOMAIN = state.convertNullToStr(records[i].value['root']['FROM_DOMAIN']);
    obj.TO_DOMAIN = state.convertNullToStr(records[i].value['root']['TO_DOMAIN']);
    obj.CC_DOMAIN = state.convertNullToStr(records[i].value['root']['CC_DOMAIN']);
    obj.BCC_DOMAIN = state.convertNullToStr(records[i].value['root']['BCC_DOMAIN']);
    obj.ISO_TYPE = records[i].value['root']['ISO_TYPE'];
    obj.CERTIFY_CATEGORY = records[i].value['root']['CERTIFY_CATEGORY'];
    obj.MAIL_SUBJECT = state.convertNullToStr(records[i].value['root']['MAIL_SUBJECT']);
    obj.CONTENT_DETAILS = state.convertNullToStr(records[i].value['root']['CONTENT_DETAILS']);
    obj.ATTACHMENT_DETAILS = state.convertNullToStr(records[i].value['root']['ATTACHMENT_DETAILS']);
    obj.ATTACHMENT_TOTAL_SIZE = records[i].value['root']['ATTACHMENT_TOTAL_SIZE'];
    obj.EMAI_ID = records[i].value['root']['EMAI_ID'];
    obj.RECEIVE_STATUS = records[i].value['root']['RECEIVE_STATUS'];
    obj.FAILED_CODE = state.convertNullToStr(records[i].value['root']['FAILED_CODE']);
    obj.SEND_DATE = records[i].value['root']['SEND_DATE'];
    obj.RECEIVE_DATE = records[i].value['root']['RECEIVE_DATE'];
    obj.SESSION_ID = records[i].value['root']['SESSION_ID'];
    obj.REQ_BYTES = records[i].value['root']['REQ_BYTES'];
    obj.RSP_BYTES = records[i].value['root']['RSP_BYTES'];
    obj.REQ_PACKETS = records[i].value['root']['REQ_PACKETS'];
    obj.RSP_PACKET = records[i].value['root']['RSP_PACKET'];
    obj.RETRANS_REQKTS = records[i].value['root']['RETRANS_REQKTS'];
    obj.RETRANS_REQBYTES = records[i].value['root']['RETRANS_REQBYTES'];
    obj.RETRANS_PSPPKTS = records[i].value['root']['RETRANS_PSPPKTS'];
    obj.RETRANS_PSPBYTES = records[i].value['root']['RETRANS_PSPBYTES'];
    obj.REQ_TIME = records[i].value['root']['REQ_TIME'];
    obj.RSP_TIME = records[i].value['root']['RSP_TIME'];
    obj.APM_FLAG = state.convertNullToStr(records[i].value['root']['APM_FLAG']);
    obj.SOURCE_TYPE = records[i].value['root']['SOURCE_TYPE'];
    obj.DATA_LEVEL = records[i].value['root']['DATA_LEVEL'];
    obj.CLASS_CODE_INDUSTRY = records[i].value['root']['CLASS_CODE_INDUSTRY'];
    obj.CLASS_CODE_SUBJECT = records[i].value['root']['CLASS_CODE_SUBJECT'];
    obj.CLASS_CODE_AREA = records[i].value['root']['CLASS_CODE_AREA'];
    obj.SENSITIVE_FLAG = records[i].value['root']['SENSITIVE_FLAG'];
    obj.DATA_ELEMENT_CODE = records[i].value['root']['DATA_ELEMENT_CODE'];
    // 封装错误数据
    var objF = {};
    objF.payload = payobj;
    objF.data = dataArr;
    objF.root = obj;
    var originData = state.convertMapToStr(objF);
    // 校验count
    var count = records[i].value['payload']['count'];
    if (count != 0) {
      records[i].value.flag = 'F'
      records[i].value.err_msg = '缺少字段补充节点';
      records[i].value.app_name = 'end';
      records[i].value.err_code = '500001';
      records[i].value.source_name = 'DSSP_MAIL_RECEIVE_ITEM';
      records[i].value.ts = timestamp;
      records[i].value.data = originData;
      sdc.output.write(records[i]);
      continue;
    }
    // 校验data
    var data_hash = records[i].value['payload']['data_hash'];
    var dataStr = state.convertMapToStr(dataArr);
    var datahash = state.hashcode(dataStr) + '';
    if (datahash != data_hash) {
      records[i].value.flag = 'F'
      records[i].value.err_msg = 'data校验hash值不一致';
      records[i].value.app_name = 'end';
      records[i].value.err_code = '200002';
      records[i].value.source_name = 'DSSP_MAIL_RECEIVE_ITEM';
      records[i].value.ts = timestamp;
      records[i].value.data = originData;
      sdc.output.write(records[i]);
      continue;
    }
    // 校验root
    var root_hash = records[i].value['payload']['root_hash'];
    var rootS = state.convertMapToStr2(obj);
    var rootStr = state.convertLowercaseUnicodeToUppercase(rootS);
    var roothash = state.hashcode(rootStr) + '';
    if (roothash != root_hash) {
      records[i].value.flag = 'F'
      records[i].value.err_msg = 'root校验hash值不一致';
      records[i].value.app_name = 'end';
      records[i].value.err_code = '200001';
      records[i].value.source_name = 'DSSP_MAIL_RECEIVE_ITEM';
      records[i].value.ts = timestamp;
      records[i].value.data = originData;
      sdc.output.write(records[i]);
      continue;
    }
    records[i].value.dataArr = dataArr;
    records[i].value.obj = obj;
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}
// 第二个主脚本：封装业务表数据js
var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    // 拆分字段  
    var newRecord = sdc.createRecord(records[i].sourceId + ':newRecordId');
    newRecord.value = records[i].value['obj'];
    newRecord.value.RECORD_TIME_ITEM = newRecord.value['RECORD_TIME'];
    // 地域ID
    var region = state.convertStrToMap(records[i].value['dataArr'][0]);
    newRecord.value.FROM_REGION_ID = region['FROM_REGION_ID'];
    newRecord.value.TARGET_REGION_ID = region['TARGET_REGION_ID'];
    // mac 
    var mac = state.convertStrToMap(records[i].value['dataArr'][1]);
    newRecord.value.FROM_MAC = mac['FROM_MAC'];
    newRecord.value.TARGET_MAC = mac['TARGET_MAC'];
    sdc.output.write(newRecord);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}
// 第三个主脚本：封装es数据js
var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.LOG_ID = records[i].value['MAIL_RECEIVE_ITEM_ID'];
    records[i].value.RECORD_TIME = records[i].value['REQ_TIME'];
    records[i].value.OPERTION = '003003';
    records[i].value.LOG_TABLE = 'DSSP_MAIL_RECEIVE_ITEM';
    var obj = {};
    obj.RECORD_TIME = records[i].value['RECORD_TIME_ITEM'];
    obj.OTHER_ID = records[i].value['OTHER_ID'];
    obj.FROM_USER = records[i].value['FROM_USER'];
    obj.TO_USER = records[i].value['TO_USER'];
    obj.CC_USER = records[i].value['CC_USER'];
    obj.BCC_USER = records[i].value['BCC_USER'];
    obj.FROM_DOMAIN = records[i].value['FROM_DOMAIN'];
    obj.TO_DOMAIN = records[i].value['TO_DOMAIN'];
    obj.CC_DOMAIN = records[i].value['CC_DOMAIN'];
    obj.BCC_DOMAIN = records[i].value['BCC_DOMAIN'];
    obj.CERTIFY_CATEGORY = records[i].value['CERTIFY_CATEGORY'];
    obj.MAIL_SUBJECT = records[i].value['MAIL_SUBJECT'];
    obj.CONTENT_DETAILS = records[i].value['CONTENT_DETAILS'];
    obj.ATTACHMENT_DETAILS = records[i].value['ATTACHMENT_DETAILS'];
    obj.ATTACHMENT_TOTAL_SIZE = records[i].value['ATTACHMENT_TOTAL_SIZE'];
    obj.EMAI_ID = records[i].value['EMAI_ID'];
    obj.RECEIVE_STATUS = records[i].value['RECEIVE_STATUS'];
    obj.FAILED_CODE = records[i].value['FAILED_CODE'];
    obj.SEND_DATE = records[i].value['SEND_DATE'];
    obj.RECEIVE_DATE = records[i].value['RECEIVE_DATE'];
    obj.SESSION_ID = records[i].value['SESSION_ID'];
    records[i].value.CONTENT = state.convertMapToStr(obj);
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}

//初始脚本：参见A100公共脚本文档
