const connection = require('./connection');

const queries = {
  selectEmployees: async () => {
    const queryString = `SELECT e.first_name forename, e.last_name surname, r.title role
       FROM employee e
       INNER JOIN role r ON r.id = e.role_id;`;
    try {
      connection.query(queryString, (err, result) => {
        if (err) throw err;
        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - selectEmployees(): ${err}`);
      return;
    }
  },
  selectRoles: async () => {
    const queryString = `SELECT r.title, r.salary,  d.name department
      FROM role r
      INNER JOIN department d ON r.department_id = d.id;`;
    try {
      connection.query(queryString, (err, result) => {
        if (err) throw err;
        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - selectRoles(): ${err}`);
      return;
    }
  },
  selectDepartment: async () => {
    const queryString = `SELECT name FROM department`;
    try {
      connection.query(queryString, (err, result) => {
        if (err) throw err;
        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - selectDepartment(): ${err}`);
      return;
    }
  },
  insertEmployee: async (first_name, last_name, role_id, manager_id) => {
    const queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
       VALUES (?, ?, ?, ?)`;
    const valueArr = [first_name, last_name, role_id, manager_id];
    try {
      connection.query(queryString, valueArr, (err, result) => {
        if (err) throw err;
        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - insertEmployee(): ${err}`);
      return;
    }
  },
};

module.exports = queries;
