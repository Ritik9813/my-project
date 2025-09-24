// employeeManagement.js

const readline = require('readline');

// Array to store employee data
let employees = [];

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display the menu
function showMenu() {
    console.log('\n--- Employee Management System ---');
    console.log('1. Add Employee');
    console.log('2. List Employees');
    console.log('3. Remove Employee by ID');
    console.log('4. Exit');

    rl.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                addEmployee();
                break;
            case '2':
                listEmployees();
                break;
            case '3':
                removeEmployee();
                break;
            case '4':
                console.log('Exiting...');
                rl.close();
                break;
            default:
                console.log('Invalid option! Try again.');
                showMenu();
        }
    });
}

// Function to add an employee
function addEmployee() {
    rl.question('Enter Employee ID: ', (id) => {
        rl.question('Enter Employee Name: ', (name) => {
            employees.push({ id, name });
            console.log(`Employee ${name} added successfully!`);
            showMenu();
        });
    });
}

// Function to list all employees
function listEmployees() {
    if (employees.length === 0) {
        console.log('No employees found.');
    } else {
        console.log('\nEmployee List:');
        employees.forEach(emp => {
            console.log(`ID: ${emp.id}, Name: ${emp.name}`);
        });
    }
    showMenu();
}

// Function to remove an employee by ID
function removeEmployee() {
    rl.question('Enter Employee ID to remove: ', (id) => {
        const index = employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            const removed = employees.splice(index, 1);
            console.log(`Employee ${removed[0].name} removed successfully!`);
        } else {
            console.log('Employee not found!');
        }
        showMenu();
    });
}

// Start the application
showMenu();
