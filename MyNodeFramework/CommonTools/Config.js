﻿exports.MySQL_Config = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'aska',
    password: 'aska201228',
    database: 'best4_ever',
    waitForConnections: true
};
exports.MSSQL_Config = {
    user: 'sa',
    password: 'qazWSX12!@',
    server: '192.168.42.183',
    database: 'DB_FMDS',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

exports.ResponseHeader_Default = {
    'Content-Type': 'text/json',
    'Encodeing': 'utf8'
};

exports.CryptoParam = {
    algorithm: 'aes-256-cbc',
    key: 'aska_Wasaby@hotmail.com'
};

exports.FilePath = './uploadFiles/';
exports.XMLPath = './XMLFiles/';

exports.ServerInfoXMLName = 'ServerInfoList';
exports.ServerStatusCacheKey = 'ServerStatus';

exports.ServiceInfoXMLName = 'ServiceInfoList';
exports.ServiceStatusCacheKey = 'ServiceStatus';
