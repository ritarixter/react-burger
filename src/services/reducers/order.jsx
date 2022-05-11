import { SET_ORDER_NUMBER,SET_ORDER_NUMBER_FAILED,SET_OPEN,SET_CLOSE } from "../actions/order"

const orderInitialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderOpen:false,
  orderClearIngredient:false
};

export const orderReducer = (state = orderInitialState,action) => {
  switch(action.type){
    case SET_ORDER_NUMBER:{
      return {...state, orderNumber:action.payload, orderRequest: true}
    }
    case SET_ORDER_NUMBER_FAILED: {
      return {...state,orderRequest: false,orderFailed: true}
    }

    case SET_OPEN: {
      return {...state, orderOpen:true}
    }

    case SET_CLOSE: {
      return {...state, orderOpen:false,orderNumber: null,orderClearIngredient:true}
    }

    default: {
       return state
    }
  }
}