import { useReactiveVar } from "@apollo/client";
import { basketVar } from "../store/variables";

export const useGetBasketValues = () => {
  return useReactiveVar(basketVar);
};
