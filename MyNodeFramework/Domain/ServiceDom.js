var xml = require('../CommonTools/XMLTools');
var config = require('../CommonTools/config');

exports.getServiceInfoList = function () {
    return xml.getXMLData(config.ServiceInfoXMLName);
}

//更新服务信息，包含增加，修改，删除
//当CODE一样时，更新当条数据
exports.updateServiceInfo = function (Service, isReduce, callBack) {
    var dataArray = xml.getXMLData(config.ServiceInfoXMLName);
    var newArray = [];
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i].ServiceCode != Service.ServiceCode) {
            newArray.push(dataArray[i]);
        }
    }
    if (!isReduce) {
        newArray.push(Service);
    }
    xml.addXML(newArray, config.ServiceInfoXMLName, callBack);
}

exports.getServiceStatusInfo = function () {
    var _cache = global._Cache;
    var arr = [];
    for (key in _cache) {
        var temp = _cache[key];
        if (temp.type == config.ServiceStatusCacheKey)
            arr.push(temp.value);
    }
    return arr;
}