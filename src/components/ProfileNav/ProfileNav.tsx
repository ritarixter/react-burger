import { logoutProfileUser } from "../../services/actions/profile";
import { useHistory } from "react-router-dom";
import { deleteCookie } from "../../utils/deleteCookie";
import styles from "./ProfileNav.module.css";
import { useDispatch } from "../../utils/hooks";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../utils/API";
import { FC } from "react";
import { IProfileNav } from "../../utils/types";

export const ProfileNav: FC<IProfileNav> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutProfile = () => {
    logoutUser().then((res) => {
      if (res.success) {
        localStorage.removeItem("token");
        deleteCookie("accessToken");
        dispatch(logoutProfileUser());
        history.replace({ pathname: "/login" });
      }
    });
  };
  return (
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
          </NavLink>
        </li>
        <li className={`text text_type_main-medium ${styles.list__item}`}>
          <NavLink
            to="/profile/orders"
            className={styles.menu__item}
            activeClassName={styles.menu__item_active}
            exact={true}
          >
            История Заказов
          </NavLink>
        </li>
        <li
          className={`text text_type_main-medium ${styles.list__item}`}
          onClick={() => logoutProfile()}
        >
          <NavLink to="/login" className={styles.menu__item}>
            Выход
          </NavLink>
        </li>
      </ul>

      <p
        className={`${styles.paragraph} text text_type_main-default text_color_inactive mt-20
`}
      >
        {props.paragraph}
      </p>
    </div>
  );
};
