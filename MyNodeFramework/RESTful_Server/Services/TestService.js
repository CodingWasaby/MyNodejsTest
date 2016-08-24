var config = require('../../CommonTools/Config');
var dbConn = require('../../CommonTools/SQLHandler/MySQLConnection');
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fileTools = require('../../CommonTools/FileTools');

router.get('/listUsers', function (req, res) {
    dbConn.Query("select  * from best4_ever.ClassMate ", null, function (data) {
        res.set(config.ResponseHeader_Default);
        res.send(JSON.stringify(data));
    });
})

router.post('/devices', function (req, res) {
    res.set(config.ResponseHeader_Default);
    res.send({ status: "success", body: req.body });
})

router.post('/file-upload', function (req, res) {
    //只能用POSTMAN 测试，HttpRequest 不行
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        for (key in files) {
            fileTools.upload(files[key]);
        }
        res.set(config.ResponseHeader_Default);
        res.send({ status: "success", body: "uploadSuccess" });
    });
})

exports.router = router;