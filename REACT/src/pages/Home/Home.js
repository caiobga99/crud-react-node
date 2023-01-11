import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";

function Home() {
  const url = "http://localhost:8080/dados";
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url).then((json) => setData(json.data));
  }, []);

  const handleClickDeleteUser = (id) => {
    axios
      .post("http://localhost:8080/deleteUser", {
        id: id,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClickUpdateUser = (id) => {
    navigate(`/AtualizarUsuario/${id}`);
  };

  const renderTable = () => {
    return data.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.nome}</td>
          <td>{user.email}</td>
          <td>{user.senha}</td>
          <td>
            <Button
              className="buttons"
              type="button"
              variant="warning"
              onClick={() => handleClickUpdateUser(user.id)}
            >
              Atualizar
            </Button>
          </td>
          <td>
            <Button
              className="buttons"
              variant="danger"
              onClick={() => handleClickDeleteUser(user.id)}
            >
              Deletar
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container_home">
      <header>
        <h1>User List!</h1>
      </header>
      <Container className="container_home">
        <main>
          <Table striped bordered hover variant="dark" className="table__home">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Senha</th>
                <th>Email</th>
                <th>Atualizar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </Table>
        </main>
        <footer>
          <Row align="right">
            <div>
              <Link to="CadastrarUsuario">
                <Button variant="primary">Add User!</Button>
              </Link>
            </div>
          </Row>
          <Row align="center">
            <div>
              <h6>&copy;Desenvolvido Por Caio</h6>
            </div>
          </Row>
        </footer>
      </Container>
    </div>
  );
}

export default Home;
