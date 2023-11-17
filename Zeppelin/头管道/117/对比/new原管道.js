var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.WEB_REQ_ID = state.getUUID();
    records[i].value.REQ_STATU_DETAIL = state.getStatusDescription(records[i].value['RSQ_CODE']);
    records[i].value.LOAD_TIME = state.getTimeDifference(records[i].value['LAST_RSP_TIME'], records[i].value['SEND_REQ_TIME'])
    records[i].value.URL = "http://" + records[i].value.HOST + records[i].value.URL;
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
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


