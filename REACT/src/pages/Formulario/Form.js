import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import "./Form.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const dados = {
      nome: data.name,
      email: data.email,
      senha: data.password,
    };
    axios
      .post("http://localhost:8080/addUser", {
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
    <div className="body-container">
      <header>
        <h1>Register User</h1>
      </header>
      <div className="app-container">
        <div className="form-group">
          <label>Name</label>
          <input
            className={errors?.name && "input-error"}
            type="text"
            placeholder="Your name"
            {...register("name", { required: true })}
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
            {...register("password", { required: true, minLength: 7 })}
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
        <div className="buttons-container">
          <div className="form-group">
            <div>
              <Link to="/">
                <button onClick={() => handleSubmit(onSubmit)()}>
                  Register
                </button>
              </Link>
            </div>
          </div>
          <div className="form-group">
            <div className="rigth">
              <Link to="/">
                <button>Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
