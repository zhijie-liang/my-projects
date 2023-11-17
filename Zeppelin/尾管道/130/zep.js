var records = sdc.records;
var timestamp = new Date().getTime();
for (var i = 0; i < records.length; i++) {
    try {
        records[i].value.flag = 'T';
        // payload转换
        var payobj = {};
        payobj.count = records[i].value['payload']['count'];
        payobj.ts = records[i].value['payload']['ts'];
        payobj.id = records[i].value['payload']['id'];
        payobj.data_hash = records[i].value['payload']['data_hash'];
        payobj.root_hash = records[i].value['payload']['root_hash'];
        // data转换
        var dataArr = [];
        dataArr[0] = records[i].value['data'][0];
        dataArr[1] = records[i].value['data'][1];
        dataArr[2] = records[i].value['data'][2];
        // root转换
        var obj = {};
        obj.RECORD_TIME = records[i].value['root']['RECORD_TIME'];
        obj.SESSION_ID = records[i].value['root']['OTHER_ID'];
        obj.APM_FLAG = state.convertNullToStr(records[i].value['root']['APM_FLAG']);
        obj.APPLICATION_ACCOUNT = records[i].value['root']['APPLICATION_ACCOUNT'];
        obj.CLIENT_IP = records[i].value['root']['CLIENT_IP'];
        obj.CLIENT_MAC = records[i].value['root']['CLIENT_MAC'];
        obj.CLIENT_PORT = records[i].value['root']['CLIENT_PORT'];
        obj.DATA_BASE_ACCOUNT = records[i].value['root']['DATA_BASE_ACCOUNT'];
        obj.DATA_BASE_LOGIN_ID = records[i].value['root']['DATA_BASE_LOGIN_ID'];
        obj.DATA_BASE_NAME = records[i].value['root']['DATA_BASE_NAME'];
        obj.DATA_BASE_TYPE = records[i].value['root']['DATA_BASE_TYPE'];
        obj.DATA_BASE_VERSION = records[i].value['root']['DATA_BASE_VERSION'];
        obj.FROM_IP = records[i].value['root']['FROM_IP'];
        obj.FROM_PORT = records[i].value['root']['FROM_PORT'];
        obj.LOGIN_ERR_CODE = records[i].value['root']['LOGIN_ERR_CODE'];
        obj.LOGIN_FAILED_INFO = state.convertNullToStr(records[i].value['root']['LOGIN_FAILED_INFO']);
        obj.LOGIN_STATUS = records[i].value['root']['LOGIN_STATUS'];
        obj.LOGIN_SUCCESS_TIME = records[i].value['root']['LOGIN_SUCCESS_TIME'];
        obj.LOGIN_TIME = records[i].value['root']['LOGIN_TIME'];
        obj.LOGIN_TYPE = state.convertNullToStr(records[i].value['root']['LOGIN_TYPE']);
        obj.OTHER_ID = records[i].value['root']['OTHER_ID'];
        obj.SOURCE_TYPE = records[i].value['root']['SOURCE_TYPE'];
        obj.TARGET_IP = records[i].value['root']['TARGET_IP'];
        obj.TARGET_PORT = records[i].value['root']['TARGET_PORT'];
        // 封装错误数据
        var objF = {};
        objF.payload = payobj;
        objF.data = dataArr;
        objF.root = obj;
        var originData = state.convertMapToStr(objF);
        // 校验count
        var count = records[i].value['payload']['count'];
        if (count != 0) {
            records[i].value.flag = 'F'
            records[i].value.err_msg = '缺少字段补充节点';
            records[i].value.app_name = 'end';
            records[i].value.err_code = '500001';
            records[i].value.source_name = 'DSSP_DATA_BASE_LOGIN';
            records[i].value.ts = timestamp;
            records[i].value.data = originData;
            sdc.output.write(records[i]);
            continue;
        }
        // 校验data
        var data_hash = records[i].value['payload']['data_hash'];
        var dataStr = state.convertMapToStr(dataArr);
        var datahash = state.hashcode(dataStr) + '';
        if (datahash != data_hash) {
            records[i].value.flag = 'F'
            records[i].value.err_msg = 'data校验hash值不一致';
            records[i].value.app_name = 'end';
            records[i].value.err_code = '200002';
            records[i].value.source_name = 'DSSP_DATA_BASE_LOGIN';
            records[i].value.ts = timestamp;
            records[i].value.data = originData;
            sdc.output.write(records[i]);
            continue;
        }
        // 校验root
        var root_hash = records[i].value['payload']['root_hash'];
        var rootS = state.convertMapToStr2(records[i].value['root']);
        var rootStr = state.convertLowercaseUnicodeToUppercase(rootS);
        var roothash = state.hashcode(rootStr) + '';
        if (roothash != root_hash) {
            records[i].value.flag = 'F'
            records[i].value.err_msg = 'root校验hash值不一致';
            records[i].value.app_name = 'end';
            records[i].value.err_code = '200001';
            records[i].value.source_name = 'DSSP_DATA_BASE_LOGIN';
            records[i].value.ts = timestamp;
            records[i].value.data = originData;
            sdc.output.write(records[i]);
            continue;
        }
        records[i].value.dataArr = dataArr;
        records[i].value.obj = obj;
        sdc.output.write(records[i]);
    } catch (e) {
        // Send record to error
        sdc.error.write(records[i], e);
    }
}

// 第二个主脚本： 封装业务表数据
var records = sdc.records;
for (var i = 0; i < records.length; i++) {
    try {
        // 拆分字段  
        var newRecord = sdc.createRecord(records[i].sourceId + ':newRecordId');
        newRecord.value = records[i].value['obj'];
        // 分类分级
        var level = state.convertStrToMap(records[i].value['dataArr'][0]);
        newRecord.value.SYSTEM_CODE = level['SYSTEM_CODE'];
        newRecord.value.RECORD_TIME_LOGIN = newRecord.value['RECORD_TIME'];
        // 分类分级未补充字段
        newRecord.value.DATA_LEVEL = '';
        newRecord.value.CLASS_CODE_INDUSTRY = '';
        newRecord.value.CLASS_CODE_SUBJECT = '';
        newRecord.value.CLASS_CODE_AREA = '';
        newRecord.value.SENSITIVE_FLAG = '';
        newRecord.value.DATA_ELEMENT_CODE = '';
        // 地域ID
        var region = state.convertStrToMap(records[i].value['dataArr'][1]);
        newRecord.value.FROM_REGION_ID = region['FROM_REGION_ID'];
        newRecord.value.TARGET_REGION_ID = region['TARGET_REGION_ID'];
        // mac 
        var mac = state.convertStrToMap(records[i].value['dataArr'][2]);
        newRecord.value.FROM_MAC = mac['FROM_MAC'];
        newRecord.value.TARGET_MAC = mac['TARGET_MAC'];
        sdc.output.write(newRecord);
    } catch (e) {
        // Send record to error
        sdc.error.write(records[i], e);
    }
}

// 第三个主脚本：封装es数据
var records = sdc.records;
for (var i = 0; i < records.length; i++) {
    try {
        records[i].value.LOG_ID = records[i].value['DATA_BASE_LOGIN_ID'];
        records[i].value.RECORD_TIME = records[i].value['LOGIN_TIME'];
        records[i].value.ISO_TYPE = state.getIsoType(records[i].value['DATA_BASE_TYPE']);
        records[i].value.OPERTION = '001001';
        records[i].value.LOG_TABLE = 'DSSP_DATA_BASE_LOGIN';
        var obj = {};
        obj.RECORD_TIME = records[i].value['RECORD_TIME_LOGIN'];
        obj.OTHER_ID = records[i].value['OTHER_ID'];
        obj.CLIENT_IP = records[i].value['CLIENT_IP'];
        obj.CLIENT_PORT = records[i].value['CLIENT_PORT'];
        obj.CLIENT_MAC = records[i].value['CLIENT_MAC'];
        obj.APPLICATION_ACCOUNT = records[i].value['APPLICATION_ACCOUNT'];
        obj.DATA_BASE_ACCOUNT = records[i].value['DATA_BASE_ACCOUNT'];
        obj.DATA_BASE_NAME = records[i].value['DATA_BASE_NAME'];
        obj.DATA_BASE_TYPE = records[i].value['DATA_BASE_TYPE'];
        obj.DATA_BASE_VERSION = records[i].value['DATA_BASE_VERSION'];
        obj.LOGIN_STATUS = records[i].value['LOGIN_STATUS'];
        obj.LOGIN_FAILED_INFO = records[i].value['LOGIN_FAILED_INFO'];
        obj.LOGIN_ERR_CODE = records[i].value['LOGIN_ERR_CODE'];
        obj.LOGIN_TYPE = records[i].value['LOGIN_TYPE'];
        obj.SESSION_ID = records[i].value['OTHER_ID'];
        obj.APM_FLAG = records[i].value['APM_FLAG'];
        obj.LOGIN_SUCCESS_TIME = records[i].value['LOGIN_SUCCESS_TIME'];
        records[i].value.CONTENT = state.convertMapToStr(obj);
        sdc.output.write(records[i]);
    } catch (e) {
        sdc.error.write(records[i], e);
    }
}

// 第一个初始脚本：参见A0100公共脚本

// 第二个初始脚本： 依据数据库类型判断es字段ISO_TYPE
function getIsoType(type) {
    if (type === null) {
        return '';
    }
    switch (type) {
        case 'mysql':
            return "MYSQL";
        case 'oracle':
            return "ORACLE";
        case 'db2':
            return "DB2";
        case 'dm':
            return "DM";
        case 'king':
            return "KING";
        default:
            return "";
    }
}
state.getIsoType = getIsoType;
