import React, { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ModalForm from "../../components/ModalForm";
import "../style.css";
import Alert from "react-bootstrap/Alert";
import { api } from "../../lib/axios";
const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);
  const [isDanger, setIsDanger] = useState(false);

  useEffect(() => {
    api.get("dados").then((json) => setData(json.data));
  }, []);
  const handleClickDeleteUser = (id) => {
    setIsSuccess(false);
    setIsDanger(false);
    api
      .post("deleteUser", {
        id: id,
      })
      .then((res) => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
        console.log(res);
        window.location.reload(false);
      })
      .catch((error) => {
        setIsDanger(true);
        setTimeout(() => {
          setIsDanger(false);
        }, 2000);
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
              Update
            </ModalForm>
          </td>
          <td>
            <Button
              className="buttons"
              variant="danger"
              onClick={() => handleClickDeleteUser(user.id)}
            >
              Delete
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
        <Row align="center" className="container_alert">
          <div className="alertDeleteUser">
            <Alert variant="success" show={isSucess}>
              Successfully deleted user!
            </Alert>
          </div>
          <div className="alertDeleteUser">
            <Alert variant="danger" show={isDanger}>
              Unable to delete user!
            </Alert>
          </div>
        </Row>
        <main>
          <Table striped bordered hover variant="dark" className="table__home">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Password</th>
                <th>Email</th>
                <th>Update</th>
                <th>Delete</th>
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
              <h5>&copy;Created by: Caio</h5>
            </div>
          </Row>
        </footer>
      </Container>
    </div>
  );
};

export default Home;
