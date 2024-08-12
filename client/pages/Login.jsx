import React from 'react';
import Modal from '../src/components/Modal'; // Adjusted import path

const Login = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="email" required />
        </label>
        <label>
          Password:
          <input type="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
    </Modal>
  );
};

export default Login;
