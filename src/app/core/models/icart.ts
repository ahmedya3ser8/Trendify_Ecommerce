import { IProduct } from "./iproduct";

export interface ICart {
  _id: string;
  cartOwner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
  products: ICartItem[]
}

export interface ICartItem {
  count: number;
  price: number;
  product: IProduct;
  _id: string;
}

export interface ICartResponse {
  cartId: string;
  message: string;
  status: string;
  numOfCartItems: number;
  data: ICart
}
