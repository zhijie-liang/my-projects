var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.LOG_ID = records[i].value['FILE_TRANS_LOGIN_ID'];
    records[i].value.RECORD_TIME = records[i].value['LOGIN_TIME'];
    records[i].value.ISO_TYPE = 'FTP';
    records[i].value.OPERTION = '004001';
    records[i].value.LOG_TABLE = 'DSSP_FILE_TRANS_LOGIN';
    var obj = {};
    obj.RECORD_TIME = records[i].value['RECORDTIME_FTP'];
    obj.OTHER_ID = records[i].value['OTHER_ID'];
    obj.USER_LOGIN_NAME = records[i].value['USER_LOGIN_NAME'];
    obj.USER_LOGIN_P_W_D = records[i].value['USER_LOGIN_P_W_D'];
    obj.LOGIN_FLAG = records[i].value['LOGIN_FLAG'];
    obj.DOWN_FILE_COUNT = records[i].value['DOWN_FILE_COUNT'];
    obj.UP_FILE_COUNT = records[i].value['UP_FILE_COUNT'];
    obj.LOGIN_TIME = records[i].value['LOGIN_TIME'];
    obj.APM_FLAG = records[i].value['APM_FLAG'];
    obj.SEESION_ID = records[i].value['OTHER_ID'];
    records[i].value.CONTENT = state.convertMapToStr(obj);
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}