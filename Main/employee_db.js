// Import and require dotenv in order to hide our databse password
require('dotenv').config();

// Import and require mysql2
const mysql = require('mysql2');

// Import and require Inquirer
const inquirer = require('inquirer');

// Import and require console.table
const cTable = require('console.table');

// Create conncection to our employee database (employee_db)
const db = mysql.createConnection(
    {
    // uses the dotenv package to hide these properties from GitHub
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employee_db database.`)
  );