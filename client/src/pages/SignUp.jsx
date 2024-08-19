import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import 'uikit/dist/css/uikit.css';
import 'uikit/dist/js/uikit.min.js';

function Signup(props) {
  // Initialize form state with email, password, and username
  const [formState, setFormState] = useState({ email: '', password: '', username: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call mutation to add user with form data
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });
      // Extract token and authenticate user
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.error(e);
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
        src="/galaxy.jpeg" 
        alt="Background" 
        style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          zIndex: -1, /* Ensure it stays behind other content */
        }} 
      />
      <div className="uk-card uk-card-default uk-card-body uk-width-large">
        <Link to="/login" className="uk-link-heading uk-text-small uk-align-right">
          ← Go to Login
        </Link>

        <h2 className="uk-heading-line uk-text-center"><span>Signup</span></h2>

        <form onSubmit={handleFormSubmit} className="uk-form-stacked uk-margin-medium-top">
          <div className="uk-margin">
            <label htmlFor="email" className="uk-form-label">Email:</label>
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
            <label htmlFor="pwd" className="uk-form-label">Password:</label>
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
          <div className="uk-margin">
            <label htmlFor="username" className="uk-form-label">Username:</label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                placeholder="Username"
                name="username"
                type="text"
                id="username"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="uk-flex uk-flex-right">
            <button className="uk-button uk-button-primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
