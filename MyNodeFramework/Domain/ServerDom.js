var xml = require('../CommonTools/XMLTools');
var config = require('../CommonTools/config');

exports.getServerInfoList = function () {
    return xml.getXMLDate(config.ServerInfoXMLName);
}

//更新服务器信息，包含增加，修改，删除
//当CODE一样时，更新当条数据
exports.updateServerInfo = function (server, isReduce, callBack) {
    var dataArray = xml.getXMLDate(config.ServerInfoXMLName);
    var newArray = [];
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i].ServerCode != server.ServerCode) {
            newArray.push(dataArray[i]);
        }
    }
    if (!isReduce) {
        newArray.push(server);
    }
    xml.addXML(newArray, config.ServerInfoXMLName, callBack);
}

exports.getServerStatusInfo = function () {
    var _cache = global._Cache;
    var arr = [];
    for (key in _cache) {
        var temp = _cache[key];
        if (temp.type == config.ServerStatusCacheKey)
            arr.push(temp.value);
    }
    return arr;
}

