import styles from "./IngredientIcon.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredientIcon } from "../../utils/types";
import { FC } from "react";

export const IngredientIcon: FC<IIngredientIcon> = ({ img, extra, count }) => {
  return (
    <>
      <img className={styles.ingredient__image} src={img} alt="ингредиент" />
      {count && count > 1 && !extra && <Counter count={count} size="small" />}
      {extra && (
        <div
          className={`text text_type_main-default ${styles.ingredient__overlay}`}
        >{`+${extra}`}</div>
      )}
    </>
  );
};
