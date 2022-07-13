import styles from "./OrderCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientIcon } from "../IngregientIcon/IngredientIcon";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "../../utils/hooks";
import { useMemo } from "react";
import formatDate from "../../utils/formatDate";

export function OrderCard(data) {
  const location = useLocation();
  const ingredients = useSelector(
    (state) => state.ingredientsReducer.ingredients
  );

  const ingredientsInOrder = ingredients.filter((ingredient) => {
    return data.data.ingredients.find((ingre) => {
      return ingredient._id === ingre;
    });
  });

  const ingredientsInOrderBuns = useMemo(
    () => ingredientsInOrder.filter((ingredient) => ingredient.type === "bun"),
    [ingredientsInOrder]
  );


  const ingredientsInOrderNonBuns = useMemo(
    () => ingredientsInOrder.filter((ingredient) => ingredient.type !== "bun"),
    [ingredientsInOrder]
  );
  
  const getCount = (id) => {
    let count = 0;
    ingredientsInOrder.forEach((ingredient) => {
      if (ingredient._id === id) count += 1;
    });
    return count;
  };

  const makeUniq = (arr) => [...new Set(arr)];
  const uniqIngredientsOrder = makeUniq(ingredientsInOrder)

  const totalPrice = uniqIngredientsOrder.reduce((acc, ingredient) =>
    acc + ingredient.price * (ingredient.type === 'bun' ? 2 : getCount(ingredient._id)), 0
  )

  return (
    <Link
      to={{
        pathname: `${data.path}${data.data.number}`,
        state: { background: location },
      }}
      className={styles.card__link}
    >
      <div className={styles.header}>
        <p className="text text_type_digits-default">#{data.data.number}</p>
        <time className="text text_type_main-default text_color_inactive">
          {formatDate(data.data.createdAt)} i-GMT+3
        </time>
      </div>
      <h2 className="text text_type_main-medium mt-6 mb-6">
        {data.data.name}
      </h2>
      <div className={styles.info__burger}>
        <ul className={styles.list}>
          {ingredientsInOrderNonBuns.length > 4 && (
            <li className={styles.ingredient} key={ingredients[ingredients.length - 5]._id}>
            <IngredientIcon
              img={ingredients[ingredients.length - 5].image_mobile}
              extra={ingredients.length - 4}
            />
            </li>
          )}
          {ingredientsInOrderNonBuns.slice(-4).map((ing) => {
          return <li className={styles.ingredient} key={ing._id}>
             <IngredientIcon img={ing.image} />
            </li>
          })}
          {ingredientsInOrderBuns.map((bun)=>{
             return <li className={styles.ingredient} key={bun._id}>
             <IngredientIcon
            img={bun.image}
          />
          </li>
          })
            }
        
        </ul>
        <p className={`${styles.price} text text_type_digits-default`}>
          <span className="mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  );
}
