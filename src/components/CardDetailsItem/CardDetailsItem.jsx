import styles from './CardDetailsItem.module.css'
import logo from '../../images/bulka.jpg'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export function CardDetailsItem(){

  return(
    <li className={styles.list__item}>
              <div className={styles.list__name}>
              <div className={styles.ingredient}>
              <img
                className={styles.ingredient__image}
                src={logo}
                alt="ингредиент"
              />
              </div>
              <p className={`text text_type_main-default ${styles.paragraph}`}>Флюоресцентная булка R2-D3</p>
              </div>
              <p className={`${styles.price} text text_type_digits-default`}>
            <span className="mr-2">2 x 510</span>
            <CurrencyIcon type="primary" />
          </p>
            </li>
  )
}
