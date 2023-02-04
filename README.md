# user-magnament

user management was my first crud made with ReactJS and Node.js

## Installation

### Web and Server
Use the package manager [npm](https://docs.npmjs.com/cli/v6/commands/npm-install) to install dependencies.

```bash
npm install
```
Use the package manager [npm](https://docs.npmjs.com/cli/v6/commands/npm-install) to start a application.

```bash
npm run dev
```
## database table needed by the application (MySQL)

```MySQL
CREATE DATABASE `registeruser`;
USE `registeruser`;
CREATE TABLE `users`(
id INT  AUTO_INCREMENT PRIMARY KEY NOT NULL,
nome VARCHAR(45) NOT NULL,
senha VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL
);
```
## Features
Allows read, create, delete, and update operations (CRUD) based on user management.
## Technologies Used

### Web - (ReactJS)
- [React] - A JavaScript library for building user interfaces
- [react-hook-form] - React Hook Form has support for native form validation, which lets you validate inputs with your own rules.
- [JavaScript] - JavaScript is a structured, high-level scripting, dynamically typed, multiparadigm, interpreted programming language.
- [CSS] - CSS, Cascading Style Sheets is a mechanism for adding styles to a web page.
- [React-Bootstrap] - React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQuery.
- [Axios] - Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface
### Server - (Node.js)
- [Node.js] - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
- [JavaScript] - JavaScript is a structured, high-level scripting, dynamically typed, multiparadigm, interpreted programming language.
- [Sequelize] - Sequelize is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more. 
- [Express] - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [MySQL] - MySQL is a database management system, which uses the SQL language as an interface.

## Future Implementations
allow the use of login for only the administrator can do the operations (CRUD) and the administrator decides if the user will be administrator or a common user.
