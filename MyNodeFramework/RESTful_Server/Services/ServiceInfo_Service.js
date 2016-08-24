var express = require('express');
var router = express.Router();
var config = require('../../CommonTools/Config');
var serviceDom = require('../../Domain/serviceDom');

router.get('/serviceStatusInfo', function (req, res) {
    var _cache = global._Cache;
    var arr = [];
    for (key in _cache) {
        var temp = _cache[key];
        if (temp.type == config.ServiceStatusCacheKey)
            arr.push(temp.value);
    }
    res.set(config.ResponseHeader_Default);
    res.send(JSON.stringify(arr));
});

router.get('/serviceInfoList', function (req, res) {
    var arr = serviceDom.getServiceInfoList();
    res.set(config.ResponseHeader_Default);
    res.send(JSON.stringify(arr));
});

router.post('/addservice', function (req, res) {
    serviceDom.updateServiceInfo(req.body, false, function () {
        res.set(config.ResponseHeader_Default);
        res.send({ Status: "success" });
    });
});

router.post('/deleteservice', function (req, res) {
    serviceDom.updateServiceInfo(req.body, true, function () {
        res.set(config.ResponseHeader_Default);
        res.send({ Status: "success" });
    });
});

exports.router = router;