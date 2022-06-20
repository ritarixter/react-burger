import styles from "./FeedPage.module.css";
import { OrderCard } from "../../components/OrderCard/OrderCard";

export function FeedPage() {
  return (
    <section className={styles.feed}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.section}>
        <div className={styles.scrollbar}>
          <ul className={styles.list}>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </ul>
        </div>
        <div className={styles.feed__info}>
          <div className={styles.orders__status}>
            <ul className={styles.ordes__list}>
              <h2 className="text text_type_main-medium mb-6">Готовы</h2>
              <li
                className={`"text text_type_digits-default mb-2  ${styles.success}`}
              >
                00000000
              </li>
              <li
                className={`"text text_type_digits-default mb-2  ${styles.success}`}
              >
                00000000
              </li>
              <li
                className={`"text text_type_digits-default mb-2  ${styles.success}`}
              >
                00000000
              </li>
            </ul>

            <ul className={styles.ordes__list}>
              <h2 className="text text_type_main-medium mb-6">В Работе</h2>
              <li className="text text_type_digits-default mb-2">00000000</li>
              <li className="text text_type_digits-default mb-2">00000000</li>
              <li className="text text_type_digits-default mb-2">00000000</li>
            </ul>

          </div>
          <h2 className="text text_type_main-medium mt-15">Выполнено за все время:</h2>
          <p className={`${styles.orderNumber} text text_type_digits-large`}>
          13020</p>
          <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
          <p className={`${styles.orderNumber} text text_type_digits-large`}>
          158</p>
        </div>
      </div>
    </section>
  );
}
