import styles from "./FeedPage.module.css";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { WS_CONNECTION_START,WS_CONNECTION_CLOSED } from "../../services/actions/wsActionTypes";
import { useState } from "react";

export function FeedPage() {
const dispatch = useDispatch()
const { wsConnected, orders, error, total, totalToday } = useSelector(store => store.wsReducer);

const [pending, setPending] = useState(null);
const [done, setDone] = useState(null);


useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' });

    return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
    }
}, [dispatch]);

useEffect(() => {
    setDone(orders.filter(el => el.status === 'done'));
    setPending(orders.filter(el => el.status === 'pending'));
}, [orders]);

console.log(done)
console.log(pending)
  return (
    <section className={styles.feed}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.section}>
        <div className={styles.scrollbar}>
          <ul className={styles.list}>
          <OrderCard id={1} path='feed/'/>
            <OrderCard id={2} path='feed/'/>
            <OrderCard id={3} path='feed/'/>
            <OrderCard id={4} path='feed/'/>
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
