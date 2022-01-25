
import styles from './CardIngredients.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Key} from 'react'

function CardIngredients(props: {image: string; _id: string | Key; name: string; price: number}){
return(
  <li className={`${styles.card}`} key={props._id}><img src={props.image} alt={props.name} className='pl-4 pr-4'/>
  <p className={`${styles.price} mt-1 mb-1`}> 
    <span className="text text_type_main-medium mr-2">{props.price}</span>
    <CurrencyIcon type="primary" />
  </p>
  <p className="text text_type_main-default">
  {props.name}
  </p>
  </li>
)
}
export default CardIngredients