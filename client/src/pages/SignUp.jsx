import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_USER } from '../utils/mutations'; // Import the mutation for signing up a user
import Auth from '../utils/auth'; // Import the authentication utility

function Signup(props) {
  // Initialize form state to hold username, email, and password
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  
  // Set up the ADD_USER mutation with useMutation hook
  const [addUser, { error }] = useMutation(ADD_USER);

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form behavior
    try {
      // Execute the ADD_USER mutation and pass form data as variables
      const mutationResponse = await addUser({
        variables: { username: formState.username, email: formState.email, password: formState.password },
      });
      // Extract the token from the mutation response
      const token = mutationResponse.data.addUser.token;
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
      {/* Link to navigate back to the login page */}
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      {/* Signup form */}
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          {/* Username input field */}
          <label htmlFor="username">Username:</label>
          <input
            placeholder="yourusername" // Placeholder text for username
            name="username" // Field name for state tracking
            type="text" // Input type is text
            id="username" // HTML id for the input
            onChange={handleChange} // Call handleChange on input change
          />
        </div>
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
        {/* Display error message if mutation fails */}
        {error ? (
          <div>
            <p className="error-text">There was an error with your signup</p>
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

export default Signup; // Export the Signup component for use in other parts of the app