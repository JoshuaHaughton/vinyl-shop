import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./SuccessModal.module.css";

interface Props {
  title: string;
  closeModal: () => void;
  message: string;
}

const SuccessModalOverlay = (props: Props) => {
  return (
    <div className={`${classes.modal} ${classes.card}`}>
      <header className={classes.header}>
        <h2 className={classes.title}>{props.title}</h2>
        <div className={classes.exit} onClick={props.closeModal}>
          <FontAwesomeIcon icon={faTimes} className={classes.exitIcon} />
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.text}>{props.message}</p>
        <br />
        <p>Have a great day!</p>
      </div>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.closeModal}>
          Okay
        </button>
      </div>
    </div>
  );
};

export default SuccessModalOverlay;
