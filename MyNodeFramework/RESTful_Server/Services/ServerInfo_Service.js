var express = require('express');
var router = express.Router();
var config = require('../../CommonTools/Config');
var serverDom = require('../../Domain/ServerDom');
var monitor = require('../../Domain/MonitorDom');

router.get('/serverStatusInfo', function (req, res) {
    var _cache = global._Cache;
    var arr = [];
    for (key in _cache) {
        var temp = _cache[key];
        if (temp) {
            if (temp.type == config.ServerStatusCacheKey)
                arr.push(temp.value);
        }
    }
    res.set(config.ResponseHeader_Default);
    res.send(JSON.stringify(arr));
});

router.get('/serverInfoList', function (req, res) {
    var arr = serverDom.getServerInfoList();
    res.set(config.ResponseHeader_Default);
    res.send(JSON.stringify(arr));
});

router.post('/addserver', function (req, res) {
    //var a = JSON.parse(req.body);
    serverDom.updateServerInfo(req.body, false, function () {
        res.set(config.ResponseHeader_Default);
        res.send({ Status: "success" });
    });
});

router.post('/deleteserver', function (req, res) {
    serverDom.updateServerInfo(req.body, true, function () {
        res.set(config.ResponseHeader_Default);
        res.send({ Status: "success" });
    });
});

exports.router = router;