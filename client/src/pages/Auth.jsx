import React, { useState } from 'react';
import Login from './Login'; // Import Login from the same directory
import Signup from './Signup'; // Import Signup from the same directory
import Modal from '../components/Modal/Modal'; // Import Modal component

const Auth = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {isLogin ? <Login /> : <Signup />}
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default Auth;