import React from 'react';
import styles from './BurgerIngredients.module.css'
import Menu from '../Menu/Menu'
import CardIngredients from '../CardIngredients/CardIngredients'
import PropTypes from 'prop-types';

function BurgerIngredients(props: { rolls: { image: string; _id: string; name: string; price: number; }[]; sauces: {image: string; _id: string; name: string; price: number; }[]; fillings: { image: string; _id: string; name: string; price: number; }[]; }){
  return(
    <section className={styles.section}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <Menu/>
      <div className={styles.scrollbar}>
      <h2 className="text text_type_main-medium mb-6" id='rolls'>Булки</h2> 
      <ul className={`${styles.cards}`} >

      {props.rolls.map((roll: { image: string; _id: string; name: string; price: number; })=>(
        <CardIngredients image={roll.image} _id={roll._id} name={roll.name} price={roll.price}/>
          ))}
      </ul>

      <h2 className="text text_type_main-medium mb-6" id="sauces">Соусы</h2> 
      <ul className={styles.cards}>
      {props.sauces.map((sauce: { image: string; _id: string; name: string; price: number; })=>(
        <CardIngredients image={sauce.image} _id={sauce._id} name={sauce.name} price={sauce.price}/>
          ))}
      </ul>

      <h2 className="text text_type_main-medium mb-6" id='fillings'>Начинки</h2> 
      <ul className={styles.cards}>
      {props.fillings.map((filling: { image: string; _id: string; name: string; price: number; })=>(
        <CardIngredients image={filling.image} _id={filling._id} name={filling.name} price={filling.price}/>
          ))}
      </ul>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
}; 

export default BurgerIngredients;