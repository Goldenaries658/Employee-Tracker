const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'employee-tracker',
    password: '',
    database: 'employees_db',
});

module.exports = connection;
