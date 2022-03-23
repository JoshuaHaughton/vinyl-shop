import classes from './Backdrop.module.css'
interface BackdropProps {
  closeModal: () => void;
}


 const Backdrop = (props: BackdropProps): JSX.Element => {
  return <div className={classes.backdrop} onClick={() => props.closeModal()} />;
};

export default Backdrop;