import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import {rolls,fillings,sauces} from '../../utils/data'

function App() {
  return (
    <>
      <AppHeader/>
      <main className={styles.app}>
        <BurgerIngredients rolls={rolls} fillings={fillings} sauces={sauces}/>
        <BurgerConstructor rolls={rolls} fillings={fillings} sauces={sauces}/>
      </main>
    </>
  );
}



export default App;
