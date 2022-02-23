import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
import { DataContext } from "./dataContext";
import { getData } from "../../utils/API";

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

  const buns = React.useMemo(
    () =>
      dataIngrigients.filter(
        (ingredient: { type: string }) => ingredient.type === "bun"
      ),
    [dataIngrigients]
  );
  const sauces = React.useMemo(
    () =>
      dataIngrigients.filter(
        (ingredient: { type: string }) => ingredient.type === "sauce"
      ),
    [dataIngrigients]
  );
  const mains = React.useMemo(
    () =>
      dataIngrigients.filter(
        (ingredient: { type: string }) => ingredient.type === "main"
      ),
    [dataIngrigients]
  );

  return (  
    <>
    {!error ? 
      <>
      <AppHeader />
      <main className={styles.app}>
        <BurgerIngredients
          buns={buns}
          mains={mains}
          sauces={sauces}
          dataIngrigients={dataIngrigients}
        />
        <DataContext.Provider value={dataIngrigients}>
          <BurgerConstructor />
        </DataContext.Provider>
      </main>
      </>
      :
      <p>Произошла ошибка.</p>
      
      }
      <div id="modal"></div>

    </>
  );
}

export default App;
