import styles from "./CardIngredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, DragPreviewImage} from "react-dnd";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

function CardIngredients({id,image,price,name,openModal}) {
  const dispatch = useDispatch()

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
  const ingredientsInOrder = useSelector((state) => [
    state.constructorReducer.bunElement,
    ...state.constructorReducer.draggableElements,
    state.constructorReducer.bunElement,
  ]);

  
  const ingredientsCounter = ingredientsInOrder.filter(
    (item) => item._id === id
  ).length;


  return (
    
    <li className={`${styles.card} ${isDragging && styles.card_isDragging}`} ref={dragRef} onClick={() => openModal(id)} draggable key={id}>
      
      <DragPreviewImage src={image} connect={dragPreview} />
      <img src={image} alt={name} className="pl-4 pr-4" />
      {ingredientsCounter !== 0 && (    <Counter count={ingredientsCounter} size="default" />)}
 
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
