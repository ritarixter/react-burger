import logo from "../../images/bulka.jpg";
import styles from './IngredientIcon.module.css'
export function IngredientIcon() {
return(
  <li className={styles.ingredient}>
  <img
    className={styles.ingredient__image}
    src={logo}
    alt="ингредиент"
  />
</li>
)
 }
