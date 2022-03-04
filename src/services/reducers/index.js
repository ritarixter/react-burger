import { combineReducers } from 'redux';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  order:orderReducer,
});