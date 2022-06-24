import styles from "./CardDetails.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import { CardDetailsItem } from "../CardDetailsItem/CardDetailsItem";
import { useMemo } from "react";
import formatDate from "../../utils/formatDate";
import { useDispatch } from "react-redux";
import {
  WS_CONNECTION_START,
  CLOSED_ORDER_ID
} from "../../services/actions/wsActionTypes";
import { useEffect } from "react";
import { getOrderIdData } from "../../services/actions/wsActionTypes";

export function CardDetails(props) {
  const {
    wsConnected,
    wsConnectedAuth,
    orderId,
  } = useSelector((store) => store.wsReducer);
  const param = useParams();
  const dispatch = useDispatch();
  const id = param.id;

  const ingredients = useSelector(
    (state) => state.ingredientsReducer.ingredients
  );
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "/all" });
    return () => {
      dispatch({ type: CLOSED_ORDER_ID });
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderIdData(id));
  }, []);

  const ingredientsOrder = [];

  if (orderId.ingredients) {
    for (let i = 0; i < orderId.ingredients.length; i++) {
      const element = ingredients.find(
        (item) => item._id === orderId.ingredients[i]
      );
      if (element) {
        ingredientsOrder.push(element);
      }
    }
  }

  const getCount = (id) => {
    let count = 0;
    ingredientsOrder.forEach((ingredient) => {
      if (ingredient._id === id) count += 1;
    });
    return count;
  };

  const makeUniq = (arr) => [...new Set(arr)];
  const uniqIngredientsOrder = makeUniq(ingredientsOrder)

  const totaPrice = uniqIngredientsOrder.reduce((acc, ingredient) =>
    acc + ingredient.price * (ingredient.type === 'bun' ? 2 : getCount(ingredient._id)), 0
  )

  let status = "";
  switch (orderId.status) {
    case "created":
      status = "Создан";
      break;
    case "pending":
      status = "Готовится";
      break;
    case "done":
      status = "Выполнен";
      break;
  }

  if (!orderId) {
    return null;
  }

  return (wsConnectedAuth || wsConnected) && (
    <section className={styles.main}>
      <div className={styles.card}>
        {props.notModal && (
          <p className={`${styles.count} text text_type_digits-default`}>
            {orderId.number}
          </p>
        )}
        <h2 className="text text_type_main-medium mt-10 mb-3">
          {orderId.name}
        </h2>
        <p
          className={`text text_type_main-default mb-15 ${status === "Выполнен" && styles.success
            }`}
        >
          {status}
        </p>
        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
        <div className={styles.scrollbar}>
          <ul className={styles.list}>
            {uniqIngredientsOrder.map((indredient, index) => (
              <CardDetailsItem data={indredient} count={indredient.type === 'bun' ? 2 : getCount(indredient._id)} />
            ))}
          </ul>
        </div>

        <div className={styles.footer}>
          <p className="text text_type_main-default text_color_inactive">
            {formatDate(orderId.createdAt)} i-GMT+3
          </p>
          <p className={`${styles.price} text text_type_digits-default`}>
            <span className="mr-2">{totaPrice}</span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </section>
  );
}
