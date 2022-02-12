import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { rolls, fillings, sauces } from "../../utils/data";
import React from "react";
import Modal from "../Modal/Modal"
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import IngredientDetails from "../IngredientDetails/IngredientDetails"

function App() {
  const url = 'https://norma.nomoreparties.space/api'
  const [dataIngrigients, setDataIngrigients] = React.useState([])
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

  const buns = React.useMemo(
    () => dataIngrigients.filter((ingredient: { type: string; }) => ingredient.type === 'bun'),
    [dataIngrigients]
  );
  const sauces = React.useMemo(
    () => dataIngrigients.filter((ingredient: { type: string; }) => ingredient.type === 'sauce'),
    [dataIngrigients]
  );
  const mains = React.useMemo(
    () => dataIngrigients.filter((ingredient: { type: string; }) => ingredient.type === 'main'),
    [dataIngrigients]
  );

  return (
    <>
      <AppHeader />
      <main className={styles.app}>
        <BurgerIngredients rolls={buns} fillings={mains} sauces={sauces} />
        <BurgerConstructor buns={buns} mains={mains} sauces={sauces} />
      </main>
      <ModalOverlay></ModalOverlay>
      <Modal title='Делали заказа'><IngredientDetails></IngredientDetails></Modal>
      
      
      
    </>
  );
};

export default App;
