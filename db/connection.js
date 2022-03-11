const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username
        user: 'root',
        password: '',
        database: 'employment',
    },
);


module.exports = db;