module.exports = function () {
    ///http://192.168.41.244:10002/Design_Time_Addresses/FMDSWcfServer/ArrangeService/
    var querystring = require('querystring');
    var http = require('http');
    var postData = JSON.stringify({});

    var options = {
        hostname: '192.168.41.244',
        port: 10002,
        path: '/Design_Time_Addresses/FMDSWcfServer/ArrangeServices/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };


    var req = http.request(options, (res) => {

        var dateRes = Date.now();
        console.log(dateReq);
        console.log(dateRes);
        console.log(dateReq - dateRes);
        console.log((dateReq - dateRes) / 1000);
        //必须有 data 事件才能触发结束事件
        //res.on('data', (chunk) => {
            
        //});

        //res.on('end', function (a) {
        //    var dateRes = Date.now();
        //    console.log("finish");

        //});
    });
    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });
    var dateReq = Date.now();
    req.end();
}