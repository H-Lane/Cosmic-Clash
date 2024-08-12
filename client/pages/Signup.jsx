import React from 'react';
import Modal from '../src/components/Modal'; // Adjusted import path

const Signup = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Sign Up</h2>
      <form>
        <label>
          Username:
          <input type="text" required />
        </label>
        <label>
          Email:
          <input type="email" required />
        </label>
        <label>
          Password:
          <input type="password" required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </Modal>
  );
};

export default Signup;
