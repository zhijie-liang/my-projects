var records = sdc.records;
var timestamp = new Date().getTime();
for (var i = 0; i < records.length; i++) {
    try {
        records[i].value.REMOTE_CONTROL_LOGIN_ID = state.getUUID();
        records[i].value.SOURCE_TYPE = '01';
        records[i].value.DATA_LEVEL = '';
        records[i].value.CLASS_CODE_INDUSTRY = '';
        records[i].value.CLASS_CODE_SUBJECT = '';
        records[i].value.CLASS_CODE_AREA = '';
        records[i].value.SENSITIVE_FLAG = '';
        records[i].value.DATA_ELEMENT_CODE = '';
        records[i].value.SESSION_ID = records[i].value['OTHER_ID'];
        records[i].value.FROM_IP = state.convertToIP(records[i].value['FROM_IP']);
        records[i].value.TARGET_IP = state.convertToIP(records[i].value['TARGET_IP']);
        // 封装data
        records[i].value.data = [];
        // 封装root
        var obj = {};
        obj.REMOTE_CONTROL_LOGIN_ID = records[i].value['REMOTE_CONTROL_LOGIN_ID'];
        obj.RECORD_TIME = records[i].value['RECORDTIME_TELNETCONN'];
        obj.OTHER_ID = records[i].value['OTHER_ID'];
        obj.FROM_IP = records[i].value['FROM_IP'];
        obj.FROM_PORT = records[i].value['FROM_PORT'];
        obj.TARGET_IP = records[i].value['TARGET_IP'];
        obj.TARGET_PORT = records[i].value['TARGET_PORT'];
        obj.LOGIN_TIME = records[i].value['LOGIN_TIME'];
        obj.LOGOUT_TIME = records[i].value['LOGOUT_TIME'];
        obj.CONNECTION_TIME = records[i].value['CONNECTION_TIME'];
        obj.LOGIN_FLAG = records[i].value['LOGIN_FLAG'];
        obj.LOGIN_USER = records[i].value['LOGIN_USER'];
        obj.KERNEL = state.convertNullToStr(records[i].value['KERNEL']);
        obj.CLIENT_OS = records[i].value['CLIENT_OS'];
        obj.STATUS = records[i].value['STATUS'];
        obj.SESSION_ID = records[i].value['SESSION_ID'];
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
        obj1.id = '654b26407677ca438af37055:origin';
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