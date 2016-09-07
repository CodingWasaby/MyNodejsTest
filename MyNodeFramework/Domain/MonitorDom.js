var querystring = require('querystring');
var http = require('http');
var serverDom = require('./ServerDom');
var serviceDom = require('./ServiceDom');
var manage = require('../Cache/Manage');
var ping = require('../CommonTools/PingTools');
var config = require('../CommonTools/Config');
var timeTools = require('../CommonTools/TimeTools');
var util = require('util');

var date = Date.now();
exports.Monitor = function () {
    MonitorServer();
    MonitorService();
    //console.log("\u001b[2J\u001b[0;0H");
    //console.log("检测程序正常执行中...");
    //console.log("程序已运行：" + timeTools.MillisecondToTime(Date.now() - date));
}

function MonitorServer() {
    var servers = serverDom.getServerInfoList();
    for (key in global._Cache) {
        if (global._Cache[key].type == config.ServerStatusCacheKey) {
            if (!IsContain_Server(servers, key) && typeof (global._Cache[key]) != 'function')
                delete global._Cache[key];
        }
    }
    for (var i = 0; i < servers.length; i++) {
        var ser = servers[i];
        ping.PingHost(ser, function (time, host) {
            host.AverageResponseTime = time;
            manage.setCache(host.ServerCode, config.ServerStatusCacheKey, host);
        });
    }
}
function IsContain_Server(servers, ServerCode) {
    for (var i = 0; i < servers.length; i++) {
        if (servers[i].ServerCode == ServerCode)
            return true;
    }
    return false;
}

function MonitorService() {
    var services = serviceDom.getServiceInfoList();
    for (key in global._Cache) {
        if (global._Cache[key].type == config.ServiceStatusCacheKey) {
            if (!IsContain_Service(services, key) && typeof (global._Cache[key]) != 'function')
                delete global._Cache[key];
        }
    }
    for (var i = 0; i < services.length; i++) {
        var ser = services[i];
        ServiceCall(ser);
    }
}

function ServiceCall(service) {
    var options = {
        hostname: service.Adress,
        port: service.Port,
        path: service.Path,
        method: service.RequestMethod,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var req = http.request(options, (res) => {
        var dateRes = Date.now();
        var resTime = (Date.now() - timeReq) / 1000;
        service.AverageResponseTime = resTime + "s";
        service.StatusMessage = res.statusMessage;
        service.StatusCode = res.statusCode;
        manage.setCache(service.ServiceCode, config.ServiceStatusCacheKey, service);

    });
    req.on('error', (e) => {
        var dateRes = Date.now();
        var resTime = (Date.now() - timeReq) / 1000;
        service.AverageResponseTime = resTime + "s";
        service.StatusMessage = e.message;
        service.StatusCode = 400;
        manage.setCache(service.ServiceCode, config.ServiceStatusCacheKey, service);
    });
    var timeReq = Date.now();
    if (service.RequestMethod == 'POST')
        req.write(service.RequestParam);
    req.end();
}


function IsContain_Service(services, ServiceCode) {
    for (var i = 0; i < services.length; i++) {
        if (services[i].ServiceCode == ServiceCode)
            return true;
    }
    return false;
}




