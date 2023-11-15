var records = sdc.records;
var timestamp = new Date().getTime();
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
    // 封装data
    records[i].value.data = [];
    // 封装root
    var obj = {};
    obj.FILE_TRANS_OPERTION_ID = records[i].value['FILE_TRANS_OPERTION_ID'];
    obj.RECORD_TIME = records[i].value['RECORDTIME_FTPRRPAIR'];
    obj.OTHER_ID = records[i].value['OTHER_ID'];
    obj.FROM_IP = records[i].value['FROM_IP'];
    obj.FROM_PORT = records[i].value['FROM_PORT'];
    obj.TARGET_IP = records[i].value['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['TARGET_PORT'];
    obj.COMMOND = records[i].value['COMMOND'];
    obj.RSP_CODE = records[i].value['RSP_CODE'];
    obj.RSP_DETAIL = records[i].value['RSP_DETAIL'];
    obj.TRANS_MODEL = records[i].value['TRANS_MODEL'];
    obj.FILE_NAME = state.convertNullToStr(records[i].value['FILE_NAME']);
    obj.FILE_SIZE = state.convertNullToInt(records[i].value['FILE_SIZE']);
    obj.FILE_PATH = state.convertNullToStr(records[i].value['FILE_PATH']);
    obj.TRANS_RATE = state.convertNullToInt(records[i].value['TRANS_RATE']);
    obj.TRANS_TIME = records[i].value['TRANS_TIME'];
    obj.CONN_MODE = state.convertNullToStr(records[i].value['CONN_MODE']);
    obj.CONTROL_PORT = state.convertNullToStr(records[i].value['CONTROL_PORT']);
    obj.DATA_PORT = state.convertNullToStr(records[i].value['DATA_PORT']);
    obj.TRANS_DIRECTION = state.convertNullToInt(records[i].value['TRANS_DIRECTION']);
    obj.FILE_DETAIL = state.convertNullToStr(records[i].value['FILE_DETAIL']);
    obj.SESSION_ID = records[i].value['SESSION_ID'];
    obj.REQ_BYTES = records[i].value['REQ_BYTES'];
    obj.RSP_BYTES = records[i].value['RSP_BYTES'];
    obj.REQ_PACKETS = records[i].value['REQ_PACKETS'];
    obj.RSP_PACKET = records[i].value['RSP_PACKET'];
    obj.RETRANS_REQKTS = records[i].value['RETRANS_REQKTS'];
    obj.RETRANS_REQBYTES = records[i].value['RETRANS_REQBYTES'];
    obj.RETRANS_PSPPKTS = records[i].value['RETRANS_PSPPKTS'];
    obj.RETRANS_PSPBYTES = state.convertNullToInt(records[i].value['RETRANS_PSPBYTES']);
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
    obj1.id = '654a02f67677ca438af37038:origin';
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