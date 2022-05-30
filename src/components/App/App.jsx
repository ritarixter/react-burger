import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/actions/indredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LoginPage } from "../../pages/LoginPage/login";

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
        <Router>
          <Route path="/" exact={true}>
          <AppHeader />
          <main className={styles.app}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
          </main>
          </Route>
          <Route path="/login">
          <AppHeader />
            <LoginPage/>
          </Route>
          </Router>
        </>

      ) : (
        <p>Произошла ошибка.</p>
      )}
      <div id="modal"></div>
    </>
  );
}

export default App;
