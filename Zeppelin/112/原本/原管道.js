var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.DATA_BASE_EXEC_ID = state.getUUID();
    records[i].value.CLIENT_IP = '';
    records[i].value.OTHER_ID = records[i].value['SESSION_ID'];
    records[i].value.SYSTEM_CODE = '';
    records[i].value.TARGET_REGION_ID = "";
    records[i].value.FROM_REGION_ID = "";
    records[i].value.CLIENT_PORT = 0;
    records[i].value.CLIENT_MAC = '';
    records[i].value.INSTANCE = '';
    records[i].value.APPLICATION_ACCOUNT = '';
    records[i].value.DATA_BASE_TYPE = 'king';
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.DATA_LEVEL = '';
    records[i].value.CLASS_CODE_INDUSTRY = '';
    records[i].value.CLASS_CODE_SUBJECT = '';
    records[i].value.CLASS_CODE_AREA = '';
    records[i].value.SENSITIVE_FLAG = '';
    records[i].value.DATA_ELEMENT_CODE = '';
    records[i].value.SW_CODE = '';
    var sql = records[i].value.SQL;
    if (sql === null || isNaN(sql)) {
      records[i].value.SQL = sql;
    } else {
      records[i].value.SQL = decodeURIComponent(sql).replace(/\+/g, " ");
    }
    var result = records[i].value.SEARCH_RESULT;
    if (result === null || isNaN(sql)) {
      records[i].value.SEARCH_RESULT = result;
    } else {
      records[i].value.SEARCH_RESULT = decodeURIComponent(result).replace(/\+/g, " ");
    }
    records[i].value.FAIL_CODE = state.convertToNumber(records[i].value['FAIL_INFO']);
    records[i].value.SQL_TYPE = records[i].value['SQL_TYPE'] + '';
    records[i].value.REQ_TIME = records[i].value['START_EXEC_TIME'];
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    records[i].value.TARGET_MAC = 'd4:61:fb:57:35:54';
    records[i].value.FROM_MAC = 'd4:61:fb:57:35:48';
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}