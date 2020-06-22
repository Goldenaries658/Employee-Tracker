const inquirer = require('inquirer');
const {
  selectEmployees,
  selectDepartments,
  selectRoles,
} = require('./tableOperations');

const viewTracker = async () => {
  const { choice: type } = await inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to view?',
    choices: ['Employees', 'Roles', 'Departments'],
  });
  switch (type) {
    case 'Employees':
      selectEmployees();
      break;
    case 'Roles':
      selectRoles();
      break;
    case 'Departments':
      selectDepartments();
      break;
    default:
      break;
  }
};

module.exports = viewTracker;
