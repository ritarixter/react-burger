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

function BurgerConstructor(props: {
  buns: { image: string; _id: string; name: string; price: number }[];
  mains: { image: string; _id: string; name: string; price: number }[];
  sauces: { image: string; _id: string; name: string; price: number }[];
}) {
  const [open, setOpen] = React.useState(false);
  function openModal() {
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
      {props.buns.length > 0 &&
        props.sauces.length > 0 &&
        props.mains.length > 0 && (
          <ul className={styles.burger_list}>
            <li className="ml-8" key={props.buns[0]._id}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${props.buns[0].name} (верх)`}
                price={props.buns[0].price}
                thumbnail={props.buns[0].image}
              />
            </li>
            <div className={`${styles.scrollbar}`}>
              {props.mains.map(
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

              {props.sauces.map(
                (
                  item: {
                    name: string;
                    price: number;
                    image: string;
                  },
                  index
                ) => (
                  <li className={styles.list_item} key={`sauce_${index}`}>
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
            <li className="ml-8" key={props.buns[0]._id + 1}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${props.buns[0].name} (низ)`}
                price={props.buns[0].price}
                thumbnail={props.buns[0].image}
              />
            </li>
          </ul>
        )}
      <article className={`${styles.order} mt-10`}>
        <p className={`text text_type_digits-medium mr-10 ${styles.price}`}>
          610{" "}
          <span className={`${styles.price_icon} ml-3`}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </article>
      {open && (
        <Modal
          title="Детали заказа"
          closeModalEsc={closeModalEsc}
          closeModal={closeModal}
        >
          <OrderDetails />
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
};

export default BurgerConstructor;
