import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import * as reactRouterDom from "react-router-dom";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useLocation } from "react-router-dom";
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
import { ProfileOrderPage } from "../../pages/ProfileOrderPage/ProfileOrderPage";
import { CardDetails } from "../CardDetails/CardDetails";
import { useDispatch, useSelector } from "../../utils/hooks";
import { Location } from 'history';


function App() {
  const error = useSelector(
    (state) => state.ingredientsReducer.ingredientsFailed 
  );

  useEffect(() => {
    dispatch(getIngredientsData());
    if (getCookie("accessToken")) {
      dispatch(getDataUserProfile());
    } else {
      dispatch(authorizationChecked());
    }
  }, []);

 interface ILocationState extends Location {
    from: {
      pathname: string;
      state: object;
      search: string;
      hash: string;
      key: string;
    };
    background?: Location;
  }
  const dispatch = useDispatch();
  const location = useLocation<ILocationState>()

  const background = location.state && location.state?.background;

  return (
    <>
      {error ? (
        <Preloader />
      ) : (
        <>
          <AppHeader />
          <reactRouterDom.Switch location={background || location}>
            <reactRouterDom.Route path="/ingredients/:id">
              <div className="mt-30">
                <IngredientDetails />
              </div>
            </reactRouterDom.Route>

            <reactRouterDom.Route path="/profile/orders/:id" exact={true}>
              <ProtectedRoute anonymous={true}>
                <CardDetails notModal={true} />
              </ProtectedRoute>
            </reactRouterDom.Route>

            <reactRouterDom.Route path="/feed/:id" exact={true}>
              <CardDetails notModal={true} />
            </reactRouterDom.Route>

            <reactRouterDom.Route path="/" exact={true}>
              <main className={styles.app}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </main>
            </reactRouterDom.Route>

            <reactRouterDom.Route path="/feed" exact={true}>
              <FeedPage />
            </reactRouterDom.Route>

            <reactRouterDom.Route path="/login" exact={true}>
              <LoginPage />
            </reactRouterDom.Route>

            <reactRouterDom.Route path="/profile/orders" exact={true}>
              <ProtectedRoute anonymous={true}>
                <ProfileOrderPage />
              </ProtectedRoute>
            </reactRouterDom.Route>

            <reactRouterDom.Route path="/profile" exact={true}>
              <ProtectedRoute anonymous={true}>
                <ProfilePage />
              </ProtectedRoute>
            </reactRouterDom.Route>

            <reactRouterDom.Route path="/register" exact={true}>
              <ProtectedRoute>
                <RegisterPage />
              </ProtectedRoute>
            </reactRouterDom.Route>

            <reactRouterDom.Route path="/forgot-password" exact={true}>
              <ProtectedRoute>
                <ForgotPassPage />
              </ProtectedRoute>
            </reactRouterDom.Route>

            <reactRouterDom.Route path="/reset-password" exact={true}>
              <ProtectedRoute>
                <ResetPassPage />
              </ProtectedRoute>
            </reactRouterDom.Route>

            <reactRouterDom.Route>
              <NotFound404 />
            </reactRouterDom.Route>
          </reactRouterDom.Switch>

          {background && (
            <reactRouterDom.Switch>
              <reactRouterDom.Route path="/ingredients/:id">
                <Modal
                  title="Детали заказа"
                >
                  <IngredientDetails />
                </Modal>
              </reactRouterDom.Route>
            </reactRouterDom.Switch>
          )}

          {background && (
            <reactRouterDom.Switch>
              <reactRouterDom.Route path="/profile/orders/:id" exact={true}>
              <ProtectedRoute anonymous={true}>
                <Modal
                >
                  <CardDetails />    
                </Modal>
                </ProtectedRoute>
              </reactRouterDom.Route>
            </reactRouterDom.Switch>
          )}

          {background && (
            <reactRouterDom.Switch>
              <reactRouterDom.Route path="/feed/:id" exact={true}>
                <Modal
                >
                  <CardDetails />
                </Modal>
              </reactRouterDom.Route>
            </reactRouterDom.Switch>
          )}
        </>
      )}
    </>
  );
}

export default App;
