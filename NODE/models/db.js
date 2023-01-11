const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequelize /*conexao*/ = new Sequelize("registeruser", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexao com o banco de dados realizada com sucesso");
  })
  .catch(() => {
    console.log("Erro: Conexao com o banco de dados não realizada com sucesso");
  });

module.exports = sequelize;
