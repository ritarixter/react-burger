import { dataOrder } from "../../utils/API";

export const SET_ORDER_NUMBER = "SET_ORDER_NUMBER";
export const SET_ORDER_NUMBER_FAILED = "SET_ORDER_NUMBER_FAILED";
export const SET_OPEN = "SET_OPEN";
export const SET_CLOSE = "SET_CLOSE";

function setOrderNumber(payload) {
  return { type: SET_ORDER_NUMBER, payload };
}

function setOrderNumberFailed() {
  return { type: SET_ORDER_NUMBER_FAILED };
}

export function setOrderOpen() {
  return { type: SET_OPEN };
}

export function setOrderClose() {
  return { type: SET_CLOSE };
}
export function getOrderData(data) {
  return function (dispatch) {
    dataOrder(data)
      .then((res) => {
        dispatch(setOrderNumber(res.order.number));
      })
      .catch(() => {
        dispatch(setOrderNumberFailed());
      });
  };
}
