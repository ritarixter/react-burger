import React from "react";
import styles from "./ProfilePage.module.css";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../utils/API";
import { useDispatch, useSelector } from "react-redux";
import { getData, logoutProfileUser, editData} from "../../services/actions/profile";
import { checkEmail } from "../../utils/functions";
import { useEffect } from "react";



export function ProfilePage() {
  const dispatch = useDispatch();
  const inputRefPassword = React.useRef(null);
  const inputRefName = React.useRef(null);
  const name = useSelector((state) => state.profileReducer.name);
  const email = useSelector((state) => state.profileReducer.email);
  const password = useSelector((state) => state.profileReducer.password);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [disabledPassword, setDisabledPassword] = React.useState(true);
  const [disabledName, setDisabledName] = React.useState(true);
  const [type, setType] = React.useState("password");
  const [valueName, setValueName] = React.useState("");
  const [valueEmail, setValueEmail] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState('');

  useEffect(() => {
    localStorage.getItem('token') && dispatch(getData());
  }, [dispatch]);


 useEffect(() => {
    setValueName(name);
    setValueEmail(email);
    setValuePassword(password); 
  }, [name,email,password]);

  useEffect(() => {
    if (checkEmail(valueEmail) && valuePassword.length > 5) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [valueEmail, valuePassword]);

  const logoutProfile = () => {
    logoutUser(localStorage.getItem("token")).then((res) => {
      if (res.success) {
        localStorage.removeItem("token");
        dispatch(logoutProfileUser());
      }
    });
  };
  const onIconClickName = () => {
    setTimeout(() => inputRefName.current.focus(), 0);
    if (disabledName) {
      setDisabledName(false);
    } else {
      setDisabledName(true);
    }
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
        <div>
          <ul className={styles.list}>
            <li className={`text text_type_main-medium ${styles.list__item}`}>
              {" "}
              <NavLink
                exact={true}
                to="/profile"
                className={styles.menu__item}
                activeClassName={styles.menu__item_active}
              >
                Профиль
              </NavLink>{" "}
            </li>
            <li className={`text text_type_main-medium ${styles.list__item}`}>
              {" "}
              <NavLink
                to="/profile/order"
                className={styles.menu__item}
                activeClassName={styles.menu__item_active}
              >
                История Заказов
              </NavLink>
            </li>
            <li
              className={`text text_type_main-medium ${styles.list__item}`}
              onClick={() => logoutProfile()}
            >
              <NavLink to="/profile" className={styles.menu__item}>
                Выход
              </NavLink>
            </li>
          </ul>

          <p
            className={`${styles.paragraph} text text_type_main-default text_color_inactive mt-20
    `}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form className={styles.form}  onSubmit={(event) => {
            event.preventDefault();
            dispatch(editData(valueName, valueEmail));
          }}>
          <div className={`${styles.input}`}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={(e) => setValueName(e.target.value)}
              onBlur={()=> setDisabledName(true)}
              icon={"EditIcon"}
              value={valueName}
              name={"name"}
              onIconClick={onIconClickName}
              errorText={"Некорректный пароль"}
              size={"default"}
              ref={inputRefName}
              disabled={disabledName}
            />
          </div>
          <div className={`${styles.input} mb-6 mt-6`}>
            <EmailInput
              onChange={(e) => setValueEmail(e.target.value)}
              value={valueEmail}
              name={"email"}
            />
          </div>
          <div className={`${styles.input} mb-6`}>
            <Input
              type={type}
              placeholder={"Пароль"}
              onChange={(e) => setValuePassword(e.target.value)}
              onBlur={()=> {setDisabledPassword(true); setType("password"); }}
              icon={"EditIcon"}
              value={valuePassword}
              name={"password"}
              onIconClick={onIconClickPassword}
              errorText={"Некорректный пароль"}
              size={"default"}
              ref={inputRefPassword}
              disabled={disabledPassword}
            />
          </div>
          <div className={styles.buttons}>
            {" "}
            <Button type="secondary" size="medium">
              Отмена
            </Button>
            <Button type="primary" size="medium" htmlType="submit" disabled={btnDisabled}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
