var records = sdc.records;
var timestamp = new Date().getTime();
for (var i = 0; i < records.length; i++) {
    try {
        records[i].value.FILE_TRANS_LOGIN_ID = state.getUUID();
        records[i].value.SEESION_ID = records[i].value['OTHER_ID'];
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
        obj.FILE_TRANS_LOGIN_ID = records[i].value['FILE_TRANS_LOGIN_ID'];
        obj.RECORD_TIME = records[i].value['RECORDTIME_FTP'];
        obj.OTHER_ID = records[i].value['OTHER_ID'];
        obj.FROM_IP = records[i].value['FROM_IP'];
        obj.FROM_PORT = records[i].value['FROM_PORT'];
        obj.TARGET_IP = records[i].value['TARGET_IP'];
        obj.TARGET_PORT = records[i].value['TARGET_PORT'];
        obj.USER_LOGIN_NAME = records[i].value['USER_LOGIN_NAME'];
        obj.USER_LOGIN_P_W_D = records[i].value['USER_LOGIN_P_W_D'];
        obj.LOGIN_FLAG = records[i].value['LOGIN_FLAG'];
        obj.DOWN_FILE_COUNT = records[i].value['DOWN_FILE_COUNT'];
        obj.UP_FILE_COUNT = records[i].value['UP_FILE_COUNT'];
        obj.LOGIN_TIME = records[i].value['LOGIN_TIME'];
        obj.SEESION_ID = records[i].value['SEESION_ID'];
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
        obj1.id = '654998e17677ca438af3701c:origin';
        var dataStr = state.convertMapToStr(records[i].value['data']);
        obj1.data_hash = state.hashcode(dataStr) + '';
        var rootStr = state.convertMapToStr2(records[i].value['root']);
        records[i].value.rootStr = rootStr;
        obj1.root_hash = state.hashcode(rootStr) + '';
        records[i].value.payload = obj1;
        sdc.output.write(records[i]);
    } catch (e) {
        // Send record to error
        sdc.error.write(records[i], e);
    }
}