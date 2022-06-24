import { getOrderId } from "../../utils/API";
export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const GET_ORDER_ID = 'GET_ORDER_ID';

export const WS_AUTH_CONNECTION_START = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_CLOSED = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_AUTH_CONNECTION_SUCCESS = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const CLOSED_ORDER_ID = 'CLOSED_ORDER_ID'


export function getOrderIdData(id) {
  return function (dispatch) {
    getOrderId(id)
      .then((res) => {
        const ApiData = res.orders[0];
        dispatch({
          type: GET_ORDER_ID,
          payload: ApiData,
        });
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке ингредиентов: ${err}`);
      });
  };
}
