// Import and require dotenv in order to hide our databse password
require('dotenv').config();

// Import and require mysql2
const mysql = require('mysql2');

const mysqlPromise = require('mysql2/promise');

// Import and require Inquirer
const inquirer = require('inquirer');

// Import and require console.table
const cTable = require('console.table');


// Create conncection to our employee database (employee_db)
const db = mysql.createConnection(
    {
    // uses the dotenv package to hide these properties from GitHub
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employee_db database.`)
  );

db.connect(err => {
  if (err) throw err;
  afterConnection();
});


afterConnection = () => {
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE MANAGER         *")
  console.log("*                                 *")
  console.log("***********************************")
  promptUser();
}



const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'No action'
      ]
    }
  ])
  .then( (answers) => {
    
    const {choices} = answers;

    if (choices === 'View all departments') {
      showDepartments();
    }

    if (choices === 'View all roles') {
      showRoles();
    }

    if (choices === 'View all employees') {
      showEmployees()
    }

    if (choices === 'Add a department') {
      addDepartment();
    }

    if (choices === 'Add a role') {
      addRole();
    }

    if (choices === 'Add an employee') {
      addEmployee();
    }

    if (choices === 'Update an employee role') {
      updateEmployee();
    }

    if (choices === 'No action') {
      db.end()
    };
  });
};


function showDepartments() {
  console.log('Showing all departments...\n');
  const sql = `SELECT id AS ID, department_name AS department FROM department;`; 

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

function showRoles() {
  console.log('Showing all roles...\n');
  const sql = `SELECT role.id AS ID, title, department_name AS department, salary  
  FROM department
  JOIN role
  ON department.id = role.department_id;`

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

function showEmployees() {
  console.log('Showing all employees...\n');
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, title, department_name AS department, salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager
  FROM employee
  JOIN role 
  ON employee.role_id = role.id
  JOIN department
  ON role.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id;`; 

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};