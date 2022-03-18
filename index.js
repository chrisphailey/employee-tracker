const inquirer = require("inquirer");
const fs = require("fs");
const connection = require("./db/connection");
const res = require("express/lib/response");
const tableArray = [];
let departments;
let departmentsArr = [];
let employeeArray = [];
let roleArray = [];


const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      console.log(answer.department);
      connection.query(
        `INSERT INTO departments (name)
                        VALUES ('${answer.department}')`,
        (err, results) => {
          console.log(results);
          if (err) {
            console.log(err);
          }
        }
      );
      promptUser();
    });
};

const addRole = () => {
  connection.query("SELECT * FROM departments", (err, response) => {
    departments = response;
    departments.map(({ id, name }) => {
      departmentsArr.push({ name: name, value: id });
      // console.log(departmentsArr)
    });
    return inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "number",
          name: "salary",
          message: "What is the salary of the role?",
          validate: (salaryInput) => {
            if (salaryInput) {
              return true;
            } else {
              console.log("Please enter the role's salary!");
              return false;
            }
          },
        },
        {
          type: "list",
          name: "roleDepartment",
          message: "What department does the role belong to?",
          choices: departmentsArr,
        },
      ])
      .then((roleData) => {
        console.log(roleData);
        connection.query(
          `INSERT INTO roles (title, salary, department_id)
                                VALUES ('${roleData.title}', ${roleData.salary}, ${roleData.roleDepartment})`,
                                // LEFT JOIN departments
                                // ON roles.department_id = departments.id`,
          (err, results) => {
            if (err) {
              console.log(err);
            }
          }
        );
        promptUser();
      });
  });
};
const addEmployee = () => {
  connection.query("SELECT * FROM roles", (err, response) => {
    roles = response;
    roles.map(({ id, title }) => {
      roleArray.push({ name: title, value: id });
    });
    connection.query("SELECT * FROM employees", (err, response) => {
      response.map(({ id, name }) => {
        employeeArray.push({ name: name, value: id });
      });
    });

    return inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the employee's first and last name?",
        },
        {
          type: "list",
          name: "employeeRole",
          message: "What is the employee's role?",
          choices: roleArray,
        },
        {
          type: "list",
          name: "manager",
          message: `Who is this employee's manager?`,
          choices: employeeArray,
        },
      ])
      .then((employeeData) => {
          console.log(employeeData);
        connection.query(`INSERT INTO employees (name, role_id, manager_id)
                            VALUES('${employeeData.name}', ${employeeData.employeeRole}, ${employeeData.manager} )`);
        promptUser();
      });
  });
};

const updateUser = () => {
  connection.query("SELECT employees.name, roles.title FROM employees LEFT JOIN roles ON employees.role_id = roles.id", (err, response) => {
    response.map(({ id, name }) => {
      employeeArray.push({ name: name, value: id })
    });
    response.map(({ id, title }) => {
      roleArray.push({ name: title, value: id })
    });

    return inquirer
    .prompt([
      {
        type: "list",
        name: "employeeSelection",
        message: `Which employee's role would you like to update?`,
        choices: employeeArray,
      },
      {
          type: "list",
          name: "employeeRole",
          message: "Which role do you want to assign the selected employee?",
          choices: roleArray,
      },
    ])
    .then((choices) => {
        console.log(choices);
    });
  });
};

const viewDepartments = () => {
  connection.query("SELECT * FROM departments", (err, results) => {
    console.table(results);
    if (err) {
      console.log(err);
    }
  });
  promptUser();
};

const viewRoles = () => {
  const sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS Department 
                FROM roles LEFT JOIN departments ON roles.department_id=departments.id`;
  connection.query(sql, (err, results) => {
    console.table(results);
    if (err) {
      console.log(err);
    }
  });
  promptUser();
};

const viewEmployees = () => {
  const sql = `SELECT employees.name, roles.title, roles.salary, employees.manager_id AS Manager 
                FROM employees 
                LEFT JOIN roles
                ON employees.role_id = roles.id`;
  connection.query(sql, (err, results) => {
    console.table(results);
    if (err) {
      console.log(err);
    }
  });
};

const promptUser = () => {
  // connection.query('SELECT * FROM departments', (err, response) => {
  //     departments = response
  // console.log(departments)
  // });
  return inquirer
    .prompt([
      {
        type: "list",
        name: "decision",
        message: "What would you like to do?",
        choices: [
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "View all departments",
          "View all roles",
          "View all employees",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.decision) {
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateUser();
          break;
        case "View all departments":
          viewDepartments();
          break;
        case "View all employees":
          viewEmployees();
          promptUser();
          break;
        case "View all roles":
          viewRoles();
          break;
      }
    });
};

// const promptUser = (tableArray) => {
//     return inquirer
//     .prompt([
//         {
//             type: 'list',
//             name: 'decision',
//             message: 'What would you like to do?',
//             choices: ['Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'View all departments', 'View all roles', 'View all employees'],
//         },
//         {
//             type: 'input',
//             name: 'department',
//             message: 'What is the name of the department?',
//             when: ({decision}) => {
//                 if (decision === 'Add a department'){
//                     return true
//                 }
//             },
//         },
//         {
//             type: 'input',
//             name: 'role',
//             message: 'What is the name of the role?',
//             when: ({decision}) => {
//                 if (decision === 'Add a role'){
//                     return true
//                 }
//             },
//         },
//         {
//             type: 'number',
//             name: 'salary',
//             message: 'What is the salary of the role?',
//             validate: salaryInput => {
//                 if (salaryInput) {
//                   return true;
//                 } else {
//                   console.log("Please enter the role's salary!");
//                   return false;
//                 }
//               },
//             when: ({decision}) => {
//                 if (decision === 'Add a role'){
//                     return true
//                 }
//             },
//         },
//         {
//             type: 'list',
//             name: 'roleDepartment',
//             message: 'What department does the role belong to?',
//             choices: `${departmentArray}`,
//             when: ({decision}) => {
//                 if (decision === 'Add a role'){
//                     return true
//                 }
//             },
//         },
//         {
//             type: 'input',
//             name: 'firstName',
//             message: "What is the employee's name?",
//             when: ({decision}) => {
//                 if (decision === 'Add an employee'){
//                     return true
//                 }
//             },

//         },
//         {
//             type: 'input',
//             name: 'lastName',
//             message: "What is the employee's last name?",
//             when: ({decision}) => {
//                 if (decision === 'Add an employee'){
//                     return true
//                 }
//             },
//         },
//         {
//             type: 'list',
//             name: 'employeeRole',
//             message: "What is the employee's role?",
//             when: ({decision}) => {
//                 if (decision === 'Add an employee'){
//                     return true
//                 }
//             },
//         },
//     ])
//     .then
// }

//     .then(Data => {
//         if({decision} === 'Add a department'){
//             departmentArray.push(Data)
//             console.log(departmentArray)
//         }
//     })

function init() {
  promptUser();
}

init();
