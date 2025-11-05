import { IProduct } from "./iproduct";

export interface ICart {
  _id: string;
  cartOwner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
  products: {
    count: number;
    price: number;
    product: IProduct;
    _id: string;
  }[]
}
