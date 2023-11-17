var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.REMOTE_CONTROL_LOGIN_ID = state.getUUID();
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.FROM_REGION_ID = '';
    records[i].value.TARGET_REGION_ID = '';
    records[i].value.DATA_LEVEL = '';
    records[i].value.CLASS_CODE_INDUSTRY = '';
    records[i].value.CLASS_CODE_SUBJECT = '';
    records[i].value.CLASS_CODE_AREA = '';
    records[i].value.SENSITIVE_FLAG = '';
    records[i].value.DATA_ELEMENT_CODE = '';
    records[i].value.SESSION_ID = records[i].value['OTHER_ID'];
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