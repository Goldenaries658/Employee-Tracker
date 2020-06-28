// These functions take in the raw array of objects from mysql
// and formats them to an array for inquirer
const formatters = {
  formatRoles: (rolesArr) => rolesArr.map((obj) => obj.title),
  formatDepartments: (departmentsArr) => departmentsArr.map((obj) => obj.name),
  formatEmployees: (employeeArr) => {
    return employeeArr
      .map((obj) => `${obj.forename} ${obj.surname}`)
      .filter((el) => el !== 'Manager');
  },
};

module.exports = formatters;
