import React from 'react';
import styles from './ResetPassPage.module.css';
import { Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Input} from "@ya.praktikum/react-developer-burger-ui-components";
import { Password } from '../../components/PasswordInput/PasswordInput';

export function InputEmail() {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <Input
      type={'text'}
      placeholder={'Введите код из письма'}
      onChange={e => setValue(e.target.value)}
      icon={'undefined'}
      value={value}
      name={'message'}
      error={false}
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
    />
  )
}

export function InputPassword() {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <Input
      type={'password'}
      placeholder={'Введите новый пароль'}
      onChange={e => setValue(e.target.value)}
      icon={'HideIcon'}
      value={value}
      name={'password'}
      error={false}
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
    />
  )
}


export function ResetPassPage() {

  return (
    <div className={styles.main}>
      <div className={styles.login}>
      <form className={`${styles.form} mb-20`}>
        <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
        <div className={`${styles.input} mb-6`}><InputPassword/></div> 
        <div className={`${styles.input} mb-6`}><InputEmail/></div> 
        
 
        <Button type="primary" size="medium">
        Сохранить
        </Button>
      </form>

      <p className='mb-4 text text_type_main-default text_color_inactive'>Вспомнили пароль? <a href="#" className={`${styles.link} text text_type_main-default`}>Войти</a></p>

      </div>
      </div>
  )
}