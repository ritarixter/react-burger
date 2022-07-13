import { IElement } from "../../utils/types";
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
} from "../actions/indredients";
import { TIngredientsActions } from "../actions/indredients"

type TIngredientsInitialState = {
  ingredients: Array<IElement> | any;//?
  ingredientsFailed: Boolean
} 

const ingredientsInitialState:TIngredientsInitialState = {
  ingredients: [],
  ingredientsFailed: false
};

export function ingredientsReducer(state = ingredientsInitialState, action:TIngredientsActions):TIngredientsInitialState {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
}
