const connection = require('./connection');
const colors = require('colors');
const util = require('util');

const connectionPromise = util.promisify(connection.query).bind(connection);

const selectQueryFromTable = async (queryString) => {
  const resultArr = [];
  try {
    const result = await connectionPromise(queryString);
    for (i in result) {
      resultArr.push(JSON.parse(JSON.stringify(result[i])));
    }
    return resultArr;
  } catch (err) {
    console.error(
      `ERROR - tableOperations.js - selectQueryFromTable(): ${err}`.red.bold
    );
  }
};

const insertQueryIntoTable = async (queryString, valueArr) => {
  try {
    await connectionPromise(queryString, valueArr);
    console.log('Saved!'.green.bold);
    return;
  } catch (err) {
    console.error(
      `ERROR - tableOperations.js - insertQueryIntoTable: ${err}`.red.bold
    );
  }
};

const queries = {
  convertNameToId: async (table, colName, name) => {
    const queryString = `SELECT id FROM ?? WHERE ?? = ?`;
    try {
      return (await connectionPromise(queryString, [table, colName, name]))[0]
        .id;
    } catch (err) {
      console.error(
        `ERROR - tableOperations.js - convertNameToID(): ${err}`.red.bold
      );
    }
  },
  selectEmployees: async () => {
    const queryString = `SELECT e.first_name forename, e.last_name surname, r.title role
       FROM employee e
       INNER JOIN role r ON r.id = e.role_id;`;
    try {
      return await selectQueryFromTable(queryString);
    } catch (err) {
      console.error(
        `ERROR - tableOperations.js - selectEmployees(): ${err}`.red.bold
      );
    }
  },
  selectManagers: async () => {
    const queryString = `SELECT e.first_name forename, e.last_name surname
      FROM employee e
      INNER JOIN role r ON r.id = e.role_id
      WHERE e.manager_id IS NULL;`;
    try {
      const result = await selectQueryFromTable(queryString);
      return result;
    } catch (err) {
      console.error(
        `ERROR - tableOperations.js - selectManagers(): ${err}`.red.bold
      );
    }
  },
  selectRoles: async () => {
    const queryString = `SELECT r.title, r.salary,  d.name department
      FROM role r
      INNER JOIN department d ON r.department_id = d.id;`;
    const resultArr = [];
    try {
      return await selectQueryFromTable(queryString);
    } catch (err) {
      console.error(
        `ERROR - tableOperations.js - selectRoles(): ${err}`.red.bold
      );
    }
  },
  selectDepartments: async () => {
    const queryString = `SELECT name FROM department`;
    try {
      return await selectQueryFromTable(queryString);
    } catch (err) {
      console.error(
        `ERROR - tableOperations.js - selectDepartment(): ${err}`.red.bold
      );
    }
  },
  insertEmployee: async (first_name, last_name, role_id, manager_id) => {
    const queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
       VALUES (?, ?, ?, ?);`;
    const valueArr = [first_name, last_name, role_id, manager_id];
    try {
      return await insertQueryIntoTable(queryString, valueArr);
    } catch (err) {
      console.error(
        `ERROR - tableOperations.js - insertEmployee(): ${err}`.red.bold
      );
    }
  },
  insertRole: async (title, salary, department_id) => {
    const queryString = `INSERT INTO role (title, salary, department_id)
       VALUES (?, ?, ?);`;
    const valueArr = [title, salary, department_id];
    try {
      return await insertQueryIntoTable(queryString, valueArr);
    } catch (err) {
      console.error(
        `ERROR - tableOperations.js - insertRole(): ${err}`.red.bold
      );
    }
  },
  insertDepartment: async (name) => {
    const queryString = `INSERT INTO department (name)
       VALUES (?);`;
    try {
      return await insertQueryIntoTable(queryString, name);
    } catch (err) {
      console.error(
        `ERROR - tableOperations.js - insertDepartment(): ${err}`.red.bold
      );
    }
  },
  updateEmployeeRole: async (id, role_id) => {
    const queryString = `UPDATE employee 
    SET role = ?
    WHERE id = ?;`;
    try {
      return connectionPromise(queryString, [role_id, id]);
    } catch (err) {
      console.error(
        `ERROR - tableOperations.js - updateEmployeeRole(): ${err}`.red.bold
      );
    }
  },
};

module.exports = queries;
