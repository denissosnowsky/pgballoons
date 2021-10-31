import { basketVar } from "../store/variables";

export const changeQuantInBasket = (id: string, quant: number) => {
  const orders = basketVar();
  const filteredOrders = orders.map((obj) =>
    obj.id === id ? { ...obj, quantity: quant } : obj
  );
  basketVar([...filteredOrders]);
};
