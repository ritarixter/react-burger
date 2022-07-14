import styles from "../Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../../ModalOverlay/ModalOverlay";
import { useParams } from "react-router-dom";
import { useDispatch } from "../../../utils/hooks";
import { setOrderClose } from "../../../services/actions/order";
import { IModal, IParams } from "../../../utils/types";

export const ModalOrder: FC<IModal> = (props) => {
  const dispatch = useDispatch();
  const modal: HTMLElement | any = document.getElementById("modal");
  const param = useParams() as IParams;
  const id = param.id;

  function closeModal() {
    dispatch(setOrderClose());
  }

  function closeModalEsc(evt: { key: string }) {
    if (evt.key === "Escape") {
      dispatch(setOrderClose());
    }
  }
  React.useEffect(() => {
    document.addEventListener("keydown", closeModalEsc);
    return () => {
      document.removeEventListener("keydown", closeModalEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <section className={styles.modal}>
      <div className={`${styles.modalContainer} pt-15 pl-10 pr-10 `}>
        <div className={styles.headerModal}>
          {props.title ? (
            <h2 className="text text_type_main-large">{props.title}</h2>
          ) : (
            id && <p className={`text text_type_digits-default`}>#{id}</p>
          )}

          <button className={`${styles.closeModal}`} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {props.children}
      </div>
      <ModalOverlay closeModal={closeModal}></ModalOverlay>
    </section>,
    modal
  );
};

export default ModalOrder;
