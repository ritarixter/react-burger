import React from "react";
import styles from "./ProfilePage.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../utils/hooks";
import {
  editData,
} from "../../services/actions/profile";
import { checkEmail } from "../../utils/functions";
import { useEffect } from "react";
import { ProfileNav } from "../../components/ProfileNav/ProfileNav";

export function ProfilePage() {
  const dispatch = useDispatch();
  const inputRefPassword = React.useRef(null);
  const inputRefName = React.useRef(null);
  const inputRefEmail = React.useRef(null);
  const name = useSelector((state) => state.profileReducer.name);
  const email = useSelector((state) => state.profileReducer.email);
  const password = useSelector((state) => state.profileReducer.password);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [disabledPassword, setDisabledPassword] = React.useState(true);
  const [disabledName, setDisabledName] = React.useState(true);
  const [disabledEmail, setDisabledEmail] = React.useState(true);
  const [type, setType] = React.useState("password");
  const [valueName, setValueName] = React.useState("");
  const [valueEmail, setValueEmail] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");

  let emailSuccess = !checkEmail(valueEmail);
  useEffect(() => {
    setValueName(name);
    setValueEmail(email);
    setValuePassword(password);
  }, [name, email, password]);

  useEffect(() => {
    if (checkEmail(valueEmail) & (valuePassword.length > 5)) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [valueEmail, valuePassword]);

  const onIconClickName = () => {
    setTimeout(() => inputRefName.current.focus(), 0);
    if (disabledName) {
      setDisabledName(false);
    } else {
      setDisabledName(true);
    }
  };

  const onIconClickEmail = () => {
    setTimeout(() => inputRefEmail.current.focus(), 0);
    if (disabledEmail) {
      setDisabledEmail(false);
    } else {
      setDisabledEmail(true);
    }
  };

  const onClickCancel = () => {
    setValueName(name);
    setValueEmail(email);
    setValuePassword(password);
  };

  const onIconClickPassword = () => {
    setTimeout(() => inputRefPassword.current.focus(), 0);
    if (type === "password") {
      setType("text");
      setDisabledPassword(false);
    } else {
      setType("password");
      setDisabledPassword(true);
    }
  };
  return (
    <section className={styles.main}>
      <div className={styles.profile}>
        <ProfileNav paragraph={'В этом разделе вы можете изменить свои персональные данные'} />
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(editData(valueName, valueEmail));
          }}
        >
          <div className={`${styles.input}`}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={(e) => setValueName(e.target.value)}
              onBlur={() => setDisabledName(true)}
              icon={"EditIcon"}
              value={valueName}
              name={"name"}
              onIconClick={onIconClickName}
              error={valueName.length < 1}
              errorText={"Некорректное имя"}
              size={"default"}
              ref={inputRefName}
              disabled={disabledName}
            />
          </div>
          <div className={`${styles.input} mb-6 mt-6`}>
            <Input
              type={"email"}
              placeholder={"E-mail"}
              onChange={(e) => setValueEmail(e.target.value)}
              onBlur={() => setDisabledEmail(true)}
              icon={"EditIcon"}
              value={valueEmail}
              name={"email"}
              onIconClick={onIconClickEmail}
              error={emailSuccess}
              errorText={"Некорректный формат e-mail"}
              size={"default"}
              ref={inputRefEmail}
              disabled={disabledEmail}
            />
          </div>
          <div className={`${styles.input} mb-6`}>
            <Input
              type={type}
              placeholder={"Пароль"}
              onChange={(e) => setValuePassword(e.target.value)}
              onBlur={() => {
                setDisabledPassword(true);
                setType("password");
              }}
              icon={"EditIcon"}
              value={valuePassword}
              name={"password"}
              onIconClick={onIconClickPassword}
              error={valuePassword.length < 6}
              errorText={"Некорректный пароль"}
              size={"default"}
              ref={inputRefPassword}
              disabled={disabledPassword}
            />
          </div>
          <div className={styles.buttons}>
            {" "}
            <Button
              type="secondary"
              size="medium"
              onClick={(e) => {
                e.preventDefault();
                onClickCancel();
              }}
            >
              Отмена
            </Button>
            <Button
              type="primary"
              size="medium"
              htmlType="submit"
              disabled={btnDisabled}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

/*<Route path="/profile" exact={true}>...
  </Route>
  <Route path="/profile/orders" exact={true}>
      ...
  </Route> -- Почему не работает конструкция? */