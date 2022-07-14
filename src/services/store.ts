import {
  createStore,
  compose,
  applyMiddleware,
  ActionCreator,
  Action,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
} from "./actions/wsActionTypes";
import { TWsActions } from "./actions/wsActionTypes";
import { TProfileActions } from "./actions/profile";
import { TOrderActions } from "./actions/order";
import { TIngredientsActions } from "./actions/indredients";
import { TConstructorActions } from "./actions/constructor";

const wsUrl = "wss://norma.nomoreparties.space/orders";

export type TActions =
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TProfileActions
  | TWsActions;

export interface IWsActionsWithAuth {
  wsInit: typeof WS_CONNECTION_START | typeof WS_AUTH_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_AUTH_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR | typeof WS_AUTH_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
}

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const wsActionsAuth = {
  wsInit: WS_AUTH_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TActions>
>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, wsActions),
    socketMiddleware(wsUrl, wsActionsAuth)
  )
);

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
