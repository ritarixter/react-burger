import styles from "./ModalOverlay.module.css";
import { FC } from "react";
import { IModalOverlay } from "../../utils/types";

export const ModalOverlay: FC<IModalOverlay> = (props) => {
  return <div className={styles.overlay} onClick={props.closeModal}></div>;
};
export default ModalOverlay;
