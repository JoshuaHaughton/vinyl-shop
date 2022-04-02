import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { createPortal } from "react-dom";
import { OrderArrayType } from '../../../../types'
import classes from "./Modal.module.css";

interface Props {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  deleteLocalOrder: React.Dispatch<React.SetStateAction<any>>
  order: {
    firstName: string;
    lastName: string;
    companyName: string | null;
    address: string;
    unit: string | null;
    city: string;
    email: string;
    postalOrZip: string;
    provinceOrState: string;
    country: string;
    subtotal: number;
    total: number;
    orderDate: string
    deliveryDate: string;
    uid: string;
    orderId: string;
    items: {
      id: number;
      title: string;
      artist: string;
      url: string;
      originalPrice: number;
      salePrice: number;
      rating: number;
      quantity: number;
      genres: string[]
    }[];
}
}

type OrderType = {
  firstName: string;
  lastName: string;
  companyName: string | null;
  address: string;
  unit: string | null;
  city: string;
  email: string;
  postalOrZip: string;
  provinceOrState: string;
  country: string;
  subtotal: number;
  total: number;
  orderDate: string
  deliveryDate: string;
  uid: string;
  orderId: string;
  items: {
    id: number;
    title: string;
    artist: string;
    url: string;
    originalPrice: number;
    salePrice: number;
    rating: number;
    quantity: number;
    genres: string[]
  };
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

      //Delete local in client while async delete happens in the background
      props.deleteLocalOrder((prev: OrderArrayType)  => {
       let originalOrders = JSON.parse(JSON.stringify(prev))

        let updatedOrders = originalOrders.filter((a: OrderType)  => {
          return a.orderId !== props.order.orderId
        })

        return updatedOrders;
      })

      setLoading(false)
      onClose()

    } catch(err) {

      setLoading(false)
      console.log(err);
    }
  }
  

  return (
    <div className={`${classes.modal} ${classes.card}`}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
        <div className={classes.exit} onClick={props.onClose}>
          <FontAwesomeIcon icon={faTimes} className={classes.exitIcon} />
        </div>
      </header>
      <div className={classes.content}>
        <p> <span className={classes.red}>Warning:</span> {props.message}</p>
      </div>
      <footer className={classes.actions}>
        {props.onConfirm && <button className={`${classes.button} ${classes.cancelButton}`} onClick={() => handleConfirm(props.onConfirm!, props.onClose)}>{loading ? (
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
          order={props.order}
          deleteLocalOrder={props.deleteLocalOrder}
        />, document.getElementById('overlay-root')!
      )}
    </>
  );
};

export default Modal;
