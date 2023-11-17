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
    dataArr[2] = records[i].value['data'][2];
    // root转换
    var obj = {};
    obj.WEB_PAGE_ID = records[i].value['root']['WEB_PAGE_ID'];
    obj.RECORD_TIME = records[i].value['root']['RECORD_TIME'];
    obj.FROM_IP = records[i].value['root']['FROM_IP'];
    obj.FROM_PORT = records[i].value['root']['FROM_PORT'];
    obj.TARGET_IP = records[i].value['root']['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['root']['TARGET_PORT'];
    obj.HTTP_TYPE = records[i].value['root']['HTTP_TYPE'];
    obj.URL = records[i].value['root']['URL'];
    obj.HTTP_VERSION = records[i].value['root']['HTTP_VERSION'];
    obj.RES_STATUS = records[i].value['root']['RES_STATUS'];
    obj.RES_DETAIL = records[i].value['root']['RES_DETAIL'];
    obj.REQ_TIME = records[i].value['root']['REQ_TIME'];
    obj.RSP_TIME = records[i].value['root']['RSP_TIME'];
    obj.PAGE_TIME = records[i].value['root']['PAGE_TIME'];
    obj.LOAD_TIME = records[i].value['root']['LOAD_TIME'];
    obj.CLIENT_OS = records[i].value['root']['CLIENT_OS'];
    obj.CLIENT_EXPLORER = records[i].value['root']['CLIENT_EXPLORER'];
    obj.CLIENT_DEVICE = records[i].value['root']['CLIENT_DEVICE'];
    obj.REQ_BODY = state.convertNullToStr(records[i].value['root']['REQ_BODY']);
    obj.RSP_BODY = state.convertNullToStr(records[i].value['root']['RSP_BODY']);
    obj.REQ_COUNT = records[i].value['root']['REQ_COUNT'];
    obj.REQ_BYTES = records[i].value['root']['REQ_BYTES'];
    obj.RSP_BYTES = records[i].value['root']['RSP_BYTES'];
    obj.PAGE_ID = records[i].value['root']['PAGE_ID'];
    obj.APM_FLAG = state.convertNullToStr(records[i].value['root']['APM_FLAG']);
    obj.SOURCE_TYPE = records[i].value['root']['SOURCE_TYPE'];
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
      records[i].value.source_name = 'DSSP_WEB_PAGE';
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
      records[i].value.source_name = 'DSSP_WEB_PAGE';
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
      records[i].value.source_name = 'DSSP_WEB_PAGE';
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

    newRecord.value.RECORD_TIME_PAGE = newRecord.value['RECORD_TIME'];
    // 分类分级
    var level = state.convertStrToMap(records[i].value['dataArr'][0]);
    newRecord.value.SYSTEM_CODE = level['SYSTEM_CODE'];
    newRecord.value.DATA_LEVEL = '';
    newRecord.value.CLASS_CODE_INDUSTRY = '';
    newRecord.value.CLASS_CODE_SUBJECT = '';
    newRecord.value.CLASS_CODE_AREA = '';
    newRecord.value.SENSITIVE_FLAG = level['SENSITIVE_FLAG'];
    newRecord.value.DATA_ELEMENT_CODE = '';
    // 地域ID
    var region = state.convertStrToMap(records[i].value['dataArr'][1]);
    newRecord.value.FROM_REGION_ID = region['FROM_REGION_ID'];
    newRecord.value.TARGET_REGION_ID = region['TARGET_REGION_ID'];
    // mac 
    var mac = state.convertStrToMap(records[i].value['dataArr'][2]);
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
    records[i].value.LOG_ID = records[i].value['WEB_PAGE_ID'];
    records[i].value.RECORD_TIME = records[i].value['REQ_TIME'];
    records[i].value.ISO_TYPE = 'HTTP';
    records[i].value.OPERTION = '002002';
    records[i].value.LOG_TABLE = 'DSSP_WEB_PAGE';
    var obj = {};
    obj.RECORD_TIME = records[i].value['RECORD_TIME_PAGE'];
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
    obj.REQ_BODY = records[i].value['REQ_BODY'];
    obj.RSP_BODY = records[i].value['RSP_BODY'];
    obj.REQ_COUNT = records[i].value['REQ_COUNT'];
    obj.REQ_BYTES = records[i].value['REQ_BYTES'];
    obj.RSP_BYTES = records[i].value['RSP_BYTES'];
    obj.APM_FLAG = records[i].value['APM_FLAG'];
    records[i].value.CONTENT = state.convertMapToStr(obj);
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}

//第一个初始化脚本：参见A100公共脚本
