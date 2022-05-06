import { getData } from "../../utils/API";
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'
export const RESET_INGREDIENT_TO_VIEW = 'RESET_INGREDIENT_TO_VIEW';
export const SET_INGREDIENT_TO_VIEW = 'SET_INGREDIENT_TO_VIEW';

function getIngredient(ingredients) {
  return { type: GET_INGREDIENTS, ingredients };
}

function getIngredientsFailed() {
  return { type: GET_INGREDIENTS_FAILED };
}

export function resetIngredientToView() {
  return {type: RESET_INGREDIENT_TO_VIEW}
}

export function setIngredientToView(ingredients) {
  return {type: SET_INGREDIENT_TO_VIEW, ingredients}
}

export function getIngredientsData() {
      return function (dispatch) {
        getData()
        .then((res) => {
          const ApiData = res.data;
          console.log(ApiData)
          //setDataIngrigients(ApiData);
          dispatch(getIngredient(ApiData))
          //setError(false);
        })
        .catch((err) => {
          //setError(true);
          dispatch(getIngredientsFailed())
          console.log(`Ошибка при загрузке ингредиентов: ${err}`);
        });
      };
    }