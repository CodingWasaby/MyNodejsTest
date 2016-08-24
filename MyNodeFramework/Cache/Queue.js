function add(key, method, joinTime) {
    if (key == undefined || key == null)
        return;
    var _queue = global._Queue;
    if (_queue[key]) {
        _queue[key].dolist.push({
            method: method,
            joinTime: joinTime
        });
    } else {
        _queue[key] = {
            dolist: []
        };
        _queue[key].dolist.push({
            method: method,
            joinTime: joinTime
        });
    }
}

function doNext(key) {
    var _queue = global._Queue;
    if (_queue[key]) {
        _queue[key].dolist[0].method();
        _queue[key].dolist.shift();
        if (_queue[key].dolist.length == 0)
            _queue[key] = null;
        doNext(key);
    }
}

var pushQueue = function (key, method, joinTime) {
    add(key, method, joinTime);
    doNext(key);
}

exports.createQueue = function () {
    var obj = {
        queue: {},
        pushQueue: pushQueue
    }
    return obj;
};
