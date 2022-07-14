import { AppDispatch, IWsActionsWithAuth, RootState } from '../store';
import { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddleware = (wsUrl:string, wsActions:IWsActionsWithAuth): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

  return next => action => {
    const { dispatch } = store;
    const { type, payload } = action;

    if (type === wsActions.wsInit) {
      socket = new WebSocket(`${wsUrl}${payload}`);
    }
    if (socket) {

      socket.onopen = event => {
        dispatch({ type: wsActions.onOpen, payload: event });
      };

      socket.onerror = () => {
        dispatch({type: wsActions.onError});
      };

      socket.onmessage = event => {
          const data = JSON.parse(event.data);
        dispatch({ type: wsActions.onMessage, payload: data });
      };

      socket.onclose = () => {
        dispatch({ type: wsActions.onClose});
      };

      if (type === wsActions.wsSendMessage) {
        const message = payload;
        socket.send(JSON.stringify(message));
      }

      if (type === wsActions.onClose) {
        socket.close();
      }
    }
    next(action);
  };
  };
};

