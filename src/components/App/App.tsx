import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { rolls, fillings, sauces } from "../../utils/data";
import React from "react";

function App() {
  const url = 'https://norma.nomoreparties.space/api'
  const [dataIngrigients, setDataIngrigients] = React.useState(null)
  const [error,setError] = React.useState(false)
  React.useEffect(()=>{
    fetch(`${url}/ingredients`)
    .then((res)=>{
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((res)=>{
      const ApiData = res.data;
      setDataIngrigients(ApiData)
    }
    )
    .catch((err)=>{
      setError(true);
    })
  },[])
  return (
    <>
      <AppHeader />
      <main className={styles.app}>
        <BurgerIngredients rolls={rolls} fillings={fillings} sauces={sauces} />
        <BurgerConstructor rolls={rolls} fillings={fillings} sauces={sauces} />
      </main>
    </>
  );
};

export default App;
