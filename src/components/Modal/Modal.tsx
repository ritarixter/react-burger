import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

function Modal(props: {
  title: string;
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  closeModalEsc: (this: Document, ev: KeyboardEvent) => any;
  closeModal: any;
}) {
  const [open, setOpen] = React.useState(false);
  const modal = document.getElementById("modal");

  React.useEffect(() => {
    document.addEventListener("keydown", props.closeModalEsc);
    return () => {
      document.removeEventListener("keydown", props.closeModalEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <section className={styles.modal}>
      <div className={`${styles.modalContainer} pt-15 pl-10 pr-10 `}>
        <div className={styles.headerModal}>
          <h2 className="text text_type_main-large">
            {props.title && props.title}
          </h2>
          <button className={`${styles.closeModal}`} onClick={props.closeModal}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {props.children}
      </div>
      <ModalOverlay closeModal={props.closeModal}></ModalOverlay>
    </section>,
    modal!
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  closeModalEsc: PropTypes.func,
};

export default Modal;
