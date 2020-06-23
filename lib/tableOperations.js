const connection = require('./connection');
const mysql = require('mysql');
const colors = require('colors');

const queries = {
  convertNameToId: async (table, colName, name) => {
    const queryString = `SELECT id FROM ?? WHERE ?? = ?`;
    try {
      connection.query(queryString, [table, colName, name], (err, result) => {
        if (err) throw err;
        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - convertNameToID(): ${err}`);
      return;
    }
  },
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
  selectManagers: async () => {
    const queryString = `SELECT e.first_name forename, e.last_name surname, r.title role
      FROM employee e
      INNER JOIN role r ON r.id = e.role_id
      WHERE e.manager_id IS NULL;`;
    try {
      connection.query(queryString, (err, result) => {
        if (err) throw err;
        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - selectManagers(): ${err}`);
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
  selectDepartments: async () => {
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
       VALUES (?, ?, ?, ?);`;
    const valueArr = [first_name, last_name, role_id, manager_id];
    try {
      connection.query(queryString, valueArr, (err, result) => {
        if (err) throw err;
        console.log('Saved!'.green.bold);
        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - insertEmployee(): ${err}`);
      return;
    }
  },
  insertRole: async (title, salary, department_id) => {
    const queryString = `INSERT INTO role (title, salary, department_id)
       VALUES (?, ?, ?);`;
    const valueArr = [title, salary, department_id];
    try {
      connection.query(queryString, valueArr, (err, result) => {
        if (err) throw err;
        console.log('Saved!'.green.bold);
        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - insertRole(): ${err}`);
      return;
    }
  },
  insertDepartment: async (name) => {
    const queryString = `INSERT INTO department (name)
       VALUES (?);`;
    try {
      connection.query(queryString, name, (err, result) => {
        if (err) throw err;
        console.log('Saved!'.green.bold);
        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - insertDepartment(): ${err}`);
      return;
    }
  },
  updateEmployeeRole: async (id, role_id) => {
    const queryString = `UPDATE employee 
    SET role = ?
    WHERE id = ?;`;
    try {
      connection.query(queryString, [role_id, id], (err, result) => {
        if (err) throw err;
        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - updateEmployeeRole(): ${err}`);
      return;
    }
  },
};

module.exports = queries;
