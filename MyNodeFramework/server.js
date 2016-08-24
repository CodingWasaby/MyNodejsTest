var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var RESTful = require('./RESTful_Server/RESTful');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
RESTful.registeAllService(app);
var server = app.listen(9999);

//var monitor = require('./Domain/MonitorDom');
//global._IntervalTime = setInterval(monitor.Monitor, 2000);
//console.log("检测程序正常执行中...");

var ser = require('http').createServer(app);
var io = require('socket.io')(ser);

io.on('connection', function (client) {
    console.log('connection');
    client.on('Send', function (data) {
        io.emit('Send', { aa: 'aa' });
    });
    client.on('event', function (data) {
        console.log(data);
    });
    client.on('disconnect', function () {
        console.log('disconnect');
    });
});
ser.listen(3000);

//var a = 1;
//var test = require('./ClientCall/Call_RESTful');
//test();

