const inquirer = require('inquirer');
const { validateString, validateNumber } = require('./inputValidator');

const {
  formatDepartments,
  formatRoles,
  formatEmployees,
} = require('./resultFormatters');

const {
  selectManagers,
  selectRoles,
  selectDepartments,
  insertEmployee,
  insertRole,
  insertDepartment,
  convertNameToId,
} = require('./tableOperations');

const addToTracker = async () => {
  try {
    const { type } = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'What would you like to add?',
      choices: ['Employee', 'Role', 'Department'],
    });

    // Fetching data from db
    const managerResult = await selectManagers();
    const rolesResult = await selectRoles();
    const departmentsResult = await selectDepartments();
    // Creating arrays with names from tables
    const managerNames = formatEmployees(managerResult);
    const roleNames = formatRoles(rolesResult);
    const departmentNames = formatDepartments(departmentsResult);
    // Dynamic questions hash
    const questions = [
      {
        name: 'name',
        message: `Enter ${type === 'Employee' ? 'forename' : 'name'}`,
        validate: validateString,
      },
      {
        name: 'surname',
        message: 'Enter surname',
        validate: validateString,
        when: type === 'Employee',
      },
      {
        type: 'list',
        name: 'roleName',
        message: 'Select employee role',
        choices: roleNames,
        when: type === 'Employee',
      },
      {
        type: 'list',
        name: 'managerName',
        message: 'Select employee manager',
        choices: managerNames,
        when: type === 'Employee',
      },
      {
        name: 'salary',
        message: 'Enter Salary',
        validate: validateNumber,
        when: type === 'Role',
      },
      {
        type: 'list',
        name: 'departmentName',
        message: 'Select department',
        choices: departmentNames,
        when: type === 'Role',
      },
    ];

    switch (type) {
      case 'Employee':
        const {
          name: employeeName,
          surname,
          roleName,
          managerName,
        } = await inquirer.prompt(questions);
        const roleId = await convertNameToId('role', 'title', roleName);
        const managerForename = managerName.split(' ', 1)[0];
        const managerId = await convertNameToId(
          'role',
          'title',
          managerForename
        );

        await insertEmployee(employeeName, surname, roleId, managerId);
        break;
      case 'Role':
        const {
          name: currentRoleName,
          salary,
          departmentName,
        } = await inquirer.prompt(questions);
        const departmentId = await convertNameToId(
          'department',
          currentRoleName,
          departmentName
        );

        await insertRole(employeeName, salary, departmentId);
        break;
      case 'Department':
        const { name: currentDepartmentName } = await inquirer.prompt(
          questions
        );
        await insertDepartment(currentDepartmentName);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error(`ERROR - addToTracker.js - addToTracker(): ${err}`);
  }
};

module.exports = addToTracker;
