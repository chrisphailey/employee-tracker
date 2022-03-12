const inquirer = require('inquirer');
const fs = require('fs');
const connection = require('./db/connection')
const tableArray = [];
let departments
let departmentsArr = [];
let employeeArray = [];


const addDepartment = () => {
    return inquirer
    .prompt([
        {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?',
    },
])
.then(answer => {
    console.log(answer.department);
    connection.query(`INSERT INTO departments (name)
                        VALUES ('${answer.department}')`, (err, results)=> {
                            console.log(results);
                            if(err){
                                console.log(err)
                            }
                        })
    promptUser()
})
}


const addRole = () => {
    connection.query('SELECT * FROM departments', (err, response) => {
        departments = response
        departments.map(({id, name}) => {
            departmentsArr.push({name: name, value: id})
        // console.log(departmentsArr)
        }
    );
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the role?',
            validate: salaryInput => {
                if (salaryInput) {
                  return true;
                } else {
                  console.log("Please enter the role's salary!");
                  return false;
                }
              },
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'What department does the role belong to?',
            choices: departmentsArr,
        },
    ])
    .then(roleData => {
        console.log(roleData)
            connection.query(`INSERT INTO roles (title, salary, department_id)
                                VALUES ('${roleData.title}', ${roleData.salary}, ${roleData.roleDepartment})`, (err, results) => {
                                    if(err){
                                        console.log(err)
                                    }
                                })
                promptUser()
    })
})
}
const addEmployee = (tableArray) => {
    let rolesArr = []
    connection.query('SELECT * FROM roles', (err, response) => {
        roles = response
        roles.map(({id, title}) => {
            rolesArr.push({name: title, value: id})
        console.log(rolesArr)
        }
    );
    connection.query('SELECT * FROM employees', (err, response) => {
        response.map(({id, name}) => {
            employeeArray.push({name: name, value: id})
        })
    })
    
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's first and last name?",
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: "What is the employee's role?",
            choices: rolesArr
        },
        {
            type: 'list',
            name: 'manager',
            message: `Who is this employee's manager?`,
            choices: employeeArray
        }
    ])
    .then(employeeData => {
        connection.query(`INSERT INTO employees (name, role_id, manager_id)
                            VALUES('${employeeData.name}', ${employeeData.employeeRole}, ${employeeData.manager} )`, )
        promptUser()
    })
})
}

const updateUser = (employeeInfo) => {
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'employeeSelection',
            message: 'Which employee would you like to update?',
            choices: employeeArray
        }
    ])
}


const promptUser = () => {
    // connection.query('SELECT * FROM departments', (err, response) => {
    //     departments = response
    // console.log(departments)
    // });
    return inquirer
    .prompt([
                {
            type: 'list',
            name: 'decision',
            message: 'What would you like to do?',
            choices: ['Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'View all departments', 'View all roles', 'View all employees'],
        }
    ])
    .then(answer => {
        switch(answer.decision){
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateUser();
                break;
            case 'View all departments':
                break;
            case 'View all employees':
                break;
            case 'View all roles':
                break;
        }
    })
}


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
    promptUser()
}

init();