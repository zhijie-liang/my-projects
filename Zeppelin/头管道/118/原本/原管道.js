var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.WEB_PAGE_ID = state.getUUID();
    records[i].value.RES_DETAIL = state.getStatusDescription(records[i].value['RES_STATUS']);
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.SYSTEM_CODE = '';
    records[i].value.DATA_LEVEL = '';
    records[i].value.CLASS_CODE_INDUSTRY = '';
    records[i].value.CLASS_CODE_SUBJECT = '';
    records[i].value.CLASS_CODE_AREA = '';
    records[i].value.SENSITIVE_FLAG = '';
    records[i].value.DATA_ELEMENT_CODE = '';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    records[i].value.TARGET_MAC = 'd4:61:fb:57:35:54';
    records[i].value.FROM_MAC = 'd4:61:fb:57:35:48';
    var reqbody = records[i].value.REQ_BODY;
    var rspbody = records[i].value.RSP_BODY;
    if (reqbody === null) {
      records[i].value.REQ_BODY = reqbody;
    } else {
      records[i].value.REQ_BODY = decodeURIComponent(reqbody).replace(/\+/g, " ");
    }
    if (rspbody === null) {
      records[i].value.RSP_BODY = rspbody;
    } else {
      records[i].value.RSP_BODY = decodeURIComponent(rspbody).replace(/\+/g, " ");
    }
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}
