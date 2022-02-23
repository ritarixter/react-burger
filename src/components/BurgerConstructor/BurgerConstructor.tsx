import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { DataContext } from "../App/dataContext";
import { dataOrder } from "../../utils/API";

function totalPrice(arr: any[], bun: any) {
  let totalPrice = 0;
  arr.forEach((item) => {
    totalPrice = totalPrice + item.price;
  });
  bun && (totalPrice = totalPrice + bun.price * 2);
  return totalPrice;
}

//Подскажите пожалуйста, при нажатии на кнопку 'Оформить заказ' происходит 3 рендера, как это можно исправить,не могу понять 
function BurgerConstructor() {
  const data: any[] = React.useContext(DataContext);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [orderSuccess, setOrderSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  /*const buns = React.useMemo(
      () =>
        data.filter((ingredient: { type: string }) => ingredient.type === "bun"),
      [data]
    );*/
  const ingridients = React.useMemo(
    () =>
      data.filter((ingredient: { type: string }) => ingredient.type !== "bun"),
    [data]
  );

  const bun = React.useMemo(
    () =>
      data.find((ingredient: { type: string }) => ingredient.type === "bun"),
    [data]
  );

  function openModal() {
    dataOrder(data)
      .then((res: any) => {
        setOrderNumber(res.order.number);
        setOrderSuccess(res.success);
      })
      .catch((err: any) => {
        console.log(err);
        setOrderSuccess(err.success);
      });

    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  function closeModalEsc(evt: { key: string }) {
    if (evt.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <section className={`${styles.section} mt-25 ml-10 pl-4`}>
      {data.length > 0 && (
        <ul className={styles.burger_list}>
          <li className="ml-8" key={bun._id}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
          <div className={`${styles.scrollbar}`}>
            {ingridients.map(
              (
                item: {
                  name: string;
                  price: number;
                  image: string;
                },
                index
              ) => (
                <li className={styles.list_item} key={`mains_${index}`}>
                  <span className="mr-2">
                    <DragIcon type="primary" />
                  </span>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              )
            )}
          </div>
          <li className="ml-8" key={bun._id + 1}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        </ul>
      )}
      <article className={`${styles.order} mt-10`}>
        <p className={`text text_type_digits-medium mr-10 ${styles.price}`}>
          {totalPrice(ingridients, bun)}
          <span className={`${styles.price_icon} ml-3`}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </article>
      {open && orderSuccess && (
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
