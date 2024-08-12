import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations'; // Import the LOGIN mutation
import Auth from '../utils/auth'; // Import the authentication utility

function Login(props) {
  // Initialize form state to hold email and password
  const [formState, setFormState] = useState({ email: '', password: '' });
  
  // Set up the LOGIN mutation with useMutation hook
  const [login, { error }] = useMutation(LOGIN);

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form behavior
    try {
      // Execute the LOGIN mutation and pass form data as variables
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      // Extract the token from the mutation response
      const token = mutationResponse.data.login.token;
      // Log in the user by saving the token
      Auth.login(token);
    } catch (e) {
      console.log(e); // Log any errors
    }
  };

  // Update form state when an input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding state field based on input name
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      {/* Link to navigate to the signup page */}
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      {/* Login form */}
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          {/* Email input field */}
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com" // Placeholder text for email
            name="email" // Field name for state tracking
            type="email" // Input type is email
            id="email" // HTML id for the input
            onChange={handleChange} // Call handleChange on input change
          />
        </div>
        <div className="flex-row space-between my-2">
          {/* Password input field */}
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******" // Placeholder text for password
            name="password" // Field name for state tracking
            type="password" // Input type is password
            id="pwd" // HTML id for the input
            onChange={handleChange} // Call handleChange on input change
          />
        </div>
        {/* Display error message if login fails */}
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          {/* Submit button */}
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login; // Export the Login component for use in other parts of the app