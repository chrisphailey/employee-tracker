const inquirer = require('inquirer');
const fs = require('fs');
const tableArray = [];
const departmentArray = [];
const role = [];

const addDepartment = () => {
    return inquirer
    .prompt([
        {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?',
    },
    promptUser()
    ])
}



const promptUser = () => {
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

const addRole = () => {
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What is the name of the role?',
            choices: ['Customer Service', 'Human Resources', 'Wealth Manager', 'Accountant','Sales Rep', 'Outside Sales', 'Mechanic', 'Software Engineer'],
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
            choices: ['Service', 'Finance', 'Sales', 'Engineering'],
        },
    ])
}
const addEmployee = (tableArray) => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's name?",
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: "What is the employee's role?",
        }
    ])
//     .then(Data => {
//         if({decision} === 'Add a department'){
//             departmentArray.push(Data)
//             console.log(departmentArray)
//         }
//     })
}






function init() {
    promptUser()
}

init();