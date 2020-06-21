const connection = require('./connection');

const orm = {
  selectWhere: async (
    tableName,
    searchColOne,
    colOneValue,
    searchColTwo,
    colTwoValue
  ) => {
    queryString = 'SELECT * FROM ?? WHERE ?? = ? AND ?? = ?';
    try {
      connection.query(
        queryString,
        [tableName, searchColOne, colOneValue, searchColTwo, colTwoValue],
        (err, result) => {
          if (err) throw err;
          return result;
        }
      );
    } catch (err) {
      console.error(`ERROR - orm.js - selectWhere(): ${err}`);
      return;
    }
  },
};

module.exports = orm;
