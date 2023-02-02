const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./models/db.js");

app.use(cors());
app.use(express.json());

const getDatas = async () => {
  const results = await sequelize.query("SELECT * FROM users", {
    type: sequelize.QueryTypes.SELECT,
  });
  console.log(results);
  return results;
};

const createUser = async (req) => {
  const sql = `
    INSERT INTO users (nome, email, senha)
    VALUES ('${req.data.nome}', '${req.data.email}', '${req.data.senha}');
  `;
  return await sequelize.query(sql, {
    type: sequelize.QueryTypes.INSERT,
  });
};

const updateUser = async (req) => {
  const sql = `
    UPDATE users
    SET nome = '${req.data.nome}', email = '${req.data.email}', senha = '${req.data.senha}'
    WHERE id = ${req.data.id};
  `;
  return sequelize.query(sql, {
    type: sequelize.QueryTypes.UPDATE,
  });
};

const deleteUser = async (id) => {
  const sql = `
  DELETE FROM users WHERE id = ${id}
  `;

  return await sequelize.query(sql, {
    type: sequelize.QueryTypes.DELETE,
  });
};

app.get("/dados", async (req, res) => {
  const datas = await getDatas();
  res.send(datas);
});

app.post("/addUser", (req, res) => {
  createUser(req.body);
  res.send(req.body);
  console.log(req.body);
});

app.post("/updateUser", async (req, res) => {
  updateUser(req.body);
  res.send(req.body);
  console.log(req.body);
});

app.post("/deleteUser", cors(), (req, res) => {
  res.send(req.body);
  deleteUser(req.body.id);
  console.log(req.body);
});

app.listen(8080, () => {
  console.log(`HTTP Server running on http://localhost/8080!`);
});
