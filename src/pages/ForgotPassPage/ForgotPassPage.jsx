import React, { useCallback } from "react";
import styles from "./ForgotPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { canPasswordReset } from "../../utils/API";
import { useDispatch } from "react-redux";
import {
  wasOnPageForgotPassword,
  wasNotOnPageForgotPassword,
} from "../../services/actions/profile";
import { checkEmail } from "../../utils/functions";

export function ForgotPassPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [valueEmail, setValueEmail] = React.useState("");
  const canResetPass = useCallback(
    (valueEmail) => {
      canPasswordReset(valueEmail).then((res) => {
        const success = res.success;
        if (success) {
          dispatch(wasOnPageForgotPassword());
          history.replace({ pathname: "/reset-password" });
        } else {
          dispatch(wasNotOnPageForgotPassword());
        }
      });
    },
    [history]
  );

  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <form
          className={`${styles.form} mb-20`}
          onSubmit={(event) => {
            event.preventDefault();
            canResetPass(valueEmail);
          }}
          name="forgot-pass"
        >
          <h1 className="text text_type_main-medium mb-6">
            Восстановление пароля
          </h1>

          <div className={`${styles.input} mb-6`}>
            <Input
              type={"email"}
              placeholder={"Укажите e-mail"}
              onChange={(e) => setValueEmail(e.target.value)}
              value={valueEmail}
              name={"email"}
              size={"default"}
              error={!checkEmail(valueEmail) && valueEmail.length > 0}
              errorText={"Некорректный формат e-mail"}
            />
          </div>

          <Button type="primary" size="medium" htmlType="submit">
            Восстановить
          </Button>
        </form>

        <p className="mb-4 text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link
            to="/login"
            className={`${styles.link} text text_type_main-default`}
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
