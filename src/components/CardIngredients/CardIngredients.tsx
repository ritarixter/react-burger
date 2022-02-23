import styles from "./CardIngredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function CardIngredients(props: {
  image: string;
  name: string;
  price: number;
  openModal: any;
  id: string;
}) 
{
  return (
    <li className={`${styles.card}`} onClick={() => props.openModal(props.id)}>
      <img src={props.image} alt={props.name} className="pl-4 pr-4" />
      <p className={`${styles.price} mt-1 mb-1`}>
        <span className="text text_type_main-medium mr-2">{props.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">{props.name}</p>
    </li>
  );
}

CardIngredients.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  openModal: PropTypes.func,
};

export default CardIngredients;
