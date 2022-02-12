import styles from './IngredientDetails.module.css'

function IngredientDetails(){
 return(
   <div className={`${styles.ingridient} pb-15`}>
     <img src="https://sds/" alt="Фото ингридиента" />
     <h3 className="text text_type_main-medium mt-4 mb-8">Биокотлета из марсианской</h3>
     <ul className={styles.calories}>
       <li className='mr-5 text text_type_main-default'>Калории,ккал
        <p className={`${styles.calories_number} text text_type_digits-default`}>200</p> 
       </li>
       <li className='mr-5 text text_type_main-default'>Белки, г
         <p className={`${styles.calories_number} text text_type_digits-default`}>15,3</p>
       </li>
       <li className='mr-5 text text_type_main-default'>Жиры, г
       <p className={`${styles.calories_number} text text_type_digits-default`}>15,3</p></li>
       <li className='mr-5 text text_type_main-default'>Углеводы, г
       <p className={`${styles.calories_number} text text_type_digits-default`}>15,3</p></li>
     </ul>
   </div>
 )
}

export default IngredientDetails