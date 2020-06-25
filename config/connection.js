const mysql = require('mysql');

module.exports = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'employee-tracker',
  password: '',
  database: 'employees_db',
});
