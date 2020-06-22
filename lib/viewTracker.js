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
      await selectEmployees();
      break;
    case 'Roles':
      await selectRoles();
      break;
    case 'Departments':
      await selectDepartments();
      break;
    default:
      break;
  }
};

module.exports = viewTracker;
