const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysql4masoN",
    database: "employee_trackerDB"
});

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

connection.connect(function (err) {
    if (err) throw err;
    start();
});


function start() {
    inquirer.prompt(
        {
            type: "list",
            name: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View Departments",
                "View Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Roles",
                "Remove Employee",
                "Remove Department",
                "Remove Role",
                "Exit"
            ]
        }).then(data => {
            switch (data.list) {

                case "View Departments":
                    viewDepartments();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "Update Employee Roles":
                    updateEmployeeRoles();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    deleteEmployee();
                    break;

                case "Remove Role":
                    deleteRole();
                    break;

                case "Remove Department":
                    deleteDepartment();
                    break;

                case "Exit":
                    connection.end();
                    break;

            }
        });
};

function viewDepartments() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })

};

function viewRoles() {
    connection.query("SELECT title, salary, name FROM role LEFT JOIN department ON role.department_id = department.id", (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })

};

function viewAllEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function updateEmployeeRoles() {
    connection.query("SELECT * FROM employee", (err, res2) => {
        if (err) throw err;
        const employeeChoices = res2.map((res2) => {
            return res2.first_name + " " + res2.last_name
        })

        employeeChoices.push("Exit");
        inquirer.prompt(
            {
                type: "list",
                name: "employeeNames",
                message: "Please Update An Employee.",
                choices: employeeChoices
            }).then(data2 => {
                if (data2.employeeNames === "Exit") {
                    return start();
                }

                connection.query("SELECT * FROM role", (err, res) => {
                    if (err) throw err;
                    const roleIdChoices = res.map((res) => {
                        return res.title;
                    })

                    roleIdChoices.push("None");
                    inquirer.prompt(
                        {
                            type: "list",
                            name: "roleId",
                            message: "Please enter employee's new role.",
                            choices: roleIdChoices
                        }).then(data => {
                            var chosenItem;
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].title === data.roleId) {
                                    chosenItem = res[i];
                                }
                            }

                            var chosenItem2;
                            for (var i = 0; i < res2.length; i++) {
                                if (res2[i].first_name + " " + res2[i].last_name === data2.employeeNames) {
                                    chosenItem2 = res2[i];
                                }
                            }

                            connection.query("UPDATE employee SET ? WHERE ?", [
                                {
                                    role_id: chosenItem.id
                                },
                                {
                                    id: chosenItem2.id
                                }], err => {
                                    if (err) throw err;
                                    console.log("Employee Updated");
                                    start();
                                })
                        });
                })
            });
    })
}

function addDepartment() {
    inquirer.prompt(
        {
            type: "input",
            name: "name",
            message: "Name"
        }
    ).then(data => {
        connection.query("INSERT INTO department SET ?", data, (err) => {
            if (err) throw err;
            console.log("Department Updated to DateBase")
            start();
        })
    })
};

function addRole() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        const departmentReturn = res.map((res) => {
            return res.name;
        })

        departmentReturn.push("None");
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Please Enter the Role Title."
            },
            {
                type: "number",
                name: "salary",
                message: "Please Enter the Salary For This Position."
            },
            {
                type: "list",
                name: "roles",
                message: "What Department Is This Role Active Under.",
                choices: departmentReturn
            }]).then(data => {
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].name === data.department_id) {
                        chosenItem = res[i];
                    }
                }

                connection.query("INSERT INTO role SET ?", {
                    title: data.title,
                    salary: data.salary,
                    department_id: chosenItem
                }, (err) => {
                    if (err) throw err;
                    console.log("Role Updated To DataBase")
                    start();
                })
            })

    })

};

function addEmployee() {

    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;

        const roleIdChoices = res.map((res) => {
            return res.title;
        })

        roleIdChoices.push("N/A");

        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Please Enter The Employee's First Name."
            },
            {
                type: "input",
                name: "lastName",
                message: "Please Enter The Employee's Last Name."
            },
            {
                type: "list",
                name: "roleId",
                message: "Please Enter The Employee's Role.",
                choices: roleIdChoices
            }
        ]).then(data => {

            var chosenItem = [];
            if (data.roleId === "None") {
                chosenItem.id = null;
            } else {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].title === data.roleId) {
                        chosenItem = res[i];
                    }
                }
            }

            connection.query("SELECT * FROM employee", (err, res2) => {
                if (err) throw err;
                const employeeChoices = res2.map((res2) => {
                    return res2.first_name + " " + res2.last_name
                })
                employeeChoices.push("None");

                inquirer.prompt(
                    {
                        type: "list",
                        name: "mangerId",
                        message: "Please Enter The Emplyee's Manager.",
                        choices: employeeChoices
                    }
                ).then(data2 => {

                    if (data2.mangerId === "None") {
                        connection.query("INSERT INTO employee SET ?", {
                            first_name: data.firstName,
                            last_name: data.lastName,
                            role_id: chosenItem.id,
                            manager_id: null
                        }, err => {
                            if (err) throw err;
                            console.log("Employee Updated to DataBase");
                            return start();
                        })
                    }
                    var chosenItem2;
                    for (var i = 0; i < res2.length; i++) {
                        if (res2[i].first_name + " " + res2[i].last_name === data2.mangerId) {
                            chosenItem2 = res2[i];
                        }
                    }

                    connection.query("INSERT INTO employee SET ?", {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        role_id: chosenItem.id,
                        manager_id: chosenItem2.id
                    }, err => {
                        if (err) throw err;
                        console.log("Employee Updated to DataBase");
                        start();
                    })


                })

            });

        })

    })

};

function deleteEmployee() {

    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;

        const employeeChoices = res.map((res) => {
            return res.first_name + " " + res.last_name
        })
        employeeChoices.push("Exit");

        inquirer.prompt({
            type: "list",
            name: "delete",
            message: "Please Select An Employee To Delete",
            choices: employeeChoices
        }).then(data => {

            if (data.delete === "Exit") {
                return start();
            }

            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].first_name + " " + res[i].last_name === data.delete) {
                    chosenItem = res[i];
                }
            }

            connection.query("DELETE FROM employee WHERE ?", {
                id: chosenItem.id
            }, (err) => {
                if (err) throw err;
                console.log("Employee Deleted From DataBase")
                start();
            })

        })

    })

};

function deleteRole() {

    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;

        const employeeChoices = res.map((res) => {
            return res.title;
        })
        employeeChoices.push("Exit");


        inquirer.prompt({
            type: "list",
            name: "delete",
            message: "Please Select A Role To Delete",
            choices: employeeChoices
        }).then(data => {

            if (data.delete === "Exit") {
                return start();
            }

            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].title === data.delete) {
                    chosenItem = res[i];
                }
            }

            connection.query("DELETE FROM role WHERE ?", {
                id: chosenItem.id
            }, (err) => {
                if (err) throw err;
                console.log("Role Deleted From DataBase")
                start();
            })

        })

    })

};

function deleteDepartment() {

    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;

        const employeeChoices = res.map((res) => {
            return res.name;
        })
        employeeChoices.push("Exit");


        inquirer.prompt({
            type: "list",
            name: "delete",
            message: "Please Select A Department To Delete",
            choices: employeeChoices
        }).then(data => {

            if (data.delete === "Exit") {
                return start();
            }

            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].name === data.delete) {
                    chosenItem = res[i];
                }
            }

            connection.query("DELETE FROM department WHERE ?", {
                id: chosenItem.id
            }, (err) => {
                if (err) throw err;
                console.log("Department Deleted From DataBase")
                start();
            })

        })

    })

};