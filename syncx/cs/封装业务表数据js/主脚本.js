var records = sdc.records;
var timestamp = new Date().getTime();
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.DATA_BASE_LOGIN_ID = state.getUUID();
    records[i].value.CLIENT_IP = '';
    records[i].value.SESSION_ID = records[i].value['OTHER_ID'];
    records[i].value.CLIENT_PORT = 0;
    records[i].value.CLIENT_MAC = '';
    records[i].value.APPLICATION_ACCOUNT = '';
    records[i].value.DATA_BASE_TYPE = 'mysql';
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.LOGIN_ERR_CODE = records[i].value['LOGIN_ERR_CODE'] + '';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    // 封装data
    records[i].value.data = [];
    // 封装root
    var obj = {};
    obj.APM_FLAG = state.convertNullToStr(records[i].value['APM_FLAG']);
    obj.APPLICATION_ACCOUNT = state.convertNullToStr(records[i].value['APPLICATION_ACCOUNT']);
    obj.CLIENT_IP = records[i].value['CLIENT_IP'];
    obj.CLIENT_MAC = records[i].value['CLIENT_MAC'];
    obj.CLIENT_PORT = records[i].value['CLIENT_PORT'];
    obj.DATA_BASE_ACCOUNT = state.convertNullToStr(records[i].value['DATA_BASE_ACCOUNT']);
    obj.DATA_BASE_LOGIN_ID = state.convertNullToStr(records[i].value['DATA_BASE_LOGIN_ID']);
    obj.DATA_BASE_NAME = state.convertNullToStr(records[i].value['DATA_BASE_NAME']);
    obj.DATA_BASE_TYPE = state.convertNullToStr(records[i].value['DATA_BASE_TYPE']);
    obj.DATA_BASE_VERSION = state.convertNullToStr(records[i].value['DATA_BASE_VERSION']);
    obj.FROM_IP = records[i].value['FROM_IP'];
    obj.FROM_PORT = records[i].value['FROM_PORT'];
    obj.LOGIN_ERR_CODE = records[i].value['LOGIN_ERR_CODE'];
    obj.LOGIN_FAILED_INFO = state.convertNullToStr(records[i].value['LOGIN_FAILED_INFO']);
    obj.LOGIN_STATUS = records[i].value['LOGIN_STATUS'];
    obj.LOGIN_SUCCESS_TIME = records[i].value['LOGIN_SUCCESS_TIME'];
    obj.LOGIN_TIME = records[i].value['LOGIN_TIME'];
    obj.LOGIN_TYPE = state.convertNullToStr(records[i].value['LOGIN_TYPE']);
    obj.OTHER_ID = records[i].value['OTHER_ID'];
    obj.RECORD_TIME = records[i].value['RECORDTIME_MYSQLBIZ'];
    obj.SESSION_ID = records[i].value['OTHER_ID'];
    obj.SOURCE_TYPE = records[i].value['SOURCE_TYPE'];
    obj.TARGET_IP = records[i].value['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['TARGET_PORT'];
    records[i].value.root = obj;
    // 封装payload
    var obj1 = {};
    obj1.count = 3;
    obj1.ts = timestamp;
    obj1.id = '6540ca963913df4217c42110:origin';
    var dataStr = state.convertMapToStr(records[i].value['data']);
    obj1.data_hash = state.hashcode(dataStr) + '';
    var rootS = state.convertMapToStr2(records[i].value['root']);
    var rootStr = state.convertLowercaseUnicodeToUppercase(rootS);
    obj1.root_hash = state.hashcode(rootStr) + '';
    records[i].value.payload = obj1;
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}