import styles from "./CardIngredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { addBunElement } from "../../services/actions/constructor";

function CardIngredients({id,image,price,name,openModal}) {
  const dispatch = useDispatch()
  const onDragHandler = (e) => {
    console.log(e)
    e.preventDefault();
    dispatch(addBunElement(e))
  }

  const [{ isDragging }, dragRef, dragPreview] = useDrag(
    {
      type: 'BurgerIngredient',
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [id]
  );

  return (
    <li className={`${styles.card}`} ref={dragRef} onClick={() => openModal(id)} draggable onDrag={(e) => onDragHandler(e)} key={id}>
      <img src={image} alt={name} className="pl-4 pr-4" />
      <p className={`${styles.price} mt-1 mb-1`}>
        <span className="text text_type_main-medium mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">{name}</p>
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
