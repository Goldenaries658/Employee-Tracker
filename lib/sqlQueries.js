const connection = require('./connection');

const queries = {
  selectEmployees: async () => {
    queryString = `SELECT e.first_name forename, e.last_name surname, r.title role
       FROM employee e
       INNER JOIN role r ON r.id = e.role_id;`;
    try {
      connection.query(queryString, (err, result) => {
        if (err) throw err;
        console.log(result);

        return result;
      });
    } catch (err) {
      console.error(`ERROR - sqlQueries.js - selectEmployees(): ${err}`);
      return;
    }
  },
};

module.exports = queries;
