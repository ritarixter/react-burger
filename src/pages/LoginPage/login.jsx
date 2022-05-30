import React from 'react';
import styles from './login.module.css';
import { EmailInput, PasswordInput,Button,Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Password } from '../../components/PasswordInput/PasswordInput';

function InputEmail() {
    const [value, setValue] = React.useState('')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      alert('Icon Click Callback')
    }
    return (
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={e => setValue(e.target.value)}
        icon={'undefined'}
        value={value}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
      />
    )
}

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

      <p className='mb-4'>Вы — новый пользователь? <a href="#">Зарегистрироваться</a></p>
      <p>Забыли пароль? <a href="#">Восстановить пароль</a></p>
      </div>
      </div>
  )
}