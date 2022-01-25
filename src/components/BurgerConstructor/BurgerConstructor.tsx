import { ConstructorElement,DragIcon,CurrencyIcon,Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {rolls,fillings,sauces} from '../../utils/data'
import styles from './BurgerConstructor.module.css'

function BurgerConstructor(){
return(
  <section className={`${styles.section} mt-25 ml-10 pl-4`}>
    <ul className={styles.burger_list}>
      <li className='ml-8'>
        <ConstructorElement
        type="top"
        isLocked={true}
        text={rolls[0].name}
        price={rolls[0].price}
        thumbnail={rolls[0].image}
      />
      </li>
      <div className={`${styles.scrollbar}`}>
      {fillings.map((item)=>(
      <li className={styles.list_item}>
        <span className='mr-2'><DragIcon type="primary" /></span>
        <ConstructorElement
      text={item.name}
      price={item.price}
      thumbnail={item.image}
      />
      </li>
      ))}

      {sauces.map((item)=>(
      <li className={styles.list_item}>
        <span className='mr-2'><DragIcon type="primary" /></span>
        <ConstructorElement
      text={item.name}
      price={item.price}
      thumbnail={item.image}
      />
      </li>
      ))}
      </div>
      <li className='ml-8'>
        <ConstructorElement
        type="bottom"
        isLocked={true}
        text={rolls[0].name}
        price={rolls[0].price}
        thumbnail={rolls[0].image}
      />
      </li>
      </ul>
      <article className={`${styles.order} mt-10`}>
     <p className={`text text_type_main-large mr-10 ${styles.price}`}>610 <span className={`${styles.price_icon} ml-3`}><CurrencyIcon type="primary"/></span></p>
     <Button type="primary" size="large">
          Оформить заказ
      </Button>
     </article>
  </section>
)

}

export default BurgerConstructor;