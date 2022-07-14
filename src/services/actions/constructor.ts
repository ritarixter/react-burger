import { IElement } from "../../utils/types";
export const ADD_BUN_ELEMENT: "ADD_BUN_ELEMENT" = "ADD_BUN_ELEMENT";
export const ADD_NON_BUN_ELEMENT: "ADD_NON_BUN_ELEMENT" = "ADD_NON_BUN_ELEMENT";
export const DELETE_ELEMENT: "DELETE_ELEMENT" = "DELETE_ELEMENT";
export const UPDATE_ELEMENTS_ORDER: "UPDATE_ELEMENTS_ORDER" =
  "UPDATE_ELEMENTS_ORDER";
export const RESET_CONSTRUCTOR: "RESET_CONSTRUCTOR" = "RESET_CONSTRUCTOR";

interface IElementWithIndex {
  draggableElement: IElement | any;
  newIndex: number;
}

interface IAddBunElement {
  readonly type: typeof ADD_BUN_ELEMENT;
  readonly payload: IElement;
}

interface IAddNonBunElement {
  readonly type: typeof ADD_NON_BUN_ELEMENT;
  readonly payload: IElement;
}

interface IDeleteElement {
  readonly type: typeof DELETE_ELEMENT;
  readonly uid: string;
}

export interface IResetConstructor {
  readonly type: typeof RESET_CONSTRUCTOR;
}

interface IUdpadeElementsOrder {
  readonly type: typeof UPDATE_ELEMENTS_ORDER;
  draggableElement: IElement | any;
  newIndex: number;
}

export type TConstructorActions =
  | IAddBunElement
  | IAddNonBunElement
  | IDeleteElement
  | IResetConstructor
  | IUdpadeElementsOrder;

export function addBunElement(element: IElement): IAddBunElement {
  return { type: ADD_BUN_ELEMENT, payload: element };
}

export function resetConstructor(): IResetConstructor {
  return { type: RESET_CONSTRUCTOR };
}

export function addNonBunElement(element: IElement): IAddNonBunElement {
  return { type: ADD_NON_BUN_ELEMENT, payload: element };
}

export function deleteElement(elementUid: string): IDeleteElement {
  return { type: DELETE_ELEMENT, uid: elementUid };
}

export function udpadeElementsOrder({
  draggableElement,
  newIndex,
}: IElementWithIndex): IUdpadeElementsOrder {
  return {
    type: UPDATE_ELEMENTS_ORDER,
    draggableElement,
    newIndex,
  };
}
