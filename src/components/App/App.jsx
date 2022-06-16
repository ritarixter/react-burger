import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/actions/indredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LoginPage } from "../../pages/LoginPage/login";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { ForgotPassPage } from "../../pages/ForgotPassPage/ForgotPassPage";
import { ResetPassPage } from "../../pages/ResetPassPage/ResetPassPage";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
import { NotFound404 } from "../../pages/NotFound404/NotFound404";
import { useEffect } from "react";
import { getDataUserProfile } from "../../services/actions/profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { resetIngredientToView } from "../../services/actions/indredients";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  function closeModal() {
    dispatch(resetIngredientToView());
    history.goBack();
  }

  function closeModalEsc(evt) {
    if (evt.key === "Escape") {
      dispatch(resetIngredientToView());
      history.goBack();
    }
  }

  const error = useSelector(
    (state) => state.ingredientsReducer.ingredientsFailed
  );

  const ingredientModalOpen = useSelector(
    (state) => state.ingredientsReducer.ingredientModalOpen
  );

  useEffect(() => {
    document.title = "Stellar burgers";
    dispatch(getIngredientsData());
    if (localStorage.getItem("token")) {
      dispatch(getDataUserProfile());
    }/* else {
      logoutUser().then((res) => {
        localStorage.setItem("token", res.refreshToken);
        document.cookie = res.accessToken;
      });
    }*/
  }, [dispatch]);

console.log(location)
  const background = ingredientModalOpen && location.state?.background;

  return (
    <>
      {!error ? (
        <>
          <Switch location={background || location}>
            <Route path="/" exact={true}>
              <AppHeader />
              <main className={styles.app}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </main>
            </Route>

            <Route path="/login" exact={true}>
              <AppHeader />
              <LoginPage />
            </Route>

            <Route path="/register" exact={true}>
              <ProtectedRoute>
                <AppHeader />
                <RegisterPage />
              </ProtectedRoute>
            </Route>

            <Route path="/forgot-password" exact={true}>
              <ProtectedRoute>
                <AppHeader />
                <ForgotPassPage />
              </ProtectedRoute>
            </Route>

            <Route path="/reset-password" exact={true}>
              <ProtectedRoute>
                <AppHeader />
                <ResetPassPage />
              </ProtectedRoute>
            </Route>

            <Route path="/profile" exact={true}>
              <ProtectedRoute anonymous={true}>
                <AppHeader />
                <ProfilePage />
              </ProtectedRoute>
            </Route>

            <Route>
              <AppHeader />
              <NotFound404 />
            </Route>

            <Route path="/ingredients/:id">
              <AppHeader />
              <IngredientDetails />
            </Route>
          </Switch>
          
          {background && (
            <Switch>
              <Route path="/ingredients/:id">
                <Modal
                  title="Детали заказа"
                  closeModalEsc={closeModalEsc}
                  closeModal={closeModal}
                >
                  <IngredientDetails />
                </Modal>
              </Route>
            </Switch>
          )}

        </>
      ) : (
        <p>Произошла ошибка.</p>
      )}
      <div id="modal"></div>
    </>
  );
}

export default App;
