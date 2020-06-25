const inquirer = require('inquirer');
const {
  updateEmployeeRole,
  selectEmployees,
  selectRoles,
  convertNameToId,
} = require('./tableOperations');
const { formatEmployees, formatRoles } = require('./resultFormatters');
const { validateString } = require('./inputValidators');

const updateTracker = async () => {
  try {
    // Retrieving and formatting employee list
    const employeeResult = await selectEmployees();
    const roleResult = await selectRoles();
    const employees = formatEmployees(employeeResult);
    const roles = formatRoles(roleResult);
    const questions = [
      {
        type: 'list',
        name: 'employeeName',
        message: 'Select employee',
        choices: employees,
      },
      {
        type: 'list',
        name: 'newRoleName',
        message: ({ employeeName }) => `Enter ${employeeName}'s new role`,
        choices: roles,
        validate: validateString,
      },
    ];

    const { newRoleName, employeeName } = await inquirer.prompt(questions);

    // Converting names back to ID's
    const newRoleId = await convertNameToId('role', 'title', newRoleName);
    const employeeForename = employeeName.split(' ', 1)[0];
    const employeeId = await convertNameToId(
      'employee',
      'first_name',
      employeeForename
    );

    await updateEmployeeRole(employeeId, newRoleId);
  } catch (err) {
    console.error(`ERROR - updateTracker.js - updateTracker(): ${err}`);
  }
};

module.exports = updateTracker;
