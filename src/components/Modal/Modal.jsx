import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Modal(props) {
  const modal = document.getElementById("modal");
  const param = useParams();
  const id = param.id;


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
          {props.title ? (
            <h2 className="text text_type_main-large">{props.title}</h2>
          ) : (
            id && (
              <p className={`text text_type_digits-default`}>#{id}</p>
            )
          )}

          <button className={`${styles.closeModal}`} onClick={props.closeModal}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {props.children}
      </div>
      <ModalOverlay closeModal={props.closeModal}></ModalOverlay>
    </section>,
    modal
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  closeModalEsc: PropTypes.func,
};

export default Modal;
