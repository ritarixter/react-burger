import styles from "./CardDetailsItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ICardDetailsItem, IElement } from "../../utils/types";
import { FC } from "react";

export const CardDetailsItem: FC<ICardDetailsItem> = (data) => {
  return (
    <>
      <div className={styles.list__name}>
        <div className={styles.ingredient}>
          <img
            className={styles.ingredient__image}
            src={data.data.image}
            alt={data.data.name}
          />
        </div>
        <p className={`text text_type_main-default ${styles.paragraph}`}>
          {data.data.name}
        </p>
      </div>
      <p className={`${styles.price} text text_type_digits-default`}>
        <span className="mr-2">
          {data.count} x {data.data.price}
        </span>
        <CurrencyIcon type="primary" />
      </p>
    </>
  );
};
