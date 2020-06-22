const inquirer = require('inquirer');
const queries = require('./sqlQueries');

const viewTracker = async () => {
  const { choice: type } = await inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to view?',
    choices: ['Employees', 'Roles', 'Departments'],
  });
  switch (type) {
    case 'Employees':
      queries.selectEmployees();
      break;
    case 'Roles':
      queries.selectRoles();
      break;
    case 'Departments':
      queries.selectDepartments();
      break;
    default:
      break;
  }
};

module.exports = viewTracker;