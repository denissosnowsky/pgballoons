export const formatNumber = (number: string) => {
  let arr = [];
  let splitedNum = number.split("");
  for (let i = 0; i < splitedNum.length; i++) {
    switch (i) {
      case 2:
        arr.push(`(${splitedNum[i]}`);
        break;
      case 4:
        arr.push(`${splitedNum[i]})`);
        break;
      case 7:
        arr.push(`${splitedNum[i]}-`);
        break;
      default:
        arr.push(splitedNum[i]);
        break;
    }
  }
  const formatedNumber = arr.join("");
  return formatedNumber;
};
