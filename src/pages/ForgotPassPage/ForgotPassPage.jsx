import React, { useCallback } from "react";
import styles from "./ForgotPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { canPasswordReset } from "../../utils/API";

export function ForgotPassPage() {
  const history = useHistory();
  const [valueEmail, setValueEmail] = React.useState("");
  const canResetPass = useCallback(
    (valueEmail) => {
      canPasswordReset(valueEmail).then((res) => {
        const success = res.success;
        if (success) {
          history.replace({ pathname: "/reset-password" });
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
