import React from 'react';
import { EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";

export function Email() {
  const [value, setValue] = React.useState('bob@example.com')
  const onChange = e => {
    setValue(e.target.value)
  }
  return <EmailInput onChange={onChange} value={value} name={'email'} />
}