import styles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

function IngredientDetails(data) {
  
  return (
    <div className={`${styles.ingridient} pb-15`}>
      <img src={data.data.image} alt="Фото ингридиента" />
      <h3 className="text text_type_main-medium mt-4 mb-8">{data.data.name}</h3>
      <ul className={styles.calories}>
        <li className="mr-5 text text_type_main-default">
          Калории,ккал
          <p
            className={`${styles.calories_number} text text_type_digits-default`}
          >
            {data.data.calories}
          </p>
        </li>
        <li className="mr-5 text text_type_main-default">
          Белки, г
          <p
            className={`${styles.calories_number} text text_type_digits-default`}
          >
            {data.data.proteins}
          </p>
        </li>
        <li className="mr-5 text text_type_main-default">
          Жиры, г
          <p
            className={`${styles.calories_number} text text_type_digits-default`}
          >
            {data.data.fat}
          </p>
        </li>
        <li className="mr-5 text text_type_main-default">
          Углеводы, г
          <p
            className={`${styles.calories_number} text text_type_digits-default`}
          >
            {data.data.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  data: PropTypes.object,
};

export default IngredientDetails;
