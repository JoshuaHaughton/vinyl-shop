import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "../Backdrop";
import ModalOverlay from "./SuccessModalOverlay";

interface Props {
  title: string
  closeModal: () => void
  message: string
}

const SuccessModal = (props: Props) => {
  return (
    <>
      {createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!,
      )}
      {createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          closeModal={props.closeModal}
        />, document.getElementById('overlay-root')!
      )}
    </>
  );
};

export default SuccessModal;
