import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ children, onClose }) => {
  return (
    <div className={classes.modal}>
      
      <header className={classes.header}>
        <h2>Add Website</h2>
      </header>
      <div className={classes.content}>{children}</div>
       
    </div>
  );
};

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root');
  const backdropRoot = document.getElementById('backdrop-root');

  if (!modalRoot || !backdropRoot) {
    console.error('Modal root or backdrop root element not found');
    return null;
  }

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, backdropRoot)}
      {ReactDOM.createPortal(<ModalOverlay onClose={onClose}>{children}</ModalOverlay>, modalRoot)}
    </React.Fragment>
  );
};

export default Modal;
