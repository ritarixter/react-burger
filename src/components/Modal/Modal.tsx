import styles from './Modal.module.css'
import {
  CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactChild, ReactFragment, ReactPortal } from 'react';

function Modal(props: { title: string; children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }){

  return(
    <section className={`${styles.modal} pt-15 pl-10 pr-10 `}>
      <div className={styles.headerModal}>
      <h2 className='text text_type_main-large'>{props.title && props.title}</h2>
      <button className={`${styles.closeModal}`}><CloseIcon type="primary" /></button>
      </div>
      {props.children}
    </section>
  )
}

export default Modal