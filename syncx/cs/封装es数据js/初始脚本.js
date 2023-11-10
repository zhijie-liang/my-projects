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

function convertMapToStr(obj) {
  if (obj === null) {
    return null;
  }
  var jsonStr = JSON.stringify(obj);
  return jsonStr;
}

state.convertMapToStr = convertMapToStr;
state.getIsoType = getIsoType;