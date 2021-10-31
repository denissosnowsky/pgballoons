import { basketVar, OrderType } from "../store/variables";

export const addToBasket = (order: OrderType) => {
    basketVar([...basketVar(), order]);
}