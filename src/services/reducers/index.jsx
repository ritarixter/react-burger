import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { ingredientsReducer } from './ingredients'
import { constructorReducer } from './constructor';
import { profileReducer } from './profile';

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  orderReducer,
  profileReducer
});