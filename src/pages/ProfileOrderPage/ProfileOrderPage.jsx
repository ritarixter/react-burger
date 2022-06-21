import { ProfileNav } from "../../components/ProfileNav/ProfileNav"
import React from "react";
import styles from './ProfileOrderPage.module.css'
import { OrderCard } from "../../components/OrderCard/OrderCard"
import { useDispatch } from "react-redux";
import { WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSED } from "../../services/actions/wsActionTypes";
import { getCookie } from "../../utils/getCookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export function ProfileOrderPage(){
  const dispatch = useDispatch();
  const { wsConnectedAuth, orders, error } = useSelector(store => store.wsReducer);

  useEffect(() => {
      dispatch({ type: WS_AUTH_CONNECTION_START, payload: `?token=${getCookie('accessToken').slice(7)}` });

      return () => {
          dispatch({ type: WS_AUTH_CONNECTION_CLOSED });
      }
  }, [dispatch]);

  console.log(wsConnectedAuth)
return (
  <section className={styles.main}>
  <div className={styles.profile}>
    <div className="pt-30">    <ProfileNav paragraph={'В этом разделе вы можете просмотреть свою историю заказов'} /></div>

    <div className={styles.scrollbar}>
          <ul className={styles.list}>
            
            <OrderCard id={1} path="orders/"/>
            <OrderCard id={2} path="orders/"/>
            <OrderCard id={3} path="orders/"/>
            <OrderCard id={4} path="orders/"/>
          </ul>
        </div>
  </div>
</section>
)
}