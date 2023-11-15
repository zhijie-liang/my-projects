var records = sdc.records;
var timestamp = new Date().getTime();
for (var i = 0; i < records.length; i++) {
  try {
    records[i].value.REMOTE_CONTROL_EXEC_ID = state.getUUID();
    records[i].value.OTHER_ID = '';
    records[i].value.SOURCE_TYPE = '01';
    records[i].value.DATA_LEVEL = '';
    records[i].value.CLASS_CODE_INDUSTRY = '';
    records[i].value.CLASS_CODE_SUBJECT = '';
    records[i].value.CLASS_CODE_AREA = '';
    records[i].value.SENSITIVE_FLAG = '';
    records[i].value.DATA_ELEMENT_CODE = '';
    records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
    records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
    // 封装data
    records[i].value.data = [];
    // 封装root
    var obj = {};
    obj.REMOTE_CONTROL_EXEC_ID = records[i].value['REMOTE_CONTROL_EXEC_ID'];
    obj.RECORD_TIME = records[i].value['RECORDTIME_TELNETRRPAIR'];
    obj.OTHER_ID = records[i].value['OTHER_ID'];
    obj.FROM_IP = records[i].value['FROM_IP'];
    obj.FROM_PORT = records[i].value['FROM_PORT'];
    obj.TARGET_IP = records[i].value['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['TARGET_PORT'];
    obj.EXEC_COMMOND = records[i].value['EXEC_COMMOND'];
    obj.EXEC_RESULT = records[i].value['EXEC_RESULT'];
    obj.SESSION_ID = records[i].value['SESSION_ID'];
    obj.FAILED_INFO = records[i].value['FAILED_INFO'];
    obj.REQ_BYTES = records[i].value['REQ_BYTES'];
    obj.RSP_BYTES = records[i].value['RSP_BYTES'];
    obj.REQ_PACKETS = records[i].value['REQ_PACKETS'];
    obj.RSP_PACKET = records[i].value['RSP_PACKET'];
    obj.RETRANS_REQKTS = records[i].value['RETRANS_REQKTS'];
    obj.RETRANS_REQBYTES = records[i].value['RETRANS_REQBYTES'];
    obj.RETRANS_PSPPKTS = records[i].value['RETRANS_PSPPKTS'];
    obj.RETRANS_PSPBYTES = records[i].value['RETRANS_PSPBYTES'];
    obj.REQ_TIME = records[i].value['REQ_TIME'];
    obj.RSP_TIME = records[i].value['RSP_TIME'];
    obj.APM_FLAG = state.convertNullToStr(records[i].value['APM_FLAG']);
    obj.SOURCE_TYPE = records[i].value['SOURCE_TYPE'];
    obj.DATA_LEVEL = records[i].value['DATA_LEVEL'];
    obj.CLASS_CODE_INDUSTRY = records[i].value['CLASS_CODE_INDUSTRY'];
    obj.CLASS_CODE_SUBJECT = records[i].value['CLASS_CODE_SUBJECT'];
    obj.CLASS_CODE_AREA = records[i].value['CLASS_CODE_AREA'];
    obj.SENSITIVE_FLAG = records[i].value['SENSITIVE_FLAG'];
    obj.DATA_ELEMENT_CODE = records[i].value['DATA_ELEMENT_CODE'];
    records[i].value.root = obj;
    // 封装payload
    var obj1 = {};
    obj1.count = 2;
    obj1.ts = timestamp;
    obj1.id = '654b38c57677ca438af37064:origin';
    var dataStr = state.convertMapToStr(records[i].value['data']);
    obj1.data_hash = state.hashcode(dataStr) + '';
    // var rootStr = state.convertMapToStr2(records[i].value['root']);
    var rootS = state.convertMapToStr2(records[i].value['root']);
    var rootStr = state.convertLowercaseUnicodeToUppercase(rootS);
    records[i].value.rootStr = rootStr;
    obj1.root_hash = state.hashcode(rootStr) + '';
    records[i].value.payload = obj1;
    sdc.output.write(records[i]);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}