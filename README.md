# crud-react-node

gerenciamento de usuários com javascript (ReactJS,NodeJS).

primeiro crud feito com react e node.

#funcionalidades

permite criar, excluir e atualizar operações (CRUD) com base no gerenciamento de usuários.

#tecnologias usadas.

linguagem de programação: javascript.

frameworks: React para fazer o front-end e consumir a API e Node para criar a API e permitir que os usuários gerenciem operações e armazenem dados em um banco de dados onde o mysql foi usado.

#start

npm i (para instalar todas as dependências necessárias (em React e Node)).

npm start (no React para iniciar um servidor React).

node app.js (no Node para iniciar um servidor Node).

para poder realizar operações crud será necessário criar um banco de dados (mysql) e uma tabela.

CREATE DATABASE `registeruser`;
USE `registeruser`;
CREATE TABLE `users`(
id INT  AUTO_INCREMENT PRIMARY KEY NOT NULL,
nome VARCHAR(45) NOT NULL,
senha VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL
);

#implementações futuras

permite o uso de login para que somente o administrador possa fazer as operações (CRUD) e o administrador decide se o usuário será administrador ou um usuário comum.

#status do projeto: hiato.

***Abstract***

# crud-react-node

user management with javascript (ReactJS,NodeJS).

first crud made with react and node.

#functionalities

allows you to create, delete and update (CRUD) operations based on user management.

#technologies used

programming language: javascript.

frameworks: React to make the front-end and consume the api and Node to create the api and allow users to manage operations and store data in a database where mysql was used.

#startup

npm i (to install all necessary dependencies(in React and Node)).

npm start (in React for Start a React Server).

node app.js (in Node for Start a Node Server).

to be able to perform crud operations it will be necessary to create a database(mysql) and a table.

CREATE DATABASE `registeruser`;

USE `registeruser`;

CREATE TABLE `users`(
id INT  AUTO_INCREMENT PRIMARY KEY NOT NULL,
nome VARCHAR(45) NOT NULL,
senha VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL
);

#future implementations

allow the use of login for only the administrator can do the operations (CRUD) and the administrator decides if the user will be administrator or a common user.

#project status : hiatus.
