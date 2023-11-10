var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.LOG_ID = records[i].value['DATA_BASE_EXEC_ID'];
    records[i].value.RECORD_TIME = records[i].value['START_EXEC_TIME'];
    records[i].value.ISO_TYPE = state.getIsoType(records[i].value['DATA_BASE_TYPE']);
    records[i].value.OPERTION = '001002';
    records[i].value.LOG_TABLE = 'DSSP_DATA_BASE_EXEC';
    var obj = {};
    ///////////////////////////////////////////////////////////
    obj.RECORD_TIME = records[i].value['RECORD_TIME_EXEC'];
    /////////////////////////////////////////////////////////////
    obj.OTHER_ID = records[i].value['OTHER_ID'];
    obj.CLIENT_IP = records[i].value['CLIENT_IP'];
    obj.CLIENT_PORT = records[i].value['CLIENT_PORT'];
    obj.CLIENT_MAC = records[i].value['CLIENT_MAC'];
    obj.APPLICATION_ACCOUNT = records[i].value['APPLICATION_ACCOUNT'];
    obj.DATA_BASE_ACCOUNT = records[i].value['DATA_BASE_ACCOUNT'];
    obj.DATA_BASE_TYPE = records[i].value['DATA_BASE_TYPE'];
    obj.DATA_BASE_VERSION = records[i].value['DATA_BASE_VERSION'];
    obj.DATA_BASE_NAME = records[i].value['DATA_BASE_NAME'];
    obj.TABLE_NAME = records[i].value['TABLE_NAME'];
    obj.INSTANCE = records[i].value['INSTANCE'];
    obj.SQL_TYPE = records[i].value['SQL_TYPE'];
    obj.EXEC_TIME = records[i].value['EXEC_TIME'];
    obj.AFFECT_ROWS = records[i].value['AFFECT_ROWS'];
    obj.EXEC_RESULT = records[i].value['EXEC_RESULT'];
    obj.FAIL_CODE = records[i].value['FAIL_CODE'];
    obj.FAIL_INFO = records[i].value['FAIL_INFO'];
    obj.SQL = records[i].value['SQL'];
    obj.SESSION_ID = records[i].value['SESSION_ID'];
    obj.APM_FLAG = records[i].value['APM_FLAG'];
    records[i].value.CONTENT = state.convertMapToStr(obj);
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}