DROP DATABASE IF EXISTS employee_tracker_DB;

CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE employee_log (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  role_id INT,
  manager_id INT, 
  PRIMARY KEY (id)
);

CREATE TABLE role_log (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10,10),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department_log (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)

SELECT*FROM employee_log;
SELECT*FROM role_log;
SELECT*FROM department_log;