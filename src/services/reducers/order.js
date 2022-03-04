import { SET_ORDER_NUMBER } from "../actions/order"

const defaultState = {
  orderNumber: null
}

export const orderReducer = (state = defaultState,action) => {
  switch(action.type){
    case SET_ORDER_NUMBER:
      return {...state, orderNumber:action.payload}

    case 'sdsdasda':
    
    default:
       return state
  }
}