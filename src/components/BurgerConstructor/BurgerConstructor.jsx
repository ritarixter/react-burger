import {
  ConstructorElement,
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

  const totalPrice = React.useMemo(() => {
    const bunsPrice = bunElement.type === "bun" ? bunElement.price * 2 : 0;
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
      dispatch(addNonBunElement({ ...draggedItem, uid: uuidv4() }));
    }
  };

  const [, dropTarget] = useDrop({
    accept: "BurgerIngredient",
    drop(itemId) {
      handleIngredientDrop(itemId);
    },
  });

  const [, sortTarget] = useDrop({
    accept: "DraggableItem",
  });
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
        <ul className={styles.burger_list}>
          {bunElement.type == "bun" ? (
            <li
              className={`${styles.constructor__bunElement} mr-4`}
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
          ) : (
            <li className={`${ styles.constructor__bunElements} ${styles.constructor__bunElements_top} ml-7`}></li>
          )}
          <div className={`${styles.scrollbar}`} ref={sortTarget}>
            {draggableElements.length == 0 && !bunElement._id && (
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

          {bunElement.type == "bun" ? (
            <li
              className={`${styles.constructor__bunElement} mr-4 mb-4`}
              data-id={bunElement._id}
            >
              <ConstructorElement
                type="bottom"
                text={`${bunElement.name} (низ)`}
                price={bunElement.price}
                thumbnail={bunElement.image}
                isLocked
              />
            </li>
          ) : (
            <li
              className={`${styles.constructor__bunElements}  ${styles.constructor__bunElements_buttom} ml-7`}
            ></li>
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
        <Button type="primary" size="large" onClick={openModal} disabled={totalPrice == 0}>
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
