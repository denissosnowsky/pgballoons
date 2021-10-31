import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { graphqlUrl } from "../config";
import { createUploadLink } from "apollo-upload-client";
import { basketVar } from "./variables";
import { ReadFieldFunction } from "@apollo/client/cache/core/types/common";

const isServer = typeof window === "undefined";
//@ts-ignore
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

let CLIENT: ApolloClient<NormalizedCacheObject>;

const link = createUploadLink({ uri: graphqlUrl });

export function getApolloClient(forceNew?: boolean) {
  if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      link,
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              bouquets: {
                keyArgs: ["price", "personType", "code"],
                ...offsetAndLimitPagination(),
              },
              balloons: {
                keyArgs: ["price", "categoryId", "colorId", "code"],
                ...offsetAndLimitPagination(),
              },
            },
          },
          Balloon: {
            fields: {
              basketStatus: {
                ...readLocalBasketStatusValues(),
              },
            },
          },
          Bouquet: {
            fields: {
              basketStatus: {
                ...readLocalBasketStatusValues(),
              },
            },
          },
        },
      }).restore(windowApolloState || {}),
    });
  }

  function offsetAndLimitPagination() {
    return {
      merge(
        existing: any[] = [],
        incoming: any[],
        { args: { skip } }: Record<string, any>
      ) {
        const merged = existing ? existing.slice(0) : [];
        for (let i = 0; i < incoming.length; ++i) {
          merged[skip + i] = incoming[i];
        }
        return merged;
      },
      read(existing: any[], { args: { skip, take } }: Record<string, any>) {
        return existing && existing.slice(skip, skip + take);
      },
    };
  }

  function readLocalBasketStatusValues() {
    return {
      read(_, { readField }: { readField: ReadFieldFunction }) {
        const orders = basketVar();
        const foundInBasket = orders.filter(
          (obj) => obj.id === readField("id")
        )[0];
        if (foundInBasket) {
          return {
            isInBasket: true,
            basketQuantity: foundInBasket.quantity,
          };
        } else {
          return {
            isInBasket: false,
            basketQuantity: 0,
          };
        }
      },
    };
  }

  return CLIENT;
}
