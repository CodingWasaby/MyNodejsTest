exports.registeAllService = registeAllService;

function registeAllService(app) {
    //测试
    var test = require('./Services/TestService');
    app.use('/test', test.router);

    var server = require('./Services/ServerInfo_Service');
    app.use('/Server', server.router);

    var service = require('./Services/ServiceInfo_Service');
    app.use('/Service', service.router);
}
