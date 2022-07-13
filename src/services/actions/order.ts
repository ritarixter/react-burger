import { dataOrder } from "../../utils/API";
import { resetConstructor } from "./constructor";
import { IResetConstructor } from "./constructor";
export const SET_ORDER_NUMBER:"SET_ORDER_NUMBER" = "SET_ORDER_NUMBER";
export const SET_ORDER_NUMBER_FAILED:"SET_ORDER_NUMBER_FAILED" = "SET_ORDER_NUMBER_FAILED";
export const SET_OPEN:"SET_OPEN" = "SET_OPEN";
export const SET_CLOSE:"SET_CLOSE" = "SET_CLOSE";


interface ISetOrderNumber {
  readonly type: typeof SET_ORDER_NUMBER;
  readonly payload: number
}

interface ISetOrderNumberFailed {
  readonly type: typeof SET_ORDER_NUMBER_FAILED;
}

interface ISetOrderOpen {
  readonly type: typeof SET_OPEN;
}

interface ISetOrderClose {
  readonly type: typeof SET_CLOSE;
}

export type TOrderActions = 
|ISetOrderNumber
|ISetOrderNumberFailed
|ISetOrderOpen
|ISetOrderClose;


function setOrderNumber(payload:number):ISetOrderNumber {
  console.log(payload)
  return { type: SET_ORDER_NUMBER, payload };
}

function setOrderNumberFailed():ISetOrderNumberFailed {
  return { type: SET_ORDER_NUMBER_FAILED };
}

export function setOrderOpen():ISetOrderOpen {
  return { type: SET_OPEN };
}

export function setOrderClose():ISetOrderClose {
  return { type: SET_CLOSE };
}

export function getOrderData(data:{ _id: string; }[]) {
  console.log(data)
  return function (dispatch: (arg0: ISetOrderNumber | ISetOrderNumberFailed | IResetConstructor) => void) {
    dataOrder(data)
      .then((res) => {
        dispatch(setOrderNumber(res.order.number));
        dispatch(resetConstructor())
      })
      .catch(() => {
        dispatch(setOrderNumberFailed());
      });
  };
}
