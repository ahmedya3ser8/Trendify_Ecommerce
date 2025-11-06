import { ICartItem } from "./icart";

export interface IOrder {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  cartItems: ICartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}
