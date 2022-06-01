import React from 'react';
import styles from './login.module.css';
import { EmailInput, PasswordInput,Button,Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Password } from '../../components/PasswordInput/PasswordInput';
import { InputEmail } from '../../components/InputEmail/InputEmail';
import { Link } from 'react-router-dom';



export function LoginPage() {

  return (
    <div className={styles.main}>
      <div className={styles.login}>
      <form className={`${styles.form} mb-20`}>
        <h1 className='text text_type_main-medium mb-6'>Вход</h1>

        <InputEmail/>
        <div className="mb-6 mt-6"> <Password /></div>
       
        <Button type="primary" size="medium">
        Войти
        </Button>
      </form>

      <p className='mb-4 text text_type_main-default text_color_inactive'>Вы — новый пользователь? <Link to="/register" className={`${styles.link} text text_type_main-default`}>Зарегистрироваться</Link></p>
      <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to="/forgot-password" className={`${styles.link} text text_type_main-default`}>Восстановить пароль</Link></p>
      </div>
      </div>
  )
}