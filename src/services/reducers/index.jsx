import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { ingredientsReducer } from './ingredients'
import { constructorReducer } from './constructor';

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  orderReducer
});