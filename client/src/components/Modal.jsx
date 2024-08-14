import React from 'react';
import './Modal.css'; // Assuming you have styles for the modal

const Modal = ({ children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
      </div>
    </div>
  );
};

export default Modal;