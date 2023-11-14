var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.DATA_BASE_LOGIN_ID = state.getUUID();
    records[i].value.CLIENT_IP = '';
    records[i].value.SESSION_ID = records[i].value['OTHER_ID'];
    records[i].value.CLIENT_PORT = 0;
    records[i].value.CLIENT_MAC = '';
    records[i].value.APPLICATION_ACCOUNT = '';
    records[i].value.DATA_BASE_TYPE = 'king';
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.LOGIN_ERR_CODE = records[i].value['LOGIN_ERR_CODE'] + '';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}