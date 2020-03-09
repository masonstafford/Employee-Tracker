const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "mysql4masoN",
    database: "employee_tracker_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    //call first function, this function will call function start
    runStart();
});

//0:
//function start: askes the first questions, and then calls other..
//functons bassed off of what the user picks.. uses inquirer.
function runStart() {
    console.log(`
        ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    
        ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    
        █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗      
        ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝      
        ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗    
        ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝ 

        ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗            
        ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗           
        ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝           
        ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗           
        ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║           
        ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝           
                                       
        `);
    inquirer.prompt({
        name: "action",
        message: "What would you like to do?",
        type: "list",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Add A New Department",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "Update Role",
            "EXIT"
        ]
    })
  .then(function (answer) {
        switch (answer.action) {
            case "View All Employees":
                viewEmployees();
                break;

            case "View All Employees By Department":
                viewEmployeesDepartment();
                break;

            case "View All Employees By Manager":
                viewEmployeesManager();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employee":
                removeEmployee();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break;

            case "Update Employee Manager":
                updateEmployeeManager();
                break;

            case "Add A New Department":
                addDepartment();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "Add Role":
                addRole();
                break;

            case "Remove Role":
                removeRole();
                break;

            case "Update Role":
                updateRole();
                break;

            case "EXIT":
                connection.end();
                break;
        }
    });
}
//1:
//function will console log all employee info in a table.
function viewEmployees() {
    connection.query("SELECT * FROM employee_log", function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
    });
    runStart();
}

//2----------------------------------------------------

function viewEmployeesDepartment() {
    inquirer.prompt ({
        type: "input",
        message: "Search By Department",
        name: "department"
    }).then(function(answer) {
        connection.query("SELECT * FROM employee_log", { department: answer.department }, function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        runStart();
    });
}

//3----------------------------------------------------

function viewEmployeesManager() {
    inquirer.prompt ({
        type: "input",
        message: "Search By Manager",
        name: "manager"
    }).then(function(answer) {
        connection.query("SELECT * FROM employee_log", { manager: answer.manager }, function (err, res) {
            if (err) throw err;
            console.table(res.answer);
        });
        runStart();
    });
}

//4----------------------------------------------------

function addEmployee() {

    runStart();
}

//5----------------------------------------------------

function removeEmployee() {

    runStart();
}

//6----------------------------------------------------

function updateEmployeeRole() {

    runStart();
}

//7----------------------------------------------------

function updateEmployeeManager() {

    runStart();
}

//8----------------------------------------------------

function addDepartment() {

    runStart();
}

//9----------------------------------------------------

function viewAllRoles() {
    inquirer.prompt ({
        type: "input",
        message: "Search By Manager",
        name: "title"
    }).then(function(answer) {
        connection.query("SELECT * FROM employee_log", { title: answer.title }, function (err, res) {
            if (err) throw err;
            console.table(res.answer);
        });
        runStart();
    });
    runStart();
}

//10----------------------------------------------------

function addRole() {

    runStart();
}

//11----------------------------------------------------

function removeRole() {

    runStart();
}

//12----------------------------------------------------

function updateRole() {

    runStart();
}

//end----------------------------------------------------
