var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.FILE_TRANS_OPERTION_ID = state.getUUID();
    records[i].value.OTHER_ID = '';
    records[i].value.COMMOND = state.getFtpStatus(records[i].value['COMMOND']);
    records[i].value.RSP_CODE = state.getFtpStatus(records[i].value['RSP_CODE']);
    records[i].value.RSP_DETAIL = state.getStatusDescription(records[i].value['RSP_CODE']),
      records[i].value.TRANS_TIME = state.getTimeDifference(records[i].value['FILEDOWN_UPSTARTTIME'],
        records[i].value['FILEDOWN_UPENDTIME']),
      records[i].value.TRANS_MODEL = '',
      records[i].value.DATA_PORT = records[i].value['CONTROL_PORT'];
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.DATA_LEVEL = '';
    records[i].value.CLASS_CODE_INDUSTRY = '';
    records[i].value.CLASS_CODE_SUBJECT = '';
    records[i].value.CLASS_CODE_AREA = '';
    records[i].value.SENSITIVE_FLAG = '';
    records[i].value.DATA_ELEMENT_CODE = '';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}