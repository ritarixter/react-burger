import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
import { DataContext } from "../../context/dataContext";
import { getData } from "../../utils/API";
import { createStore } from "redux";
import { rootReducer } from "../../services/reducers";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

function App() {
  const [dataIngrigients, setDataIngrigients] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getData()
      .then((res) => {
        const ApiData = res.data;
        setDataIngrigients(ApiData);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);
  return (  
    <Provider store={store}>
    {!error ? 
      <>
      <AppHeader />
      <main className={styles.app}>
   
        <DataContext.Provider value={dataIngrigients}>
        <BurgerIngredients
          /*buns={buns}
          mains={mains}
          sauces={sauces}
          dataIngrigients={dataIngrigients}*/
        />
          <BurgerConstructor />
        </DataContext.Provider>
      </main>
      </>
      :
      <p>Произошла ошибка.</p>
      
      }
      <div id="modal"></div>

    </Provider>
  );
}

export default App;
