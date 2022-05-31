import React from 'react';
import styles from './ForgotPassPage.module.css';
import { Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Input} from "@ya.praktikum/react-developer-burger-ui-components";

export function InputEmail() {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <Input
      type={'email'}
      placeholder={'Укажите e-mail'}
      onChange={e => setValue(e.target.value)}
      icon={'undefined'}
      value={value}
      name={'email'}
      error={false}
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
    />
  )
}


export function ForgotPassPage() {

  return (
    <div className={styles.main}>
      <div className={styles.login}>
      <form className={`${styles.form} mb-20`}>
        <h1 className='text text_type_main-medium mb-6'>Вход</h1>

        <div className={`${styles.input} mb-6`}><InputEmail/></div> 
 
        <Button type="primary" size="medium">
        Восстановить
        </Button>
      </form>

      <p className='mb-4 text text_type_main-default text_color_inactive'>Вспомнили пароль? <a href="#" className={`${styles.link} text text_type_main-default`}>Войти</a></p>

      </div>
      </div>
  )
}