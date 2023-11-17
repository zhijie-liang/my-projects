var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.DATA_BASE_EXEC_ID = state.getUUID();
    records[i].value.CLIENT_IP = '';
    records[i].value.OTHER_ID = records[i].value['SESSION_ID'];
    records[i].value.DATA_BASE_NAME = records[i].value['DATA_BASE_ACCOUNT'];
    records[i].value.CLIENT_PORT = 0;
    records[i].value.CLIENT_MAC = '';
    records[i].value.APPLICATION_ACCOUNT = '';
    records[i].value.DATA_BASE_TYPE = 'dm';
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.FAIL_CODE = records[i].value['EXEC_RESULT']
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
    records[i].value.SQL_TYPE = records[i].value['SQL_TYPE'] + '';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}