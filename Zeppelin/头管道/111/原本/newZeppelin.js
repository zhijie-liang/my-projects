var records = sdc.records;
var timestamp = new Date().getTime();
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.DATA_BASE_EXEC_ID = state.getUUID();
    records[i].value.CLIENT_IP = '';
    records[i].value.OTHER_ID = records[i].value['SESSION_ID'];
    records[i].value.CLIENT_PORT = 0;
    records[i].value.CLIENT_MAC = '';
    records[i].value.APPLICATION_ACCOUNT = '';
    records[i].value.DATA_BASE_TYPE = 'oracle';
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.FAIL_CODE = records[i].value['EXEC_RESULT'];
    records[i].value.WARNING_COUNT = 0;
    var sql = records[i].value.SQL;
    if (sql === null || isNaN(sql)) {
      records[i].value.SQL = "";
    } else {
      records[i].value.SQL = decodeURIComponent(sql).replace(/\+/g, " ");
    }
    var result = records[i].value.SEARCH_RESULT;
    if (result === null || isNaN(result)) {
      records[i].value.SEARCH_RESULT = "";
    } else {
      records[i].value.SEARCH_RESULT = decodeURIComponent(result).replace(/\+/g, " ");
    }
    records[i].value.SQL_TYPE = records[i].value['SQL_TYPE'] + '';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    // 封装data
    records[i].value.data = [];
    // 封装root
    var obj = {};
    obj.AFFECT_ROWS = records[i].value['AFFECT_ROWS'];
    obj.APM_FLAG = records[i].value['APM_FLAG'];
    obj.APPLICATION_ACCOUNT = records[i].value['APPLICATION_ACCOUNT'];
    obj.CLIENT_IP = records[i].value['CLIENT_IP'];
    obj.CLIENT_MAC = records[i].value['CLIENT_MAC'];
    obj.CLIENT_PORT = records[i].value['CLIENT_PORT'];
    obj.DATA_BASE_ACCOUNT = records[i].value['DATA_BASE_ACCOUNT'];
    obj.DATA_BASE_EXEC_ID = records[i].value['DATA_BASE_EXEC_ID'];
    obj.DATA_BASE_NAME = records[i].value['DATA_BASE_NAME'];
    obj.DATA_BASE_TYPE = records[i].value['DATA_BASE_TYPE'];
    obj.DATA_BASE_VERSION = records[i].value['DATA_BASE_VERSION'];
    obj.EXEC_RESULT = records[i].value['EXEC_RESULT'];
    obj.EXEC_TIME = records[i].value['EXEC_TIME'];
    obj.FAIL_CODE = records[i].value['FAIL_CODE'];
    obj.FAIL_INFO = records[i].value['FAIL_INFO'];
    obj.FROM_IP = records[i].value['FROM_IP'];
    obj.FROM_PORT = records[i].value['FROM_PORT'];
    obj.INSTANCE = records[i].value['INSTANCE'];
    obj.OTHER_ID = records[i].value['OTHER_ID'];
    obj.RECORD_TIME = records[i].value['RECORDTIME_ORACLESQL'];
    obj.REQ_BYTES = records[i].value['REQ_BYTES'];
    obj.REQ_PACKETS = records[i].value['REQ_PACKETS'];
    obj.REQ_TIME = records[i].value['REQ_TIME'];
    obj.RETRANS_PSPBYTES = records[i].value['RETRANS_PSPBYTES'];
    obj.RETRANS_PSPPKTS = records[i].value['RETRANS_PSPPKTS'];
    obj.RETRANS_REQBYTES = records[i].value['RETRANS_REQBYTES'];
    obj.RETRANS_REQKTS = records[i].value['RETRANS_REQKTS'];
    obj.RSP_BYTES = records[i].value['RSP_BYTES'];
    obj.RSP_PACKET = records[i].value['RSP_PACKET'];
    obj.RSP_TIME = records[i].value['RSP_TIME'];
    obj.SESSION_ID = records[i].value['SESSION_ID'];
    obj.SOURCE_TYPE = records[i].value['SOURCE_TYPE'];
    obj.SQL = records[i].value['SQL'];
    obj.SEARCH_RESULT = records[i].value['SEARCH_RESULT'];
    obj.SQL_TYPE = records[i].value['SQL_TYPE'];
    obj.START_EXEC_TIME = records[i].value['START_EXEC_TIME'];
    obj.TABLE_NAME = records[i].value['TABLE_NAME'];
    obj.TARGET_IP = records[i].value['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['TARGET_PORT'];
    obj.WARNING_COUNT = records[i].value['WARNING_COUNT'];
    records[i].value.root = obj;
    // 封装payload
    var obj1 = {};
    obj1.count = 3;
    obj1.ts = timestamp;
    obj1.id = '6541ec093913df4217c4217c:origin';
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
