import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props: any) {
  return <div className={styles.overlay} onClick={props.closeModal}></div>;
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func,
};

export default ModalOverlay;
