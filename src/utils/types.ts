
  export type IElement = {
    _id: number;
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
  
  export type TMeal = 'bun' | 'sauce' | 'main';

  export interface IParams {
    id: string;
  }
  