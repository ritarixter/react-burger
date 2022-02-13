import React from "react";
import styles from "./BurgerIngredients.module.css";
import Menu from "../Menu/Menu";
import CardIngredients from "../CardIngredients/CardIngredients";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function BurgerIngredients(props: {
  buns: { image: string; _id: string; name: string; price: number }[];
  sauces: { image: string; _id: string; name: string; price: number }[];
  mains: { image: string; _id: string; name: string; price: number }[];
  dataIngrigients: any;
}) {

  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState([])

 function openModal(prop: any){
  setOpen(true)
  {props.dataIngrigients &&
    setData(props.dataIngrigients.find((item: any) => item._id === prop))
   }
 }

 function closeModal(){
  setOpen(false)
 }

function closeModalEsc(evt: { key: string; }){
 if (evt.key === "Escape") {
   setOpen(false);
 }
  
}

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <Menu />
      <div className={styles.scrollbar}>
        <h2 className="text text_type_main-medium mb-6" id="buns">
          Булки
        </h2>
        <ul className={`${styles.cards}`}>
          {props.buns.map(
            (bun: {
              image: string;
              _id: string;
              name: string;
              price: number;
            }) => (
              <CardIngredients
                image={bun.image}
                key={bun._id}
                name={bun.name}
                price={bun.price}
                openModal={openModal}
                id={bun._id}
              />
            )
          )}
        </ul>

        <h2 className="text text_type_main-medium mb-6" id="sauces">
          Соусы
        </h2>
        <ul className={styles.cards}>
          {props.sauces.map(
            (sauce: {
              image: string;
              name: string;
              price: number;
              _id: string;
            }) => (
              <CardIngredients
                image={sauce.image}
                key={sauce._id}
                name={sauce.name}
                price={sauce.price}
                openModal={openModal}
                id={sauce._id}
              />
            )
          )}
        </ul>

        <h2 className="text text_type_main-medium mb-6" id="mains">
          Начинки
        </h2>
        <ul className={styles.cards}>
          {props.mains.map(
            (main: {
              image: string;
              _id: string;
              name: string;
              price: number;
            }) => (
              <CardIngredients
                image={main.image}
                key={main._id}
                name={main.name}
                price={main.price}
                openModal={openModal}
                id={main._id}
              />
            )
          )}
        </ul>
      </div>
      {open &&

      
          
        <Modal title="Детали заказа" closeModalEsc={closeModalEsc} closeModal={closeModal}><IngredientDetails data={data}/></Modal>

    }
    </section>
  );
}

BurgerIngredients.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
};

export default BurgerIngredients;
