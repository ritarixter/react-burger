import { getOrderId } from "../../utils/API";
import { IData } from "../../utils/types";
import { AppThunk } from "../store";
import { AppDispatch } from "../store";
export const WS_CONNECTION_START:'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS:'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR:'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED:'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE:'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE:'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const GET_ORDER_ID:'GET_ORDER_ID' = 'GET_ORDER_ID';

export const WS_AUTH_CONNECTION_START:'WS_AUTH_CONNECTION_START' = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_CLOSED:'WS_AUTH_CONNECTION_CLOSED' = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_AUTH_CONNECTION_SUCCESS:'WS_AUTH_CONNECTION_SUCCESS' = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_ERROR:'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const CLOSED_ORDER_ID:'CLOSED_ORDER_ID' = 'CLOSED_ORDER_ID'


interface IPayload{
  total:number;
  totalToday:number;
  orders:Array<IData>
}

interface IGetDataProfile {
  type: typeof GET_ORDER_ID;
  payload: IData
}

interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS;
}

interface IWsConnectionStart{
  type: typeof WS_CONNECTION_START;
}


interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR;
}

interface IWsConnectionClosed {
  type: typeof WS_CONNECTION_CLOSED;
}

interface IWsGetMessage {
  type: typeof WS_GET_MESSAGE;
  payload: IPayload
}

interface IWsAuthConnectionSuccess {
  type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

interface IClosedOrderId{
  type: typeof CLOSED_ORDER_ID;
}

export type TWsActions = 
|IGetDataProfile
|IWsConnectionSuccess
|IWsConnectionError
|IWsConnectionClosed
|IWsGetMessage
|IWsAuthConnectionSuccess
|IClosedOrderId
|IWsConnectionStart

export function getDataProfile(data:IData):IGetDataProfile {
  return { type: GET_ORDER_ID,payload:data};
}

export const getOrderIdData:AppThunk = (id: string) => {
  return function (dispatch:AppDispatch) {
    getOrderId(id)
      .then((res) => {
        const ApiData = res.orders[0];
        dispatch(getDataProfile(ApiData));
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке ингредиентов: ${err}`);
      });
  };
}
