import React from 'react';
import '../Modal.css';

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className='modal-content'>
        <button className='close' onClick={onClose}>X</button>
        {children}
      </div>
    </>
  );
}
