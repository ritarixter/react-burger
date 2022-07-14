import {
  ADD_BUN_ELEMENT,
  ADD_NON_BUN_ELEMENT,
  DELETE_ELEMENT,
  UPDATE_ELEMENTS_ORDER,
  RESET_CONSTRUCTOR,
} from "../actions/constructor";
import update from "immutability-helper";
import { TConstructorActions } from "../actions/constructor";
import { IElement } from "../../utils/types";

type TConstructorInitialState = {
  bunElement: IElement;
  draggableElements: Array<IElement>;
};

const constructorInitialState: TConstructorInitialState = {
  bunElement: {
    _id: "",
    name: "",
    type: "main",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
    uid: "",
  },
  draggableElements: [],
};

export function constructorReducer(
  state = constructorInitialState,
  action: TConstructorActions
): TConstructorInitialState {
  switch (action.type) {
    case ADD_BUN_ELEMENT: {
      return { ...state, bunElement: action.payload };
    }
    case ADD_NON_BUN_ELEMENT: {
      return {
        ...state,
        draggableElements: state.draggableElements.concat(action.payload),
      };
    }

    case DELETE_ELEMENT: {
      return {
        ...state,
        draggableElements: state.draggableElements.filter(
          (item: { uid: string }) => item.uid !== action.uid
        ),
      };
    }

    case RESET_CONSTRUCTOR: {
      return {
        bunElement: {
          _id: "0",
          name: "",
          type: "main",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
          image_mobile: "",
          image_large: "",
          __v: 0,
          uid: "",
        },
        draggableElements: [],
      };
    }

    case UPDATE_ELEMENTS_ORDER: {
      const oldIndex = state.draggableElements.indexOf(action.draggableElement);
      return {
        ...state,
        draggableElements: update(state.draggableElements, {
          $splice: [
            [oldIndex, 1],
            [action.newIndex, 0, action.draggableElement],
          ],
        }),
      };
    }
    default: {
      return state;
    }
  }
}
