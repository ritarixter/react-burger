import { getData } from "../../utils/API";
import { IElement } from "../../utils/types";
import { AppThunk } from "../store";
import { AppDispatch } from "../store";
export const GET_INGREDIENTS: "GET_INGREDIENTS" = "GET_INGREDIENTS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

interface IGetIngredient {
  readonly type: typeof GET_INGREDIENTS;
  readonly ingredients: Array<IElement>;
}

interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions = IGetIngredient | IGetIngredientsFailed;

function getIngredient(ingredients: Array<IElement>): IGetIngredient {
  return { type: GET_INGREDIENTS, ingredients };
}

function getIngredientsFailed(): IGetIngredientsFailed {
  return { type: GET_INGREDIENTS_FAILED };
}

export const getIngredientsData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    getData()
      .then((res) => {
        const ApiData = res.data;
        dispatch(getIngredient(ApiData));
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
        console.log(`Ошибка при загрузке ингредиентов: ${err}`);
      });
  };
};
