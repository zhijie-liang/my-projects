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
        obj.AFFECT_ROWS = records[i].value['root']['AFFECT_ROWS'];
        obj.APM_FLAG = state.convertNullToStr(records[i].value['root']['APM_FLAG']);
        obj.APPLICATION_ACCOUNT = records[i].value['root']['APPLICATION_ACCOUNT'];
        obj.CLIENT_IP = records[i].value['root']['CLIENT_IP'];
        obj.CLIENT_MAC = records[i].value['root']['CLIENT_MAC'];
        obj.CLIENT_PORT = records[i].value['root']['CLIENT_PORT'];
        obj.DATA_BASE_ACCOUNT = records[i].value['root']['DATA_BASE_ACCOUNT'];
        obj.DATA_BASE_EXEC_ID = records[i].value['root']['DATA_BASE_EXEC_ID'];
        obj.DATA_BASE_NAME = records[i].value['root']['DATA_BASE_NAME'];
        obj.DATA_BASE_TYPE = records[i].value['root']['DATA_BASE_TYPE'];
        obj.DATA_BASE_VERSION = records[i].value['root']['DATA_BASE_VERSION'];
        obj.EXEC_RESULT = records[i].value['root']['EXEC_RESULT'];
        obj.EXEC_TIME = records[i].value['root']['EXEC_TIME'];
        obj.FAIL_CODE = records[i].value['root']['FAIL_CODE'];
        obj.FAIL_INFO = state.convertNullToStr(records[i].value['root']['FAIL_INFO']);
        obj.FROM_IP = records[i].value['root']['FROM_IP'];
        obj.FROM_PORT = records[i].value['root']['FROM_PORT'];
        obj.INSTANCE = records[i].value['root']['INSTANCE'];
        obj.OTHER_ID = records[i].value['root']['OTHER_ID'];
        obj.RECORD_TIME = records[i].value['root']['RECORD_TIME'];
        obj.REQ_BYTES = records[i].value['root']['REQ_BYTES'];
        obj.REQ_PACKETS = records[i].value['root']['REQ_PACKETS'];
        obj.REQ_TIME = records[i].value['root']['REQ_TIME'];
        obj.RETRANS_PSPBYTES = records[i].value['root']['RETRANS_PSPBYTES'];
        obj.RETRANS_PSPPKTS = records[i].value['root']['RETRANS_PSPPKTS'];
        obj.RETRANS_REQBYTES = records[i].value['root']['RETRANS_REQBYTES'];
        obj.RETRANS_REQKTS = records[i].value['root']['RETRANS_REQKTS'];
        obj.RSP_BYTES = records[i].value['root']['RSP_BYTES'];
        obj.RSP_PACKET = records[i].value['root']['RSP_PACKET'];
        obj.RSP_TIME = records[i].value['root']['RSP_TIME'];
        obj.SESSION_ID = records[i].value['root']['SESSION_ID'];
        obj.SOURCE_TYPE = state.convertNullToStr(records[i].value['root']['SOURCE_TYPE']);
        obj.SQL = records[i].value['root']['SQL'];
        obj.SEARCH_RESULT = state.convertNullToStr(records[i].value['root']['SEARCH_RESULT']);
        obj.SQL_TYPE = state.convertNullToStr(records[i].value['root']['SQL_TYPE']);
        obj.START_EXEC_TIME = records[i].value['root']['START_EXEC_TIME'];
        obj.TABLE_NAME = state.convertNullToStr(records[i].value['root']['TABLE_NAME']);
        obj.TARGET_IP = records[i].value['root']['TARGET_IP'];
        obj.TARGET_PORT = records[i].value['root']['TARGET_PORT'];
        obj.WARNING_COUNT = records[i].value['root']['WARNING_COUNT'];
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
        newRecord.value.RECORD_TIME_EXEC = newRecord.value['RECORD_TIME'];
        var info = newRecord.value['FAIL_INFO'];
        if (info === '') {
            newRecord.value.FAIL_INFO = info;
        } else {
            newRecord.value.FAIL_INFO = state.Base64ToStr(info);
        }
        // 分类分级
        var level = state.convertStrToMap(records[i].value['dataArr'][0]);
        newRecord.value.SYSTEM_CODE = level['SYSTEM_CODE'];
        newRecord.value.DATA_LEVEL = level['DATA_LEVEL'];
        newRecord.value.CLASS_CODE_INDUSTRY = level['CLASS_CODE_INDUSTRY'];
        newRecord.value.CLASS_CODE_SUBJECT = level['CLASS_CODE_SUBJECT'];
        newRecord.value.CLASS_CODE_AREA = level['CLASS_CODE_AREA'];
        newRecord.value.SENSITIVE_FLAG = level['SENSITIVE_FLAG'];
        newRecord.value.DATA_ELEMENT_CODE = level['DATA_ELEMENT_CODE'];
        newRecord.value.SW_CODE = level['SW_CODE'];
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
        records[i].value.LOG_ID = records[i].value['DATA_BASE_EXEC_ID'];
        records[i].value.RECORD_TIME = records[i].value['START_EXEC_TIME'];
        records[i].value.ISO_TYPE = state.getIsoType(records[i].value['DATA_BASE_TYPE']);
        records[i].value.OPERTION = '001002';
        records[i].value.LOG_TABLE = 'DSSP_DATA_BASE_EXEC';
        var obj = {};
        obj.RECORD_TIME = records[i].value['RECORD_TIME_EXEC'];
        obj.OTHER_ID = records[i].value['OTHER_ID'];
        obj.CLIENT_IP = records[i].value['CLIENT_IP'];
        obj.CLIENT_PORT = records[i].value['CLIENT_PORT'];
        obj.CLIENT_MAC = records[i].value['CLIENT_MAC'];
        obj.APPLICATION_ACCOUNT = records[i].value['APPLICATION_ACCOUNT'];
        obj.DATA_BASE_ACCOUNT = records[i].value['DATA_BASE_ACCOUNT'];
        obj.DATA_BASE_TYPE = records[i].value['DATA_BASE_TYPE'];
        obj.DATA_BASE_VERSION = records[i].value['DATA_BASE_VERSION'];
        obj.DATA_BASE_NAME = records[i].value['DATA_BASE_NAME'];
        obj.TABLE_NAME = records[i].value['TABLE_NAME'];
        obj.INSTANCE = records[i].value['INSTANCE'];
        obj.SQL_TYPE = records[i].value['SQL_TYPE'];
        obj.EXEC_TIME = records[i].value['EXEC_TIME'];
        obj.AFFECT_ROWS = records[i].value['AFFECT_ROWS'];
        obj.EXEC_RESULT = records[i].value['EXEC_RESULT'];
        obj.FAIL_CODE = records[i].value['FAIL_CODE'];
        obj.FAIL_INFO = records[i].value['FAIL_INFO'];
        obj.SQL = records[i].value['SQL'];
        obj.SESSION_ID = records[i].value['SESSION_ID'];
        obj.APM_FLAG = records[i].value['APM_FLAG'];
        records[i].value.CONTENT = state.convertMapToStr(obj);
        sdc.output.write(records[i]);
    } catch (e) {
        // Send record to error
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

