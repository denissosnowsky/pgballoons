import { makeVar } from "@apollo/client";

export interface OrderType {
  name: string;
  price: number;
  quantity: number;
  code: number;
  description: string;
  image: string;
  id: string;
}

export type BasketVarType = Array<OrderType>;

export const basketVar = makeVar<BasketVarType>([]);

export const errorAlertVar = makeVar<string>('');

export const successAlertVar = makeVar<string>('');