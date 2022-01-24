import React from 'react';
import styles from './BurgerIngredients.module.css'
import { Tab,CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {rolls,fillings,sauces} from '../../utils/data'
function Menu() {
  const [current, setCurrent] = React.useState('Булки')
  return (
    <div style={{ display: 'flex' }} className='mb-10'>
      <a href='#rolls' className={styles.link}><Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
      Булки
      </Tab></a>
      <a href='#sauces' className={styles.link}>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
      Соусы
      </Tab>
      </a>
      <a href='#fillings' className={styles.link}>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
      Начинки
      </Tab>
      </a>
    </div>
  )
}

function BurgerIngredients(){
  
  return(
    <section className={styles.section}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <Menu/>
      <div className={styles.scrollbar}>
      <h2 className="text text_type_main-medium mb-6" id='rolls'>Булки</h2> 
      <ul className={`${styles.cards}`}>
      {rolls.map((roll)=>(
        <li className={`${styles.card}`}><img src={roll.image} alt={roll.name} className='pl-4 pr-4'/>
        <p className={`${styles.price} mt-1 mb-1`}> 
          <span className="text text_type_main-medium mr-2">{roll.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">
        {roll.name}
        </p>
        </li>
          ))}
      </ul>

      <h2 className="text text_type_main-medium mb-6" id="sauces">Соусы</h2> 
      <ul className={styles.cards}>
      {sauces.map((sauce)=>(
        <li className={`${styles.card} mb-8`}><img src={sauce.image} alt={sauce.name} className='pl-4 pr-4' />
        <p className={`${styles.price} mt-1 mb-1`}> 
          <span className="text text_type_main-medium mr-2">{sauce.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">
        {sauce.name}
        </p>
        </li>
          ))}
      </ul>

      <h2 className="text text_type_main-medium mb-6" id='fillings'>Начинки</h2> 
      <ul className={styles.cards}>
      {fillings.map((filling)=>(
        <li className={`${styles.card} mb-8`}><img src={filling.image} alt={filling.name} className='pl-4 pr-4' />
        <p className={`${styles.price} mt-1 mb-1`}> 
          <span className="text text_type_main-medium mr-2">{filling.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">
        {filling.name}
        </p>
        </li>
          ))}
      </ul>
      </div>
    </section>
  )
}

export default BurgerIngredients;