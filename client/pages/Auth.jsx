import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        {isLogin ? <Login /> : <Signup />}
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;