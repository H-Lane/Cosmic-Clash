import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import "../../node_modules/uikit/dist/css/uikit.css";
import "../../node_modules/uikit/dist/js/uikit.min.js";


function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="uk-flex uk-flex-center uk-margin-large-top">
      <img
        src="\src\assets\galaxy.jpeg" 
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1 /* Ensure it stays behind other content */,
        }}
      />
      <div className="uk-card uk-card-default uk-card-body uk-width-large">
        <Link
          to="/signup"
          className="uk-link-heading uk-text-small uk-align-right"
        >
          ← Go to Signup
        </Link>

        <h2 className="uk-heading-line uk-text-center">
          <span>Login</span>
        </h2>

        <form
          onSubmit={handleFormSubmit}
          className="uk-form-stacked uk-margin-medium-top"
        >
          <div className="uk-margin">
            <label htmlFor="email" className="uk-form-label">
              Email address:
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label htmlFor="pwd" className="uk-form-label">
              Password:
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
          </div>
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className="uk-flex uk-flex-right">
            <button className="uk-button uk-button-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
