// These functions take in the raw object from mysql
// and format them for inquirer
const formatters = {
  formatRoles: (rolesResult) => {
    const formattedArr = [];
    for (i in rolesResult) {
      formattedArr.push(rolesResult[i].title);
    }
    return formattedArr;
  },
  formatDepartments: (departmentsResult) => {
    const formattedArr = [];
    for (i in departmentsResult) {
      formattedArr.push(departmentsResult[i].name);
    }
    return formattedArr;
  },
  formatEmployees: (employeeResult) => {
    const formattedArr = [];
    for (i in employeeResult) {
      if (employeeResult[i].manager_id)
        formattedArr.push(
          `${employeeResult[i].forename} ${employeeResult[i].surname}`
        );
    }
    return formattedArr;
  },
};

module.exports = formatters;
