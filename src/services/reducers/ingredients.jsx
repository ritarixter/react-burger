import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED,RESET_INGREDIENT_TO_VIEW,SET_INGREDIENT_TO_VIEW} from "../actions/indredients"

const ingredientsInitialState = {
  ingredients: [],
  ingredientsFailed: false,
  ingredientToView: null,
  ingredientModalOpen: false
}

export function ingredientsReducer(state = ingredientsInitialState, action) {
  switch(action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsFailed: false,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
      }
    }
    case RESET_INGREDIENT_TO_VIEW: {
      return { ...state, ingredientToView: null ,ingredientModalOpen: false};
    }

    case SET_INGREDIENT_TO_VIEW:{
      return { ...state, ingredientToView: action.ingredients,ingredientModalOpen: true};
    }
    default: {
      return state
    }
  }
}