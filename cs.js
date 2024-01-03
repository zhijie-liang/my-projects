// Sample JavaScript code
var records = sdc.records;
for (var i = 0; i < records.length; i++) {
  try {
    listDataArray = records[i].value
    // 遍历 listDataArray 中的每个元素，重新组织数据格式
    for (var j = 0; j < listDataArray.length; j++) {
      // 使用 sdc.createRecord 创建 ScriptRecord
      var newRecord = sdc.createRecord('newRecordId' + j);

      // 设置新的记录字段值
      newRecord.value = {
        "ROW": listDataArray[j].ROW,
        "RecordTime": listDataArray[j].RECORDTIME,
        "LinkID": listDataArray[j].LINKID,
        "InterfaceID": listDataArray[j].INTERFACEID,
        "CardID": listDataArray[j].CARDID,
        "DeviceID": listDataArray[j].DEVICEID,
        "PageID": listDataArray[j].PAGEID,
        "PageURL": listDataArray[j].PAGEURL,
        "ClientIPLower": listDataArray[j].CLIENTIPLOWER,
        "ClientIPHigher": listDataArray[j].CLIENTIPHIGHER,
        "StartTime": listDataArray[j].STARTTIME,
        "EndTime": listDataArray[j].ENDTIME,
        "PageTime": listDataArray[j].PAGETIME,
        "PairCount": listDataArray[j].PAIRCOUNT,
        "BytesReq": listDataArray[j].BYTESREQ,
        "BytesRsp": listDataArray[j].BYTESRSP,
        "PacketsReq": listDataArray[j].PACKETSREQ,
        "PacketRsp": listDataArray[j].PACKETRSP,
        "DNSLookups": listDataArray[j].DNSLOOKUPS,
        "NewConnections": listDataArray[j].NEWCONNECTIONS,
        "RedirCountsInPage": listDataArray[j].REDIRCOUNTSINPAGE,
        "RedirCountsPrePage": listDataArray[j].REDIRCOUNTSPREPAGE,
        "RedirBeg": listDataArray[j].REDIRBEG,
        "RedirTime": listDataArray[j].REDIRTIME,
        "KeepLiveCount": listDataArray[j].KEEPLIVECOUNT,
        "codeCount304": listDataArray[j].CODECOUNT304,
        "Count4XX5xx": listDataArray[j].COUNT4XX5XX,
        "Cachehitcount": listDataArray[j].CACHEHITCOUNT,
        "Cachehitbytes": listDataArray[j].CACHEHITBYTES,
        "Cachemisscount": listDataArray[j].CACHEMISSCOUNT,
        "Cachemissbytes": listDataArray[j].CACHEMISSBYTES,
        "applicationcount": listDataArray[j].APPLICATIONCOUNT,
        "applicationbytes": listDataArray[j].APPLICATIONBYTES,
        "audiocount": listDataArray[j].AUDIOCOUNT,
        "audiobytes": listDataArray[j].AUDIOBYTES,
        "imagecount": listDataArray[j].IMAGECOUNT,
        "imagebytes": listDataArray[j].IMAGEBYTES,
        "messagecount": listDataArray[j].MESSAGECOUNT,
        "messagebytes": listDataArray[j].MESSAGEBYTES,
        "Textcount": listDataArray[j].TEXTCOUNT,
        "textbytes": listDataArray[j].TEXTBYTES,
        "videocount": listDataArray[j].VIDEOCOUNT,
        "videobytes": listDataArray[j].VIDEOBYTES,
        "multipartcount": listDataArray[j].MULTIPARTCOUNT,
        "multipartbytes": listDataArray[j].MULTIPARTBYTES,
        "Othercount": listDataArray[j].OTHERCOUNT,
        "otherbytes": listDataArray[j].OTHERBYTES,
        "AppID": listDataArray[j].APPID,
        "ConfID": listDataArray[j].CONFID,
        "LoadTime": listDataArray[j].LOADTIME,
        "UA": listDataArray[j].UA,
        "os": listDataArray[j].OS,
        "explorer": listDataArray[j].EXPLORER,
        "device": listDataArray[j].DEVICE,
        "ApmFlag": listDataArray[j].APMFLAG,
        "usersystem": listDataArray[j].USERSYSTEM,
      };

      // 将新的 ScriptRecord 对象写入处理器输出
      sdc.output.write(newRecord);
    }
  } catch (e) {
    // Send record to error
    sdc.error.write(records[i], e);
  }
}