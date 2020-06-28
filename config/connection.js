const mysql = require('mysql');

// Restricted user for testing specific functions
// Deprecated upon release
module.exports = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'employee-tracker',
  password: '',
  database: 'employees_db',
});
