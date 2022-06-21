
export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
      let socket = null;

  return next => action => {
    const { dispatch, getState } = store;
    const { type, payload } = action;

    if (type === wsActions.wsInit) {
      socket = new WebSocket(`${wsUrl}${payload}`);
    }
    if (socket) {

      socket.onopen = event => {
        dispatch({ type: wsActions.onOpen, payload: event });
      };

      socket.onerror = event => {
        dispatch({ type: wsActions.onError, payload: event });
      };

      socket.onmessage = event => {
          const data = JSON.parse(event.data);
        dispatch({ type: wsActions.onMessage, payload: data });
      };

      socket.onclose = event => {
        dispatch({ type: wsActions.onClose, payload: event });
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
