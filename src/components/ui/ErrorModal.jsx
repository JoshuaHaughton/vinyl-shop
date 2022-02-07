import React from "react";
import { createPortal } from "react-dom";
import classes from "./ErrorModal.module.css";

//Backrop and ModalOverlay created here since I don't use them on any other component
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${classes.modal} ${classes.card}`}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
        <p>Have a great day!</p>
      </div>
      <footer className={classes.actions}>
        <button className={classes.button} onClick={props.onConfirm}>Okay</button>
      </footer>
    </div>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root"),
      )}
      {createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />, document.getElementById('overlay-root')
      )}
    </>
  );
};

export default ErrorModal;
