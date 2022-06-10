import React from "react";
import styles from "./login.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { authorizationUser } from "../../utils/API";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { getCookie } from "../../utils/getCookie";

export function LoginPage() {
  const history = useHistory();
  const [valueEmail, setValueEmail] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");
 // const [success, setSuccess] = React.useState(false)



  const canAuthorizationUser = useCallback(
    (valueEmail, passwordValue) => {
     authorizationUser(valueEmail, passwordValue)
      .then((res) => {
        const authorizationSuccess = res.success;
        localStorage.setItem("token", res.refreshToken);
        document.cookie= res.accessToken
        console.log(document.cookie)
        if (authorizationSuccess) {
          //также сохраняем пользователя в приложении добавить
          history.replace({ pathname: "/" });
        }
       
      }) 
    })
  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <form className={`${styles.form} mb-20`} name="authorization"   onSubmit={(event) => {
            event.preventDefault();
            canAuthorizationUser(valueEmail, valuePassword);
          }}>
          <h1 className="text text_type_main-medium mb-6">Вход</h1>

          <div className={styles.input}>
            {" "}
            <Input
              placeholder={"E-mail"}
              onChange={(e) =>  setValueEmail(e.target.value) }
              value={valueEmail}
              name={"email"}
              size={"default"}
              //error={success ? false : true}
              //errorText={'Неверный e-mail или пароль'}
            />
          </div>
          <div className={`${styles.input} mb-6 mt-6`}>
            {" "}
            <PasswordInput
              onChange={(e) => setValuePassword(e.target.value)}
              value={valuePassword}
            />
          </div>

          <Button type="primary" size="medium" htmlType="submit">
            Войти
          </Button>
        </form>

        <p className="mb-4 text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{" "}
          <Link
            to="/register"
            className={`${styles.link} text text_type_main-default`}
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link
            to="/forgot-password"
            className={`${styles.link} text text_type_main-default`}
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
}
