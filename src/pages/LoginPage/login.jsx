import React from 'react';
import styles from './login.module.css';
import { Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Password } from '../../components/PasswordInput/PasswordInput';
import { InputEmail } from '../../components/InputEmail/InputEmail';


export function LoginPage() {

  return (
    <div className={styles.main}>
      <div className={styles.login}>
      <form className={`${styles.form} mb-20`}>
        <h1 className='text text_type_main-medium mb-6'>Вход</h1>

        <div className={styles.input}><InputEmail/></div> 
        <div className={`${styles.input} mb-6 mt-6`}> <Password /></div>
       
        <Button type="primary" size="medium">
        Войти
        </Button>
      </form>

      <p className='mb-4 text text_type_main-default text_color_inactive'>Вы — новый пользователь? <a href="#" className={`${styles.link} text text_type_main-default`}>Зарегистрироваться</a></p>
      <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <a href="#" className={`${styles.link} text text_type_main-default`}>Восстановить пароль</a></p>
      </div>
      </div>
  )
}