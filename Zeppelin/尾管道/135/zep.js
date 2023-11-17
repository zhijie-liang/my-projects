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
    obj.MAIL_RECEIVE_LOGIN_ID = records[i].value['root']['MAIL_RECEIVE_LOGIN_ID'];
    obj.RECORD_TIME = records[i].value['root']['RECORD_TIME'];
    obj.OTHER_ID = records[i].value['root']['OTHER_ID'];
    obj.FROM_IP = records[i].value['root']['FROM_IP'];
    obj.FROM_PORT = records[i].value['root']['FROM_PORT'];
    obj.TARGET_IP = records[i].value['root']['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['root']['TARGET_PORT'];
    obj.SERVER_DOAMIN = state.convertNullToStr(records[i].value['root']['SERVER_DOAMIN']);
    obj.ISO_TYPE = records[i].value['root']['ISO_TYPE'];
    obj.CERTIFY_CATEGORY = records[i].value['root']['CERTIFY_CATEGORY'];
    obj.MAIL_ACCOUNT = state.convertNullToStr(records[i].value['root']['MAIL_ACCOUNT']);
    obj.MAIL_ON_SERVER_CNT = records[i].value['root']['MAIL_ON_SERVER_CNT'];
    obj.MAIL_ON_SERVER_TOTAL_SIZE = records[i].value['root']['MAIL_ON_SERVER_TOTAL_SIZE'];
    obj.DOWN_MAIL_COUNTS = records[i].value['root']['DOWN_MAIL_COUNTS'];
    obj.REQ_TOTAL_COUNTS = records[i].value['root']['REQ_TOTAL_COUNTS'];
    obj.RES_TOTAL_COUNTS = records[i].value['root']['RES_TOTAL_COUNTS'];
    obj.FAIL_COUNT = records[i].value['root']['FAIL_COUNT'];
    obj.LOGIN_TIME = records[i].value['root']['LOGIN_TIME'];
    obj.LOGIN_STATUS = records[i].value['root']['LOGIN_STATUS'];
    obj.SESSION_ID = records[i].value['root']['SESSION_ID'];
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
      records[i].value.source_name = 'DSSP_MAIL_RECEIVE_LOGIN';
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
      records[i].value.source_name = 'DSSP_MAIL_RECEIVE_LOGIN';
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
      records[i].value.source_name = 'DSSP_MAIL_RECEIVE_LOGIN';
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
// 第二个主脚本： 封装业务数据js
var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    // 拆分字段  
    var newRecord = sdc.createRecord(records[i].sourceId + ':newRecordId');
    newRecord.value = records[i].value['obj'];

    newRecord.value.RECORD_TIME_LOGIN = newRecord.value['RECORD_TIME'];
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
// 第三个主脚本： 封装es数据js
var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.LOG_ID = records[i].value['MAIL_RECEIVE_LOGIN_ID'];
    records[i].value.RECORD_TIME = records[i].value['LOGIN_TIME'];
    records[i].value.OPERTION = '003002';
    records[i].value.LOG_TABLE = 'DSSP_MAIL_RECEIVE_LOGIN';
    var obj = {};
    obj.RECORD_TIME = records[i].value['RECORD_TIME_LOGIN'];
    obj.OTHER_ID = records[i].value['OTHER_ID'];
    obj.SERVER_DOAMIN = records[i].value['SERVER_DOAMIN'];
    obj.CERTIFY_CATEGORY = records[i].value['CERTIFY_CATEGORY'];
    obj.MAIL_ACCOUNT = records[i].value['MAIL_ACCOUNT'];
    obj.MAIL_ON_SERVER_CNT = records[i].value['MAIL_ON_SERVER_CNT'];
    obj.MAIL_ON_SERVER_TOTAL_SIZE = records[i].value['MAIL_ON_SERVER_TOTAL_SIZE'];
    obj.DOWN_MAIL_COUNTS = records[i].value['DOWN_MAIL_COUNTS'];
    obj.REQ_TOTAL_COUNTS = records[i].value['REQ_TOTAL_COUNTS'];
    obj.RES_TOTAL_COUNTS = records[i].value['RES_TOTAL_COUNTS'];
    obj.FAIL_COUNT = records[i].value['FAIL_COUNT'];
    obj.LOGIN_TIME = records[i].value['LOGIN_TIME'];
    obj.LOGIN_STATUS = records[i].value['LOGIN_STATUS'];
    obj.LOGIN_TYPE = records[i].value['LOGIN_TYPE'];
    obj.SESSION_ID = records[i].value['OTHER_ID'];
    records[i].value.CONTENT = state.convertMapToStr(obj);
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}

// 初始脚本：参见A100公共脚本文档
