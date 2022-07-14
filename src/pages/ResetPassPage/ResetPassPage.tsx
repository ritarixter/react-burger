import React, { MutableRefObject, useRef } from "react";
import styles from "./ResetPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { resetPassword } from "../../utils/API";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { wasNotOnPageForgotPassword } from "../../services/actions/profile";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

export function ResetPassPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [icon, setIcon] = React.useState<keyof TICons | undefined>("ShowIcon");
  const [type, setType] = React.useState<
    "password" | "text" | "email" | undefined
  >("password");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [successForm, setSuccessForm] = React.useState(false);
  const [codeValue, setCodeValue] = React.useState("");
  const wasOnPageForgotPassword = useSelector(
    (state) => state.profileReducer.wasOnPageForgotPassword
  );
  const inputRef: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    if (icon === "ShowIcon") {
      setIcon("HideIcon");
      setType("text");
    } else {
      setIcon("ShowIcon");
      setType("password");
    }
  };

  const resetPass = useCallback(
    (passwordValue: string, codeValue: string) => {
      dispatch(wasNotOnPageForgotPassword());
      resetPassword(passwordValue, codeValue).then((res) => {
        const success = res.success;
        if (success) {
          setSuccessForm(true);
          history.replace({ pathname: "/login" });
        }
      });
    },
    [history]
  );
  if (!wasOnPageForgotPassword && !successForm) {
    history.replace({ pathname: "/forgot-password" });
  }

  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <form
          className={`${styles.form} mb-20`}
          onSubmit={(event) => {
            event.preventDefault();
            resetPass(passwordValue, codeValue);
          }}
          name="reset-pass"
        >
          <h1 className="text text_type_main-medium mb-6">
            Восстановление пароля
          </h1>
          <div className={`${styles.input} mb-6`}>
            <Input
              type={type}
              placeholder={"Введите новый пароль"}
              onChange={(e) => setPasswordValue(e.target.value)}
              icon={icon}
              value={passwordValue}
              name={"password"}
              ref={inputRef}
              onIconClick={onIconClick}
              error={passwordValue.length < 6}
              errorText={"Некорректный пароль"}
              size={"default"}
            />
          </div>
          <div className={`${styles.input} mb-6`}>
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              onChange={(e) => setCodeValue(e.target.value)}
              value={codeValue}
              name={"token"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>

          <Button type="primary" size="medium" htmlType="submit">
            Сохранить
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
