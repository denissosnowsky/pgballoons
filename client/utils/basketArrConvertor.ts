import { BasketVarType } from "../store/variables";

export const basketArrConvertor = (db: BasketVarType) => {
  let arr = new Array(db.length);

  if (arr.length > 0) {
    for (let i = 0; i < db.length; i++) {
      arr[i] = {
        leftText: db[i].name,
        rightText: db[i].price,
        code: db[i].code,
        image: db[i].image,
        description: db[i].description,
        quantity: db[i].quantity,
        id: db[i].id
      };
    }
  }

  return arr;
};
