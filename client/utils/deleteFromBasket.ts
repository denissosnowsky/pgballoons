import { basketVar } from "../store/variables";

export const deleteFromBasket = (id: string) => {
    const orders = basketVar();
    const filteredOrders = orders.filter(obj => obj.id != id);
    basketVar(filteredOrders);
}