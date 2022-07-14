import styles from "./IngredientDetails.module.css";
import { useSelector } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import { FC } from "react";
import { IParams } from "../../utils/types";

const IngredientDetails: FC = () => {
  const ingredients = useSelector(
    (state) => state.ingredientsReducer.ingredients
  );
  const param = useParams() as IParams;
  const id = param.id;
  const ingredient = ingredients.find((el: { _id: string }) => el._id === id);

  return ingredient ? (
    <div className={`${styles.ingredient__item} pb-15`}>
      <img src={ingredient.image} alt="Фото ингридиента" />
      <h3 className="text text_type_main-medium mt-4 mb-8">
        {ingredient.name}
      </h3>
      <ul className={styles.calories}>
        <li className="mr-5 text text_type_main-default">
          Калории,ккал
          <p
            className={`${styles.calories_number} text text_type_digits-default`}
          >
            {ingredient.calories}
          </p>
        </li>
        <li className="mr-5 text text_type_main-default">
          Белки, г
          <p
            className={`${styles.calories_number} text text_type_digits-default`}
          >
            {ingredient.proteins}
          </p>
        </li>
        <li className="mr-5 text text_type_main-default">
          Жиры, г
          <p
            className={`${styles.calories_number} text text_type_digits-default`}
          >
            {ingredient.fat}
          </p>
        </li>
        <li className="mr-5 text text_type_main-default">
          Углеводы, г
          <p
            className={`${styles.calories_number} text text_type_digits-default`}
          >
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  ) : (
    <div> Произошла ошибка </div>
  );
};

export default IngredientDetails;
