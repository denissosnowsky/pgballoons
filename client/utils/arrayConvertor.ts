import {
  ArrayConvertorArgType,
  ArrayConvertorResultType,
} from "../types/arrayConvertorTypes";

export const arrayConvertor = (
  data: ArrayConvertorArgType
): ArrayConvertorResultType => {
  if (data && data.length > 0) {
    let arr = [];
    for (let i = 0; i < data!.length; i++) {
      arr[i] = {
        leftText: data![i]!.name,
        rightText: data![i]!.price,
        id: data![i]!.id,
        fixed: data![i]!.fixed,
      };
    }
    return arr;
  } else {
    return [];
  }
};
