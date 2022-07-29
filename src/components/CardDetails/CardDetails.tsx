import styles from "./CardDetails.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import { CardDetailsItem } from "../CardDetailsItem/CardDetailsItem";
import { useRouteMatch } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import {
  WS_CONNECTION_START,
  WS_AUTH_CONNECTION_START,
  CLOSED_ORDER_ID,
} from "../../services/actions/wsActionTypes";
import { FC, useEffect } from "react";
import { getOrderIdData } from "../../services/actions/wsActionTypes";
import { getCookie } from "../../utils/getCookie";
import { IElement } from "../../utils/types";
import { IParams } from "../../utils/types";
import { ICardDetails } from "../../utils/types";

export const CardDetails: FC<ICardDetails> = (props) => {
  const { wsConnected, wsConnectedAuth, orderId } = useSelector(
    (store) => store.wsReducer
  );

  const param = useParams() as IParams;
  const dispatch = useDispatch();
  const id = param.id;

  const ingredients = useSelector(
    (state) => state.ingredientsReducer.ingredients
  );

  const match = useRouteMatch({
    path: "/profile/orders/:id",
  });

  useEffect(() => {
    if (match) {
      dispatch({
        type: WS_AUTH_CONNECTION_START,
        payload: `?token=${getCookie("accessToken").slice(7)}`,
      });
    } else {
      dispatch({ type: WS_CONNECTION_START, payload: "/all" });
    }

    return () => {
      dispatch({ type: CLOSED_ORDER_ID });
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderIdData(id));
  }, []);

  const ingredientsOrder: Array<IElement> = [];

  if (orderId.ingredients) {
    for (let i = 0; i < orderId.ingredients.length; i++) {
      const element: any = ingredients.find(
        (item: { _id: string }) => item._id === orderId.ingredients[i]
      );
      if (element) {
        ingredientsOrder.push(element);
      }
    }
  }

  const getCount = (id: number | string) => {
    let count = 0;
    ingredientsOrder.forEach((ingredient) => {
      if (ingredient._id === id) count += 1;
    });
    return count;
  };

  const makeUniq = (arr: any) => [...new Set(arr)];
  const uniqIngredientsOrder: any = makeUniq(ingredientsOrder);

  const totaPrice = uniqIngredientsOrder.reduce(
    (acc: number, ingredient: IElement) =>
      acc +
      ingredient.price *
        (ingredient.type === "bun" ? 2 : getCount(ingredient._id)),
    0
  );

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

  return wsConnectedAuth || wsConnected ? (
    <section className={styles.main}>
      <div className={styles.card}>
        {props.notModal && (
          <p className={`${styles.count} text text_type_digits-default`}>
            #{orderId.number}
          </p>
        )}
        <h2 className="text text_type_main-medium mt-10 mb-3">
          {orderId.name}
        </h2>
        <p
          className={`text text_type_main-default mb-15 ${
            status === "Выполнен" && styles.success
          }`}
        >
          {status}
        </p>
        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
        <div className={styles.scrollbar}>
          <ul className={styles.list}>
            {uniqIngredientsOrder.map((indredient: IElement) => {
              return (
                <li className={styles.list__item} key={indredient._id}>
                  <CardDetailsItem
                    data={indredient}
                    count={
                      indredient.type === "bun" ? 2 : getCount(indredient._id)
                    }
                  />
                </li>
              );
            })}
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
  ) : (
    <p>Произошла ошибка.</p>
  );
};
