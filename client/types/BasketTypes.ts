import { Maybe } from "graphql/jsutils/Maybe";

export type BasketStatusType = Maybe<{
  isInBasket?: Maybe<boolean> | undefined;
  basketQuantity?: Maybe<number> | undefined;
}>

export type BasketObjType = {
  leftText: string;
  rightText: string;
  id: string;
  image: string;
  description: string;
  quantity: number;
};

export type FormType = {
  name: string;
  phone: string;
  email: string;
  address: string;
  code: number;
  date: string;
  time: string;
}