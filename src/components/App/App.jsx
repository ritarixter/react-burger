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
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { ForgotPassPage } from "../../pages/ForgotPassPage/ForgotPassPage";
import { ResetPassPage } from "../../pages/ResetPassPage/ResetPassPage";
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

          <Route path="/register">
          <AppHeader />
          <RegisterPage/>
        </Route>

        <Route path="/forgot-password">
          <AppHeader />
          <ForgotPassPage/>
        </Route>

          <Route path="/reset-password">
          <AppHeader />
          <ResetPassPage/>
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
