import React, { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ModalForm from "../../components/ModalForm";
import axios from "axios";
import "../style.css";
import Alert from "react-bootstrap/Alert";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
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
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkSearch = useMemo(() => {
    const lowerBusca = search.toLowerCase();
    if (search === "") {
      setShow(false);
      return data;
    }
    const check = data.filter((user) =>
      user.nome.toString().toLowerCase().includes(lowerBusca)
    );
    check.length === 0 ? setShow(true) : setShow(false);
    return check;
  }, [search, data]);

  const renderTable = () => {
    return checkSearch.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.nome}</td>
          <td>{user.email}</td>
          <td>{user.senha}</td>
          <td>
            <ModalForm dados={user} header="Update">
              Atualizar
            </ModalForm>
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
      <header className="header">
        <h1>User List!</h1>
      </header>
      <Container>
        <div className="alert__container">
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
          <div>
            <Alert show={show} variant="warning">
              User not found
            </Alert>
          </div>
        </div>
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
              <ModalForm header="Register">Add User</ModalForm>
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
};

export default Home;
