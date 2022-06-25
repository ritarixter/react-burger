import styles from './IngredientIcon.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
export function IngredientIcon({ img, extra, count, isDiv}) {
return !isDiv ? (
<>
      <img className={styles.ingredient__image} src={img} alt="ингредиент" />
      {count && count > 1 && !extra && <Counter count={count} size="small" />}
      {extra && (
        <div
          className={`text text_type_main-default ${styles.ingredient__overlay}`}>{`+${extra}`}</div>
      )}
   </>
  ) : (
    <div style={{ margin: '0' }}>
      <img className={styles.ingredient__image} src={img} alt="ингредиент" />
      {extra && (
        <div
          className={`text text_type_main-default ${styles.ingredient__overlay}`}>{`+${extra}`}</div>
      )}
    </div>
)
 }