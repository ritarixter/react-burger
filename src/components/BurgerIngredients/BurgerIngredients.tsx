import React, { FC, MutableRefObject, SetStateAction } from "react";
import styles from "./BurgerIngredients.module.css";
import CardIngredients from "../CardIngredients/CardIngredients";
import { useSelector } from "../../utils/hooks";
import { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IElement } from "../../utils/types";

const BurgerIngredients: FC = () => {
  const ingridients = useSelector(
    (state) => state.ingredientsReducer.ingredients
  );
  const bunRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const mainRef: MutableRefObject<HTMLDivElement | any> =
    useRef<HTMLDivElement>(null);
  const sauceRef: MutableRefObject<HTMLDivElement | any> =
    useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState("Булки");

  const handleTabClick = (
    e: SetStateAction<string>,
    ref: MutableRefObject<any>
  ) => {
    setCurrent(e);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const buns = React.useMemo(
    () =>
      ingridients.filter(
        (ingredient: { type: string }) => ingredient.type === "bun"
      ),
    [ingridients]
  );
  const sauces = React.useMemo(
    () =>
      ingridients.filter(
        (ingredient: { type: string }) => ingredient.type === "sauce"
      ),
    [ingridients]
  );
  const mains = React.useMemo(
    () =>
      ingridients.filter(
        (ingredient: { type: string }) => ingredient.type === "main"
      ),
    [ingridients]
  );

  function ingredintScroll(e: React.UIEvent<HTMLDivElement>) {
    const scrollPosition = e.currentTarget.scrollTop;
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
        <div ref={bunRef}>
          <h2 className="text text_type_main-medium mb-6" id="buns">
            Булки
          </h2>
          <ul className={`${styles.cards}`}>
            {buns.map((bun: IElement) => (
              <li key={bun._id}>
                <CardIngredients
                  image={bun.image}
                  name={bun.name}
                  price={bun.price}
                  id={bun._id}
                />
              </li>
            ))}
          </ul>
        </div>
        <div ref={sauceRef}>
          <h2 className="text text_type_main-medium mb-6" id="sauces">
            Соусы
          </h2>
          <ul className={styles.cards}>
            {sauces.map((sauce: IElement) => (
              <li key={sauce._id}>
                <CardIngredients
                  image={sauce.image}
                  name={sauce.name}
                  price={sauce.price}
                  id={sauce._id}
                />
              </li>
            ))}
          </ul>
        </div>

        <div ref={mainRef}>
          <h2 className="text text_type_main-medium mb-6" id="mains">
            Начинки
          </h2>
          <ul className={styles.cards}>
            {mains.map((main: IElement) => (
              <li key={main._id}>
                <CardIngredients
                  image={main.image}
                  name={main.name}
                  price={main.price}
                  id={main._id}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
