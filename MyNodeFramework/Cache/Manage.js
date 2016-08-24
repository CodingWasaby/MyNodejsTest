var queue = require('./Queue');
var cache = require('./Cache');

exports.setCache = function (key, type, value, invalidTime) {
    if (global._Cache == undefined)
        global._Cache = cache.createCache();
    if (global._Queue == undefined)
        global._Queue = queue.createQueue();
    global._Queue.pushQueue(type, function () {
        global._Cache.set(key, type, value, invalidTime);
    }, Date.now());
}
