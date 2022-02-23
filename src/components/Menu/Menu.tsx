import React from "react";
import styles from "./Menu.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function Menu() {
  const [current, setCurrent] = React.useState("Булки");
  return (
    <div style={{ display: "flex" }} className="mb-10">
      <a href="#buns" className={styles.link}>
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
      </a>
      <a href="#sauces" className={styles.link}>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
      </a>
      <a href="#mains" className={styles.link}>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </a>
    </div>
  );
}

export default Menu;
