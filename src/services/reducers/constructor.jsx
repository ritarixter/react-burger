import { ADD_BUN_ELEMENT,ADD_NON_BUN_ELEMENT,DELETE_ELEMENT,UPDATE_ELEMENTS_ORDER } from "../actions/constructor";
import update from 'immutability-helper';

const constructorInitialState = {
  bunElement: {},
  draggableElements: [],
}

export function constructorReducer(state = constructorInitialState, action) {
  switch(action.type) {
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
          (item) => item.uid !== action.uid
        ),
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
      return state
    }
  }
}