const inquirer = require('inquirer');
const {
  selectEmployees,
  selectDepartments,
  selectRoles,
} = require('./tableOperations');
const { printTable } = require('console-table-printer');

const viewTracker = async () => {
  try {
    const { choice: type } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to view?',
      choices: ['Employees', 'Roles', 'Departments'],
    });
    switch (type) {
      case 'Employees':
        printTable(
          // Changing header to uppercase
          (await selectEmployees()).map(({ forename, surname, role }) => ({
            Forename: forename,
            Surname: surname,
            Role: role,
          }))
        );
        break;
      case 'Roles':
        printTable(
          // Changing header to uppercase
          (await selectRoles()).map(({ title, salary, department }) => ({
            Title: title,
            Salary: salary,
            Department: department,
          }))
        );
        break;
      case 'Departments':
        printTable(
          // Changing header to uppercase
          (await selectRoles()).map(({ name }) => ({ Name: name }))
        );
        break;
      default:
        break;
    }
  } catch (err) {
    console.error(`ERROR - viewTracker.js - viewTracker(): ${err}`);
  }
};

module.exports = viewTracker;
