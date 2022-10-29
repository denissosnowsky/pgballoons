import { OrderType } from "../api/types/OrderType";
import fetch from "node-fetch";
import config from "config";

export const sendTelegramMessage = async (o: OrderType) => {
  let userInfo = `
Ім'я: ${o.name}
Телефон: ${o.phone}
E-mail: ${o.email}
Адреса: ${o.address}
День: ${o.date}
Час: ${o.time}
Замовлення: ${o.orders.length}
Повна ціна: ${o.totalPrice}
ID клієнта: ${o.userId}
`;

  for (let i = 0; i < o.orders.length; i++) {
    const itemInfo = `
Замолення ${i+1} ------------------
Ім'я: ${o.orders[i].name}
Ціна: ${o.orders[i].price}
Кількість: ${o.orders[i].quantity}
Опис: ${o.orders[i].description}
Артикул: ${o.orders[i].code}
Фото: ${o.orders[i].image}
ID клієнта: ${o.userId}
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
