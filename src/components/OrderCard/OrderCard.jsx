import styles from "./OrderCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientIcon } from "../IngregientIcon/IngredientIcon";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function OrderCard(props) {
  const location = useLocation();
  return (
    <Link
    to={{
      pathname: `${props.path}${props.id}`,
      state: { background: location },
    }}
    className={styles.card__link}
  >
    <li className={styles.card}>
      <div className={styles.header}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </p>
      </div>
      <h2 className="text text_type_main-medium mt-6 mb-6">
        Death Star Starship Main бургер
      </h2>
      <div className={styles.info__burger}>
        <ul className={styles.list}>
         <IngredientIcon/>
         <IngredientIcon/>
         <IngredientIcon/>
        </ul>
        <p className={`${styles.price} text text_type_digits-default`}>
          <span className="mr-2">510</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </li>
    </Link>
  );
}
