var mysql  = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: 'admin',
        database: 'curso_nodejs'
    });
}

module.exports = function() {
    return createDBConnection;
}
