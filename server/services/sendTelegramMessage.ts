import { OrderType } from "../api/types/OrderType";
import fetch from "node-fetch";
import config from "config";

export const sendTelegramMessage = async (o: OrderType) => {
  let userInfo = `
Name: ${o.name}
Phone: ${o.phone}
E-mail: ${o.email}
Address: ${o.address}
ZIP-Code: ${o.code}
Day: ${o.date}
Time: ${o.time}
Orders: ${o.orders.length}
Total price: ${o.totalPrice}
UserID: ${o.userId}
`;

  for (let i = 0; i < o.orders.length; i++) {
    const itemInfo = `
Order ${i+1} ------------------
Name: ${o.orders[i].name}
Price: ${o.orders[i].price}
Quantity: ${o.orders[i].quantity}
Composition: ${o.orders[i].description}
Code: ${o.orders[i].code}
Photo: ${o.orders[i].image}
UserID: ${o.userId}
`;
    userInfo += itemInfo;
  }

  return await fetch(
    encodeURI(
      `https://api.telegram.org/bot${config.get(
        "telegramBotToken"
      )}/sendMessage?chat_id=${config.get("telegramChatId")}&text=${userInfo}`
    )
  )
    .then(() => true)
    .catch(() => false);
};
