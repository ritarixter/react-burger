export const ADD_BUN_ELEMENT = "ADD_BUN_ELEMENT";
export const ADD_NON_BUN_ELEMENT = "ADD_NON_BUN_ELEMENT";
export const DELETE_ELEMENT = "DELETE_ELEMENT";
export const UPDATE_ELEMENTS_ORDER = "UPDATE_ELEMENTS_ORDER";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export function addBunElement(element) {
  return { type: ADD_BUN_ELEMENT, payload: element };
}

export function addNonBunElement(element) {
  return { type: ADD_NON_BUN_ELEMENT, payload: element };
}

export function deleteElement(elementUid) {
  return { type: DELETE_ELEMENT, uid: elementUid };
}

export function udpadeElementsOrder({ draggableElement, newIndex }) {
  return {
    type: UPDATE_ELEMENTS_ORDER,
    draggableElement,
    newIndex,
  };
}
