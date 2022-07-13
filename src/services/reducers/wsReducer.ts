import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  GET_ORDER_ID,
  CLOSED_ORDER_ID
} from '../actions/wsActionTypes';
import { IElement } from '../../utils/types';
import { TWsActions,IData } from '../actions/wsActionTypes';


type TInitialState = {
  wsConnected: boolean;
  error: undefined | string,
  wsConnectedAuth: boolean;
  orders: Array<IElement>,
  total: number;
  totalToday: number;
  orderId: IData
};

const initialState:TInitialState = {
  wsConnected: false,
  error: undefined,
  wsConnectedAuth: false,
  orders: [],
  total: 0,
  totalToday: 0,
  orderId: {  
    createdAt: '',
    ingredients: [],
    name: '',
    number: 0,
    owner: '',
    status: '',
    updatedAt: '',
    __v: 0,
    _id: ''
  }
};

export const wsReducer = (state = initialState, action:TWsActions):TInitialState => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnectedAuth: true,
      };

    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnectedAuth: false
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        orderId: {  
          createdAt: '',
          ingredients: [],
          name: '',
          number: 0,
          owner: '',
          status: '',
          updatedAt: '',
          __v: 0,
          _id: ''
        }
      };

    case GET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload
      };

    case CLOSED_ORDER_ID:
      return {
        ...state,
        orderId: {  
          createdAt: '',
          ingredients: [],
          name: '',
          number: 0,
          owner: '',
          status: '',
          updatedAt: '',
          __v: 0,
          _id: ''
        }
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    default:
      return state;
  }
}
