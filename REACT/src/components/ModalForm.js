import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import "./Form.css";
import axios from "axios";

function ModalForm(props) {
  const [lgShow, setLgShow] = useState(false);
  const [dados, setDados] = useState("");
  const [datas, setDatas] = useState("");
  const [url, setUrl] = useState("http://localhost:8080/addUser");
  const [isCheck, setIsCheck] = useState(true);
  useEffect(() => {
    if (props.dados) {
      setDados(props.dados);
      setIsCheck(false);
      setUrl("http://localhost:8080/updateUser");
      let defaultValues = {};
      defaultValues.nome = dados.nome;
      defaultValues.email = dados.email;
      defaultValues.senha = dados.senha;
      reset({ ...defaultValues });
    }
  }, [props.dados]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const dados = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    };
    if (!isCheck) {
      Object.assign(dados, { id: props.dados.id });
    }
    axios
      .post(url, {
        data: dados,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Button onClick={() => setLgShow(true)}>{props.children}</Button>
      <Modal
        fullscreen="xxl-down"
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <header className="header__modal">
            <h1>{props.header}</h1>
          </header>
        </Modal.Header>
        <div className="app-container">
          <div className="form-group">
            <label>Name</label>
            <input
              className={errors?.name && "input-error"}
              type="text"
              placeholder="Your name"
              {...register("nome", { required: true })}
            />
            {errors?.name?.type === "required" && (
              <p className="error-message">Name is required.</p>
            )}
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              className={errors?.email && "input-error"}
              type="email"
              placeholder="Your e-mail"
              {...register("email", {
                required: true,
                validate: (value) => isEmail(value),
              })}
            />
            {errors?.email?.type === "required" && (
              <p className="error-message">Email is required.</p>
            )}

            {errors?.email?.type === "validate" && (
              <p className="error-message">Email is invalid.</p>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className={errors?.password && "input-error"}
              type="password"
              placeholder="Password"
              {...register("senha", { required: true, minLength: 7 })}
            />

            {errors?.password?.type === "required" && (
              <p className="error-message">Password is required.</p>
            )}

            {errors?.password?.type === "minLength" && (
              <p className="error-message">
                Password needs to have at least 7 characters.
              </p>
            )}
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="privacy-policy"
                {...register("privacyTerms", {
                  validate: (value) => value === true,
                })}
              />
              <label>I agree with the privacy terms.</label>
            </div>

            {errors?.privacyTerms?.type === "validate" && (
              <p className="error-message">
                You must agree with the privacy terms.
              </p>
            )}
          </div>
          <div className="form-group">
            <div>
              <button onClick={() => handleSubmit(onSubmit)()}>
                {props.header}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ModalForm;
