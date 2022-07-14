import { MouseEventHandler } from "react";
import { Location } from "history";

export type IElement = {
  _id: string;
  name: string;
  type: TMeal;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uid: string;
};

export interface IProtectedRoute {
  anonymous?: boolean;
}

export interface IHandleIngredientDrop {
  id: string;
}

export interface IData {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  __v?: number;
  _id: string;
}

export interface ILocationState extends Location {
  from: {
    pathname: string;
    state: object;
    search: string;
    hash: string;
    key: string;
  };
  background?: Location;
}

export interface IOrderCard {
  data: IData;
  path: string;
}

export type TInitialState = {
  wsConnected: boolean;
  error: undefined | string;
  wsConnectedAuth: boolean;
  orders: Array<IData>;
  total: number;
  totalToday: number;
  orderId: IData;
};

export type TMeal = "bun" | "sauce" | "main";

export interface IParams {
  id: string;
}

export interface ICardIngredients {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface IIngredientIcon {
  img?: string;
  extra?: number;
  count?: number;
}

export interface ICardDetails {
  notModal?: boolean;
}

export interface ICardDetailsItem {
  data: IElement;
  count: number;
}

export interface IDraggableItem {
  id: string;
  uid: string;
  name: string;
  price: number;
  image: string;
  findDraggableElement: any;
  moveDraggableElement: any;
}

export interface IModal {
  title?: string;
}

export interface IModalOverlay {
  closeModal: MouseEventHandler<HTMLDivElement> | undefined;
}

export interface IOrderDetails {
  orderNumber: number | null;
}

export interface IProfileNav {
  paragraph: string;
}
