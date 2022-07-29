import { ProfileNav } from "../../components/ProfileNav/ProfileNav";
import styles from "./ProfileOrderPage.module.css";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import { useDispatch, useSelector } from "../../utils/hooks";
import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsActionTypes";
import { getCookie } from "../../utils/getCookie";
import { FC, useEffect } from "react";
import Preloader from "../../components/Preloader/Preloader";

export const ProfileOrderPage: FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({
      type: WS_AUTH_CONNECTION_START,
      payload: `?token=${getCookie("accessToken").slice(7)}`,
    });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const { wsConnectedAuth, orders } = useSelector((store) => store.wsReducer);

  return wsConnectedAuth ? (
    <section className={styles.main}>
      <div className={styles.profile}>
        <div className="pt-30">
          <ProfileNav
            paragraph={
              "В этом разделе вы можете просмотреть свою историю заказов"
            }
          />
        </div>
        {orders.length > 0 ? (
          <div className={styles.scrollbar}>
            <ul className={styles.list}>
              {orders.map((data) => (
                <li key={data._id} className={styles.card}>
                  <OrderCard path="orders/" data={data} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text text text_type_main-medium text_color_inactive pt-30 mt-5">
            Вы пока не сделали ни одного заказа
          </p>
        )}
      </div>
    </section>
  ) : (
    <Preloader />
  );
};
