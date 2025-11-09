import { ICartItem } from "./icart";
import { IUserInfo } from "./iuser";

export interface IOrder {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: IUserInfo;
  cartItems: ICartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
  shippingAddress?: {
    city: string;
    details: string;
    phone: string;
  }
}
