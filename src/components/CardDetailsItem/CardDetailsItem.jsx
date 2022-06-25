import styles from './CardDetailsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export function CardDetailsItem({ data, count }) {
  return (
    <>
      <div className={styles.list__name}>
        <div className={styles.ingredient}>
          <img
            className={styles.ingredient__image}
            src={data.image}
            alt={data.name}
          />
        </div>
        <p className={`text text_type_main-default ${styles.paragraph}`}>{data.name}</p>
      </div>
      <p className={`${styles.price} text text_type_digits-default`}>
        <span className="mr-2">{count} x {data.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      </>
  )
}
