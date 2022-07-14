import {
  SET_ORDER_NUMBER,
  SET_ORDER_NUMBER_FAILED,
  SET_OPEN,
  SET_CLOSE,
} from "../actions/order";
import { TOrderActions } from "../actions/order";

type TOrderInitialState = {
  orderNumber: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
  orderOpen: boolean;
  orderClearIngredient: boolean;
};

const orderInitialState: TOrderInitialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderOpen: false,
  orderClearIngredient: false,
};

export const orderReducer = (
  state = orderInitialState,
  action: TOrderActions
): TOrderInitialState => {
  switch (action.type) {
    case SET_ORDER_NUMBER: {
      return { ...state, orderNumber: action.payload, orderRequest: true };
    }
    case SET_ORDER_NUMBER_FAILED: {
      return { ...state, orderRequest: false, orderFailed: true };
    }

    case SET_OPEN: {
      return { ...state, orderOpen: true };
    }

    case SET_CLOSE: {
      return {
        ...state,
        orderOpen: false,
        orderNumber: null,
        orderClearIngredient: true,
      };
    }

    default: {
      return state;
    }
  }
};
