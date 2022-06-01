import React from 'react';
import styles from './RegisterPage.module.css';
import { Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Password } from '../../components/PasswordInput/PasswordInput';
import { InputEmail } from '../../components/InputEmail/InputEmail';
import { InputName } from '../../components/InputName/InputName';
import { Link } from 'react-router-dom';

export function RegisterPage(){
  return(
    <div className={styles.main}>
    <div className={styles.login}>
    <form className={`${styles.form} mb-20`}>
      <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>

      <div className={`${styles.input} mb-6`}><InputName/></div> 
      <div className={styles.input}><InputEmail/></div> 
      <div className={`${styles.input} mb-6 mt-6`}> <Password /></div>
     
      <Button type="primary" size="medium">
      Зарегистрироваться
      </Button>
    </form>

    <p className='mb-4 text text_type_main-default text_color_inactive'>Уже зарегистрированы? <Link to="/login" href="#" className={`${styles.link} text text_type_main-default`}>Войти</Link></p>
    </div>
    </div>
  )
}