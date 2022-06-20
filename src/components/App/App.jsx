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
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { FeedPage } from "../../pages/FeedPage/FeedPage";
import { getCookie } from "../../utils/getCookie";
import { authorizationChecked } from "../../services/actions/profile";
import Preloader from "../Preloader/Preloader";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  function closeModal() {
    history.goBack();
  }

  function closeModalEsc(evt) {
    if (evt.key === "Escape") {
      history.goBack();
    }
  }

  const error = useSelector(
    (state) => state.ingredientsReducer.ingredientsFailed
  );

  useEffect(() => {
    dispatch(getIngredientsData());
    if (getCookie("accessToken")) {
      dispatch(getDataUserProfile());
    }
    else{
      dispatch(authorizationChecked())
    }
  }, [dispatch]);

  const background = location.state && location.state?.background;

  return (
    <>
      {error ? (
             <Preloader/>
      ) : (   
        <>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/ingredients/:id">
            <div className="mt-30">
              <IngredientDetails />
            </div>
          </Route>

          <Route path="/" exact={true}>
            <main className={styles.app}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          </Route>

          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>

          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>

          <Route path="/register" exact={true}>
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          </Route>

          <Route path="/forgot-password" exact={true}>
            <ProtectedRoute>
              <ForgotPassPage />
            </ProtectedRoute>
          </Route>

          <Route path="/reset-password" exact={true}>
            <ProtectedRoute>
              <ResetPassPage />
            </ProtectedRoute>
          </Route>

          <Route path="/profile" exact={true}>
            <ProtectedRoute anonymous={true}>
              <ProfilePage />
            </ProtectedRoute>
          </Route>

          <Route>
            <NotFound404 />
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
      )}
    </>
  );
}

export default App;
