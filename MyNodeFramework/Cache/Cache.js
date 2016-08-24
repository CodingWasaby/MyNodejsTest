
var set = function (key, type, value, invalidTime) {
    var _cache = global._Cache;
    if (_cache[key]) {
        _cache[key].value = value;
        _cache[key].type = type;
        _cache[key].invalidTime = invalidTime;
    } else {
        _cache[key] = {
            value: value,
            type: type,
            invalidTime: invalidTime
        };
    }
}

var get = function (key) {
    var _cache = global._Cache;
    if (_cache[key]) {
        if (_cache[key].invalidTime == undefined || _cache[key].invalidTime == null)
            return _cache[key];
        else {
            if (Date.now < _cache[key].invalidTime)
                return __cache[key];
            else {
                delete _cache[key]; return null;
            }
        }
    }
    return null;
}

var remove = function (key) {
    var _cache = global._Cache;
    if (_cache[key])
        delete _cache[key];
}

exports.createCache = function () {
    var obj = {
        set: set,
        get: get,
        remove: remove
    }
    return obj;
};