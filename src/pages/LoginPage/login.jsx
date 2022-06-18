import styles from "./login.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { authorizationUser } from "../../utils/API";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  authorizationFailed,
  getDataUserProfile,
} from "../../services/actions/profile";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { checkEmail } from "../../utils/functions";
import { useState } from "react";

export function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const isAuth = useSelector((state) => state.profileReducer.isAuth);
  const canAuthorizationUser = useCallback((valueEmail, passwordValue) => {
    authorizationUser(valueEmail, passwordValue).then((res) => {
      localStorage.setItem("token", res.refreshToken);
      document.cookie = res.accessToken;
      if (res.success) {
        dispatch(getDataUserProfile());
      } else {
        dispatch(authorizationFailed());
      }
    });
  });
  if (isAuth) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <form
          className={`${styles.form} mb-20`}
          name="authorization"
          onSubmit={(event) => {
            event.preventDefault();
            canAuthorizationUser(valueEmail, valuePassword);
          }}
        >
          <h1 className="text text_type_main-medium mb-6">Вход</h1>

          <div className={styles.input}>
            {" "}
            <Input
              placeholder={"E-mail"}
              onChange={(e) => setValueEmail(e.target.value)}
              value={valueEmail}
              name={"email"}
              size={"default"}
              error={!checkEmail(valueEmail) && valueEmail.length > 0}
              errorText={"Некорректный формат e-mail"}
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
