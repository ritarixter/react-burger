import styles from "./CardDetails.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CardDetailsItem } from "../CardDetailsItem/CardDetailsItem";

export function CardDetails(props) {

  /*  <p className={`${styles.number} text text_type_digits-default`}>
          #030030
        </p>*/ 
  return (
    <section className={styles.main}>
      <div className={styles.card}>
        {props.notModal &&
        <p className={`${styles.number} text text_type_digits-default`}>
        #030030
      </p>
        }
        <h2 className="text text_type_main-medium mt-10 mb-3">
          Death Star Starship Main бургер
        </h2>
        <p className="text text_type_main-default mb-15">Выполнен</p>
        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
        <div className={styles.scrollbar}>
          <ul className={styles.list}>
            <CardDetailsItem/>
            <CardDetailsItem/>
            <CardDetailsItem/>
            <CardDetailsItem/>
            <CardDetailsItem/>
          </ul>
        </div>

        <div className={styles.footer}>
          <p className={`${styles.price} text text_type_digits-default`}>
            <span className="mr-2">510</span>
            <CurrencyIcon type="primary" />
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20 i-GMT+3
          </p>
        </div>
      </div>
    </section>
  );
}
