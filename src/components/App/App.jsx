import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/actions/indredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const error = useSelector(
    (state) => state.ingredientsReducer.ingredientsFailed
  );

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);
  return (
    <>
      {!error ? (
        <>
          <AppHeader />
          <main className={styles.app}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
          </main>
        </>
      ) : (
        <p>Произошла ошибка.</p>
      )}
      <div id="modal"></div>
    </>
  );
}

export default App;
