import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalForm from "../../components/ModalForm";
import axios from "axios";
import "../style.css";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8080/dados").then((json) => setData(json.data));
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
  const checkSearch = useMemo(() => {
    const lowerBusca = search.toLowerCase();
    if (search === "") {
      return data;
    }
    return data.filter((user) =>
      user.nome.toString().toLowerCase().includes(lowerBusca)
    );
  });

  const renderTable = () => {
    return checkSearch.map((user) => {
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
      <div className="container__search">
        <span>
          <h2 className="search">Search Users</h2>
        </span>
        <input
          type="text"
          value={search}
          placeholder="enter a name..."
          className="input-search"
          onChange={(event) => setSearch(event.target.value)}
          autoFocus
        />
      </div>
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
              <ModalForm />
            </div>
          </Row>
          <Row align="center">
            <div>
              <h5>&copy;Desenvolvido Por Caio</h5>
            </div>
          </Row>
        </footer>
      </Container>
    </div>
  );
}

export default Home;
