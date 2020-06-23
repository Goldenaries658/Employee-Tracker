// These functions take in the raw object from mysql
// and format them for inquirer
const formatters = {
  formatRoles: (rolesArr) => rolesArr.map((obj) => obj.title),
  formatDepartments: (departmentsArr) => departmentsArr.map((obj) => obj.name),
  formatEmployees: (employeeArr) =>
    employeeArr.map((obj) => `${obj.forename} ${obj.surname}`),
};

module.exports = formatters;
