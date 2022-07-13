import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useRouteMatch } from "react-router-dom";
import styles from "./AppHeader.module.css";
import { useSelector } from "../../utils/hooks";
import { FC } from "react";

const AppHeader:FC = () => {
  const matchProfile = useRouteMatch("/profile");
  const matchProfileOrder = useRouteMatch("/profile/orders");
  const matchProfileOrderId = useRouteMatch("/profile/orders/:id");
  const matchFeed= useRouteMatch("/feed");
  const match = useRouteMatch("/");
  const isAuth = useSelector((state) => state.profileReducer.isAuth);
  const name = useSelector((state) => state.profileReducer.name);

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
            <NavLink
              to="/feed"
              className={styles.menu__item}
              activeClassName={styles.menu__item_active}
              exact={true}
            >
              <ListIcon type={matchFeed?.isExact ? "primary" : "secondary"} />
              <span className="ml-2">Лента заказов</span>
            </NavLink>
          </li>

          <li className={styles.m_center}>
          <NavLink
              to="/"
              className={styles.menu__item}  
            >
              <Logo />
              </NavLink>
          </li>

          {isAuth ?
            <li className={`${styles.mr_l} text text_type_main-default p-5`}>
            <NavLink
              to="/profile"
              className={styles.menu__name}
              activeClassName={styles.menu__item_active}
            >
              <ProfileIcon
                type={matchProfile?.isExact || matchProfileOrder?.isExact || (matchProfileOrderId && matchProfileOrderId.isExact) ? "primary" : "success"}
              />
              <span className="ml-2">{name}</span>
            </NavLink>
          </li>
          :
                <li className={`${styles.mr_l} text text_type_main-default p-5`}>
                <NavLink
                  to="/profile"
                  className={styles.menu__item}
                  activeClassName={styles.menu__item_active}
                >
                  <ProfileIcon
                    type={matchProfile?.isExact || matchProfileOrder?.isExact ? "primary" : "secondary"}
                  />
                  <span className="ml-2">Личный кабинет</span>
                </NavLink>
              </li>
          }

      
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
