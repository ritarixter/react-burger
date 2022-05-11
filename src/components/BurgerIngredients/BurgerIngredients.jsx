import React from "react";
import styles from "./BurgerIngredients.module.css";
import CardIngredients from "../CardIngredients/CardIngredients";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useSelector, useDispatch } from "react-redux";
import {
  resetIngredientToView,
  setIngredientToView,
} from "../../services/actions/indredients";
import { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
  const ingridients = useSelector(
    (state) => state.ingredientsReducer.ingredients
  );
  const ingredientToView = useSelector(
    (state) => state.ingredientsReducer.ingredientToView
  );
  const ingredientModalOpen = useSelector(
    (state) => state.ingredientsReducer.ingredientModalOpen
  );
  const dispatch = useDispatch();
  const bunRef = useRef(null);
  const mainRef = useRef(null);
  const sauceRef = useRef(null);
  const [current, setCurrent] = React.useState("Булки");

  const handleTabClick = (e, ref) => {
    setCurrent(e);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const buns = React.useMemo(
    () => ingridients.filter((ingredient) => ingredient.type === "bun"),
    [ingridients]
  );
  const sauces = React.useMemo(
    () => ingridients.filter((ingredient) => ingredient.type === "sauce"),
    [ingridients]
  );
  const mains = React.useMemo(
    () => ingridients.filter((ingredient) => ingredient.type === "main"),
    [ingridients]
  );

  function openModal(prop) {
    dispatch(
      setIngredientToView(ingridients.find((item) => item._id === prop))
    );
  }

  function closeModal() {
    dispatch(resetIngredientToView());
  }

  function closeModalEsc(evt) {
    if (evt.key === "Escape") {
      dispatch(resetIngredientToView());
    }
  }
  function ingredintScroll(e) {
    const scrollPosition = e.target.scrollTop;
    const scrollOffset = 400;
    const positionOfSauseSection = sauceRef.current.offsetTop;
    const positionOfMainSection = mainRef.current.offsetTop;
    if (scrollPosition + scrollOffset <= positionOfSauseSection) {
      setCurrent("Булки");
    } else if (scrollPosition + scrollOffset <= positionOfMainSection) {
      setCurrent("Соусы");
    } else {
      setCurrent("Начинки");
    }
  }
  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div style={{ display: "flex" }} className="mb-10">
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={(e) => handleTabClick(e, bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={(e) => handleTabClick(e, sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={(e) => handleTabClick(e, mainRef)}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.scrollbar} onScroll={ingredintScroll}>
        <section ref={bunRef}>
          <h2 className="text text_type_main-medium mb-6" id="buns">
            Булки
          </h2>
          <ul className={`${styles.cards}`}>
            {buns.map((bun) => (
              <CardIngredients
                key={bun._id}//Я добавила каждому cardIngredients key, но ошибка не исчезает,не могу понять в чем причина
                image={bun.image}
                name={bun.name}
                price={bun.price}
                openModal={openModal}
                id={bun._id}
              />
            ))}
          </ul>
        </section>
        <section ref={sauceRef}>
          <h2 className="text text_type_main-medium mb-6" id="sauces">
            Соусы
          </h2>
          <ul className={styles.cards}>
            {sauces.map((sauce) => (
              <>
                <CardIngredients
                  key={sauce._id}
                  image={sauce.image}
                  name={sauce.name}
                  price={sauce.price}
                  openModal={openModal}
                  id={sauce._id}
                />
              </>
            ))}
          </ul>
        </section>

        <section ref={mainRef}>
          <h2 className="text text_type_main-medium mb-6" id="mains">
            Начинки
          </h2>
          <ul className={styles.cards}>
            {mains.map((main) => (
              <CardIngredients
                key={main._id}
                image={main.image}
                name={main.name}
                price={main.price}
                openModal={openModal}
                id={main._id}
              />
            ))}
          </ul>
        </section>
      </div>
      {ingredientModalOpen && (
        <Modal
          title="Детали заказа"
          closeModalEsc={closeModalEsc}
          closeModal={closeModal}
        >
          <IngredientDetails data={ingredientToView} />
        </Modal>
      )}
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
