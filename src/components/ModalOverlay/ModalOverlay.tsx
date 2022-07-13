import styles from "./ModalOverlay.module.css";
import { MouseEventHandler } from "react";

function ModalOverlay(props: { closeModal: MouseEventHandler<HTMLDivElement> | undefined; }) {
  return <div className={styles.overlay} onClick={props.closeModal}></div>;
}
export default ModalOverlay;
