const inquirer = require('inquirer');
const colors = require('colors');
const mysql = require('mysql');

const { viewTracker } = require('./lib/tableOperations');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'employee-tracker',
  password: '',
  database: 'employees_db',
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
  teamManager();
});

const teamManager = async () => {
  console.log('Welcome to the Employee Tracker');
  const { functionChoice } = await inquirer.prompt({
    type: 'list',
    name: 'functionChoice',
    message: 'What would you like to do?',
    choices: ['Add', 'View', 'Update'],
  });
  switch (functionChoice) {
    case 'Add':
      await addToTracker();
      teamManager();
      break;
    case 'View':
      await viewTracker();
      teamManager();
      break;
    case 'Update':
      await updateTracker();
      teamManager();
      break;
    default:
      break;
  }
  console.log('Exiting App.');
};
