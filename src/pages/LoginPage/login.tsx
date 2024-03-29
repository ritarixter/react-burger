import styles from "./login.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { authorizationUser } from "../../utils/API";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import {
  authorizationFailed,
  getDataUserProfile,
} from "../../services/actions/profile";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { checkEmail } from "../../utils/functions";
import { useState } from "react";
import { setCookie } from "../../utils/setCookie";
import { ILocationState } from "../../utils/types";

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<ILocationState>();
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const isAuth = useSelector((state) => state.profileReducer.isAuth);
  const isAuthFailed = useSelector(
    (state) => state.profileReducer.isAuthFailed
  );

  const canAuthorizationUser = useCallback((valueEmail, passwordValue) => {
    authorizationUser(valueEmail, passwordValue).then((res) => {
      localStorage.setItem("token", res.refreshToken);
      setCookie("accessToken", res.accessToken);
      if (res.success) {
        dispatch(getDataUserProfile());
      } else {
        dispatch(authorizationFailed());
      }
    });
  }, []);

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
              name={"password"}
            />
          </div>
          {isAuthFailed && (
            <p className={` text text_type_main-default ${styles.failed}`}>
              Неверный логин или пароль
            </p>
          )}

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
};
