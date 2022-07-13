import styles from "./FeedPage.module.css";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import { useDispatch,useSelector } from "../../utils/hooks";
import { useEffect } from "react";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsActionTypes";
import { useState } from "react";
import Preloader from "../../components/Preloader/Preloader";

export function FeedPage() {
  const dispatch = useDispatch();
  const { wsConnected, orders, total, totalToday } = useSelector(
    (store) => store.wsReducer
  );

  const [pending, setPending] = useState(null);
  const [done, setDone] = useState(null);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "/all" });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  useEffect(() => {
    setDone(orders.filter((el) => el.status === "done"));
    setPending(orders.filter((el) => el.status === "pending"));
  }, [orders]);

  return wsConnected ? (
    <section className={styles.feed}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.section}>
        <div className={styles.scrollbar}>
          <ul className={styles.list}>
            {orders.map((data) => (
              <li key={data._id} className={styles.card}>
                <OrderCard path="feed/" data={data} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.feed__info}>
          <div className={styles.orders__status}>
            <div>
              <h2 className="text text_type_main-medium mb-6">Готовы</h2>
              <ul className={styles.ordes__list}>
                {done &&
                  done.map((i) => (
                    <li
                      className={`"text text_type_digits-default mb-2  ${styles.success} ${styles.order__list_item}`}
                      id={i.number} key={i.number}
                    >
                      {i.number}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h2 className="text text_type_main-medium mb-6">В Работе</h2>
              <ul className={styles.ordes__list}>

                {pending && pending.map((i) => (
                  <li
                    className={`"text text_type_digits-default mb-2  ${styles.order__list_item}`}
                    id={i.number} key={i.number}
                  >
                    {i.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className="text text_type_main-medium mt-15">
            Выполнено за все время:
          </h2>
          <p className={`${styles.orderNumber} text text_type_digits-large`}>
            {total}
          </p>
          <h2 className="text text_type_main-medium mt-15">
            Выполнено за сегодня:
          </h2>
          <p className={`${styles.orderNumber} text text_type_digits-large`}>
            {totalToday}
          </p>
        </div>
      </div>
    </section>
  ) : (
    <Preloader />
  )
}
