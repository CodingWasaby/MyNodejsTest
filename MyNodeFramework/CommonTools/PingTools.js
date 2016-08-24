var ping = require('ping');

//var hosts = ['192.168.41.244', 'google.com', 'yahoo.com'];
//hosts.forEach(function (host) {
//    ping.sys.probe(host, function (isAlive) {
//        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
//        console.log(msg);
//    });
//});

exports.PingHost = function (host, callBack) {
    ping.promise.probe(host.Adress).then(function (res) {
        var eIndex = res.output.lastIndexOf('=');
        var ta = res.output.substring(eIndex + 1); //取平均响应时间
        if (!res.alive) {
            callBack("超时", host);
        }
        else {
            callBack(ta, host);
        }
    });
}