import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

interface Props {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

interface BackdropProps {
  onClose: () => void;
}

//Backrop and ModalOverlay created here since I don't use them on any other component
const Backdrop = (props: BackdropProps): JSX.Element => {
  return <div className={classes.backdrop} onClick={() => props.onClose()} />;
};

const ModalOverlay = (props: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (onConfirm: () => void, onClose: () => void) => {
    try {
      setLoading(true)

      onConfirm()

      onClose()

      setLoading(false)

    } catch(err) {
      console.log(err);
    }
  }
  
  
  return (
    <div className={`${classes.modal} ${classes.card}`}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
        {/* <p>Have a great day!</p> */}
      </div>
      <footer className={classes.actions}>
        {props.onConfirm && <button className={classes.button} onClick={() => handleConfirm(props.onConfirm!, props.onClose)}>{loading ? (
            <FontAwesomeIcon icon={faSpinner} className={classes.spinner} />
          ) : (
            "Confirm"
          )}</button>}
        <button className={classes.button} onClick={props.onClose}>{props.onConfirm ? 'Cancel' : 'Okay'}</button>
      </footer>
    </div>
  );
};

const Modal = (props: Props): JSX.Element => {
  return (
    <>
      {createPortal(
        <Backdrop onClose={() => props.onClose()} />,
        document.getElementById("backdrop-root")!,
      )}
      {createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onClose={props.onClose}
          onConfirm={props.onConfirm}
        />, document.getElementById('overlay-root')!
      )}
    </>
  );
};

export default Modal;
