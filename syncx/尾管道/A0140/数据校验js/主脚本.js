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
    // root转换
    var obj = {};
    //////////////////////////////////////////////////////////////////////////////////
    obj.REMOTE_CONTROL_EXEC_ID = records[i].value['root']['REMOTE_CONTROL_EXEC_ID'];
    obj.RECORD_TIME = records[i].value['root']['RECORD_TIME'];
    obj.OTHER_ID = records[i].value['root']['OTHER_ID'];
    obj.FROM_IP = records[i].value['root']['FROM_IP'];
    obj.FROM_PORT = records[i].value['root']['FROM_PORT'];
    obj.TARGET_IP = records[i].value['root']['TARGET_IP'];
    obj.TARGET_PORT = records[i].value['root']['TARGET_PORT'];
    obj.EXEC_COMMOND = records[i].value['root']['EXEC_COMMOND'];
    obj.EXEC_RESULT = records[i].value['root']['EXEC_RESULT'];
    obj.SESSION_ID = records[i].value['root']['SESSION_ID'];
    obj.FAILED_INFO = records[i].value['root']['FAILED_INFO'];
    obj.REQ_BYTES = records[i].value['root']['REQ_BYTES'];
    obj.RSP_BYTES = records[i].value['root']['RSP_BYTES'];
    obj.REQ_PACKETS = records[i].value['root']['REQ_PACKETS'];
    obj.RSP_PACKET = records[i].value['root']['RSP_PACKET'];
    obj.RETRANS_REQKTS = records[i].value['root']['RETRANS_REQKTS'];
    obj.RETRANS_REQBYTES = records[i].value['root']['RETRANS_REQBYTES'];
    obj.RETRANS_PSPPKTS = records[i].value['root']['RETRANS_PSPPKTS'];
    obj.RETRANS_PSPBYTES = records[i].value['root']['RETRANS_PSPBYTES'];
    obj.REQ_TIME = records[i].value['root']['REQ_TIME'];
    obj.RSP_TIME = records[i].value['root']['RSP_TIME'];
    obj.APM_FLAG = records[i].value['root']['APM_FLAG'];
    // obj.APM_FLAG = state.convertNullToStr(records[i].value['root']['APM_FLAG']);
    obj.SOURCE_TYPE = records[i].value['root']['SOURCE_TYPE'];
    obj.DATA_LEVEL = records[i].value['root']['DATA_LEVEL'];
    obj.CLASS_CODE_INDUSTRY = records[i].value['root']['CLASS_CODE_INDUSTRY'];
    obj.CLASS_CODE_SUBJECT = records[i].value['root']['CLASS_CODE_SUBJECT'];
    obj.CLASS_CODE_AREA = records[i].value['root']['CLASS_CODE_AREA'];
    obj.SENSITIVE_FLAG = records[i].value['root']['SENSITIVE_FLAG'];
    obj.DATA_ELEMENT_CODE = records[i].value['root']['DATA_ELEMENT_CODE'];
    //////////////////////////////////////////////////////////////////////////////////////////////
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
      ////////////////////////////////////////////////////////
      records[i].value.source_name = 'DSSP_REMOTE_CONTROL_EXEC';
      ////////////////////////////////////////////////////////
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
      /////////////////////////////////////////////////////////
      records[i].value.source_name = 'DSSP_REMOTE_CONTROL_EXEC';
      ///////////////////////////////////////////////////////////
      records[i].value.ts = timestamp;
      records[i].value.data = originData;
      sdc.output.write(records[i]);
      continue;
    }
    // 校验root
    var root_hash = records[i].value['payload']['root_hash'];
    var rootStr = state.convertMapToStr2(obj);
    var roothash = state.hashcode(rootStr) + '';
    if (roothash != root_hash) {
      records[i].value.flag = 'F'
      records[i].value.err_msg = 'root校验hash值不一致';
      records[i].value.app_name = 'end';
      records[i].value.err_code = '200001';
      ////////////////////////////////////////////////////////
      records[i].value.source_name = 'DSSP_REMOTE_CONTROL_EXEC';
      ////////////////////////////////////////////////////////
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