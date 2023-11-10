var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    // 拆分字段  
    var newRecord = sdc.createRecord(records[i].sourceId + ':newRecordId');
    newRecord.value = records[i].value['obj'];
////////////////////////////////////////////////////////////////////////////
    newRecord.value.RECORD_TIME_EXEC = newRecord.value['RECORD_TIME'];
////////////////////////////////////////////////////////////////////////////
    // 地域ID
    var region = state.convertStrToMap(records[i].value['dataArr'][0]);
    newRecord.value.FROM_REGION_ID = region['FROM_REGION_ID'];
    newRecord.value.TARGET_REGION_ID = region['TARGET_REGION_ID'];
    // mac 
    var mac = state.convertStrToMap(records[i].value['dataArr'][1]);
    newRecord.value.FROM_MAC = mac['FROM_MAC'];
    newRecord.value.TARGET_MAC = mac['TARGET_MAC'];
    sdc.output.write(newRecord);
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}