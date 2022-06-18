import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useRouteMatch } from "react-router-dom";
import styles from "./AppHeader.module.css";

function AppHeader() {
  const matchProfile = useRouteMatch("/profile");
  const match = useRouteMatch("/");

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} mt-4`}>
        <ul className={styles.menu}>
          <li className="text text_type_main-default p-5">
            <NavLink
              to="/"
              className={styles.menu__item}
              activeClassName={styles.menu__item_active}
              exact={true}
            >
              <BurgerIcon type={match?.isExact ? "primary" : "secondary"} />
              <span className="ml-2">Конструктор</span>
            </NavLink>
          </li>

          <li className="text text_type_main-default p-5 ml-2">
            <a href="#" className={styles.menu__item}>
              <ListIcon type="secondary" />{" "}
              <span className="ml-2">Лента заказов</span>
            </a>
          </li>

          <li className={styles.m_center}>
            <a href="#" className={styles.menu__item}>
              <Logo />
            </a>
          </li>

          <li className={`${styles.mr_l} text text_type_main-default p-5`}>
            <NavLink
              to="/profile"
              className={styles.menu__item}
              activeClassName={styles.menu__item_active}
            >
              <ProfileIcon
                type={matchProfile?.isExact ? "primary" : "secondary"}
              />
              <span className="ml-2">Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
