import { Maybe } from "graphql/jsutils/Maybe";

export type ArrayConvertorResultType =
  | Array<{ leftText: string; rightText: string; id: string; fixed: boolean }>
  | [];

export type FetchedObjectType = {
  id: string;
  name: string;
  price: string;
  fixed: boolean;
};

export type ArrayConvertorArgType = Maybe<Maybe<FetchedObjectType>[]>;
