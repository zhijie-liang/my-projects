var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.DATA_BASE_EXEC_ID = state.getUUID();
    records[i].value.CLIENT_IP = '';
    records[i].value.OTHER_ID = records[i].value['SESSION_ID'];
    records[i].value.CLIENT_PORT = 0;
    records[i].value.CLIENT_MAC = '';
    records[i].value.INSTANCE = '';
    records[i].value.APPLICATION_ACCOUNT = '';
    records[i].value.DATA_BASE_TYPE = 'mysql';
    records[i].value.SOURCE_TYPE = '01';
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
    records[i].value.REQ_TIME = records[i].value['START_EXEC_TIME'];
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}