var records = sdc.records;
var timestamp = new Date().getTime();
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.DATA_BASE_EXEC_ID = state.getUUID();
    records[i].value.CLIENT_IP = '';
    records[i].value.OTHER_ID = records[i].value['SESSION_ID'];
    records[i].value.DATA_BASE_NAME = records[i].value['DATA_BASE_ACCOUNT'];
    records[i].value.CLIENT_PORT = 0;
    records[i].value.WARNING_COUNT = 0;
    records[i].value.CLIENT_MAC = '';
    records[i].value.APPLICATION_ACCOUNT = '';
    records[i].value.DATA_BASE_TYPE = 'dm';
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.FAIL_CODE = records[i].value['EXEC_RESULT']
    records[i].value.SQL_TYPE = records[i].value['SQL_TYPE'] + '';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    var sql = records[i].value.SQL;
    if (sql === null || isNaN(sql)) {
      records[i].value.SQL = '';
    } else {
      records[i].value.SQL = decodeURIComponent(sql).replace(/\+/g, " ");
    }
    var result = records[i].value.SEARCH_RESULT;
    if (result === null || isNaN(result)) {
      records[i].value.SEARCH_RESULT = '';
    } else {
      records[i].value.SEARCH_RESULT = decodeURIComponent(result).replace(/\+/g, " ");
    }
    // 封装data
    records[i].value.data = [];
    // 封装root
    var obj = {};
    obj.DATA_BASE_EXEC_ID = records[i].value['DATA_BASE_EXEC_ID'];
    obj.RECORD_TIME = records[i].value['RECORDTIME_DMSQL'];
    obj.OTHER_ID = records[i].value['OTHER_ID'];
    obj.CLIENT_IP = records[i].value['CLIENT_IP'];
    obj.CLIENT_PORT = records[i].value['CLIENT_PORT'];
    obj.CLIENT_MAC = records[i].value['CLIENT_MAC'];
    obj.FROM_IP = records[i].value['FROM_IP'];
    obj.FROM_PORT = records[i].value['FROM_PORT'];
    obj.TARGET_IP = records[i].value['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['TARGET_PORT'];
    obj.APPLICATION_ACCOUNT = records[i].value['APPLICATION_ACCOUNT'];
    obj.DATA_BASE_ACCOUNT = records[i].value['DATA_BASE_ACCOUNT'];
    obj.DATA_BASE_TYPE = records[i].value['DATA_BASE_TYPE'];
    obj.DATA_BASE_VERSION = records[i].value['DATA_BASE_VERSION'];
    obj.DATA_BASE_NAME = records[i].value['DATA_BASE_NAME'];
    obj.TABLE_NAME = records[i].value['TABLE_NAME'];
    obj.SQL_TYPE = records[i].value['SQL_TYPE'];
    obj.START_EXEC_TIME = records[i].value['START_EXEC_TIME'];
    obj.EXEC_TIME = records[i].value['EXEC_TIME'];
    obj.AFFECT_ROWS = records[i].value['AFFECT_ROWS'];
    obj.EXEC_RESULT = records[i].value['EXEC_RESULT'];
    obj.FAIL_CODE = records[i].value['FAIL_CODE'];
    obj.FAIL_INFO = records[i].value['FAIL_INFO'];
    obj.SESSION_ID = records[i].value['SESSION_ID'];
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
    obj.APM_FLAG = records[i].value['APM_FLAG'];
    obj.SOURCE_TYPE = records[i].value['SOURCE_TYPE'];
    obj.WARNING_COUNT = records[i].value['WARNING_COUNT'];
    obj.SEARCH_RESULT = records[i].value['SEARCH_RESULT'];
    records[i].value.root = obj;
    // 封装payload
    var obj1 = {};
    obj1.count = 3;
    obj1.ts = timestamp;
    obj1.id = '6538c2173913df4217c42009:origin';
    var dataStr = state.convertMapToStr(records[i].value['data']);
    obj1.data_hash = state.hashcode(dataStr) + '';
    var rootS = state.convertMapToStr2(records[i].value['root']);
    var rootStr = state.convertLowercaseUnicodeToUppercase(rootS);
    records[i].value.rootStr = rootStr;
    obj1.root_hash = state.hashcode(rootStr) + '';
    records[i].value.rooth = obj1.root_hash;
    records[i].value.payload = obj1;
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}