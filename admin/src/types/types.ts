import { Scalars } from "../store/generated/graphql";

export type ChangePriceFromOldToNew = {
    oldPrice: Scalars['Int'];
    newPrice: Scalars['Int'];
}