import React, { FC } from "react";
import styles from "./RegisterPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../../utils/API";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const RegisterPage: FC = () => {
  const history = useHistory();
  const [valueEmail, setValueEmail] = React.useState("");
  const [valueName, setValueName] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");

  const canRegisterUser = useCallback(
    (valueName: string, valueEmail: string, passwordValue: string) => {
      registerUser(valueName, valueEmail, passwordValue).then((res) => {
        const success = res.success;
        if (success) {
          history.replace({ pathname: "/" });
        }
      });
    },
    []
  );
  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <form
          className={`${styles.form} mb-20`}
          onSubmit={(event) => {
            event.preventDefault();
            canRegisterUser(valueName, valueEmail, valuePassword);
          }}
          name="register"
        >
          <h1 className="text text_type_main-medium mb-6">Регистрация</h1>

          <div className={`${styles.input} mb-6`}>
            <Input
              placeholder={"Имя"}
              name={"name"}
              onChange={(e) => setValueName(e.target.value)}
              value={valueName}
            />
          </div>
          <div className={styles.input}>
            <Input
              placeholder={"E-mail"}
              onChange={(e) => setValueEmail(e.target.value)}
              value={valueEmail}
              name={"email"}
              size={"default"}
              icon={undefined}
            />
          </div>
          <div className={`${styles.input} mb-6 mt-6`}>
            <PasswordInput
              onChange={(e) => setValuePassword(e.target.value)}
              value={valuePassword}
              name={"password"}
            />
          </div>

          <Button type="primary" size="medium" htmlType="submit">
            Зарегистрироваться
          </Button>
        </form>

        <p className="mb-4 text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link
            to="/login"
            href="#"
            className={`${styles.link} text text_type_main-default`}
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
