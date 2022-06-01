import React from 'react';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export function InputName() {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <Input
      type={'text'}
      placeholder={'Имя'}
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