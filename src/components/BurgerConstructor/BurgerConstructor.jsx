import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useSelector, useDispatch } from "react-redux";
import {
  getOrderData,
  setOrderClose,
  setOrderOpen,
} from "../../services/actions/order";
import { useDrop } from "react-dnd";
import {
  addBunElement,
  addNonBunElement,
  udpadeElementsOrder,
} from "../../services/actions/constructor";
import { useCallback } from "react";
import DraggableItem from "../draggableItem/draggableItem";



function BurgerConstructor() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ingredientsReducer.ingredients);
  const openOrder = useSelector((state) => state.orderReducer.orderOpen);
  const orderRequest = useSelector((state) => state.orderReducer.orderRequest);
  const orderNumber = useSelector((state) => state.orderReducer.orderNumber);
  const bunElement = useSelector(
    (state) => state.constructorReducer.bunElement
  );
  const draggableElements = useSelector(
    (state) => state.constructorReducer.draggableElements
  );

  const orderClearIngredient = useSelector(
    (state) => state.orderReducer.orderClearIngredient
  );
  let ingridients = React.useMemo(
    () => data.filter((ingredient) => ingredient.type !== "bun"),
    [data]
  );

  const bun = React.useMemo(
    () => data.find((ingredient) => ingredient.type === "bun"),
    [data]
  );

  const totalPrice = React.useMemo(() => {
    const bunsPrice = bunElement.type === 'bun' ? bunElement.price * 2 : 0;
    const nonBunElementsPrice = draggableElements.reduce(
      (acc, item) => acc + item.price,
      0
    );
    return bunsPrice + nonBunElementsPrice;
  }, [bunElement, draggableElements]);

  const handleIngredientDrop = ({ id }) => {
    const draggedItem = data.find((item) => item._id === id);
    if (draggedItem.type === "bun") {
      dispatch(addBunElement({ ...draggedItem, uid: uuidv4() }));
    } else if (bunElement._id) {
      // в конструкторе уже есть булка, можно добавить начинку
      dispatch(addNonBunElement({ ...draggedItem, uid: uuidv4() }));
    }
  };

  const handleCanIngredientDrop = ({ id }) => {
    const draggedItem = data.find((item) => item._id === id);
    return !(!bunElement._id && draggedItem.type !== "bun");
    // если в конструкторе еще нет булки, добавить начинку нельзя
  };

  const [{ isHover, isCanDrop, isDragging }, dropTarget] = useDrop(
    {
      accept: "BurgerIngredient",
      drop(itemId) {
        handleIngredientDrop(itemId);
      },
      canDrop(itemId) {
        return handleCanIngredientDrop(itemId);
      },
      collect: (monitor) => ({
        isHover: monitor.isOver(),
        isCanDrop: monitor.canDrop(),
        isDragging: monitor.canDrop() && !monitor.isOver(),
      }),
    },
    [handleIngredientDrop, handleCanIngredientDrop]
  );

  const findDraggableElement = useCallback(
    (uid) => {
      const draggableElement = draggableElements.find(
        (item) => item.uid === uid
      );
      return {
        draggableElement,
        draggableElementIndex: draggableElements.indexOf(draggableElement),
      };
    },
    [draggableElements]
  );

  const moveDraggableElement = useCallback(
    (uid, newIndex) => {
      const { draggableElement } = findDraggableElement(uid);
      dispatch(
        udpadeElementsOrder({
          draggableElement,
          newIndex,
        })
      );
    },
    [findDraggableElement, dispatch]
  );

  const [, sortTarget] = useDrop(() => ({
    accept: "DraggableItem",
  }));

  const isConstructorEmpty = !bunElement._id && !draggableElements.length;

  const constructorElementsClass = `${styles.constructor__elements} 
  ${
    (isConstructorEmpty || isDragging) && styles.constructor__elements_dropArea
  } 
  ${isHover && isCanDrop ? styles.constructor__elements_canDrop : ""}
  ${isHover && !isCanDrop ? styles.constructor__elements_canNotDrop : ""}`;

  function openModal() {
    dispatch(getOrderData(data));
    dispatch(setOrderOpen());
  }
  function closeModal() {
    dispatch(setOrderClose());
  }
  function closeModalEsc(evt) {
    if (evt.key === "Escape") {
      dispatch(setOrderClose());
    }
  }

  return (
    <section className={`${styles.section} mt-25 ml-10 pl-4`}>
        <div ref={dropTarget}>
          <ul className={constructorElementsClass}>
            {bunElement.type === "bun" && (
              <li
                className={`${styles.constructor__bunElement} mr-4 mb-4`}
                data-id={bunElement._id}
              >
                <ConstructorElement
                  type="top"
                  text={`${bunElement.name} (верх)`}
                  price={bunElement.price}
                  thumbnail={bunElement.image}
                  isLocked
                />
              </li>
            )}
            <div className={`${styles.scrollbar}`} ref={sortTarget}>
              {isConstructorEmpty && (
                <p
                  className={`${styles.constructor__text} mt-10
              text text text_type_main-medium text_color_inactive`}
                >
                  Добавьте булочку, чтобы начать собирать бургер
                </p>
              )}
              {draggableElements.map((item) => (
                <DraggableItem
                  key={item.uid}
                  id={item._id}
                  uid={item.uid}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  findDraggableElement={findDraggableElement}
                  moveDraggableElement={moveDraggableElement}
                />
              ))}
            </div>
            {bunElement.type === "bun" && (
              <li
                className={`${styles.constructor__bunElement} mr-4 mb-4`}
                data-id={bunElement._id}
              >
                <ConstructorElement
                  type="top"
                  text={`${bunElement.name} (низ)`}
                  price={bunElement.price}
                  thumbnail={bunElement.image}
                  isLocked
                />
              </li>
            )}
          </ul>
        </div>

      <article className={`${styles.order} mt-10`}>
        <p className={`text text_type_digits-medium mr-10 ${styles.price}`}>
          {totalPrice}
          <span className={`${styles.price_icon} ml-3`}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </article>
      {openOrder && orderRequest && (
        <Modal
          title="Детали заказа"
          closeModalEsc={closeModalEsc}
          closeModal={closeModal}
        >
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  data: PropTypes.array,
};

export default BurgerConstructor;
