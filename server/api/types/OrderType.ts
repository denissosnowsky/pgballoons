interface Order {
    name: string,
    price: number,
    quantity: number,
    code: number,
    description: string,
    image: string
}


export interface OrderType {
    name: string;
    phone: string;
    email: string;
    address: string;
    code: number;
    date: string;
    time: string;
    totalPrice: number,
    userId: string,
    orders: Array<Order>
};