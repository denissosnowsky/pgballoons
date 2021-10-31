import { useEffect } from "react";

export const useSynchronizeUrl = (
  params: URLSearchParams,
  values: Array<{
    value: string | number | undefined | null;
    queryName: string | number | undefined | null;
  }>
) => {
  useEffect(() => {
    values.forEach((obj) => {
        obj.value &&
        (params!.has(`${obj.queryName}`)
          ? params!.set(`${obj.queryName}`, String(obj.value))
          : params!.append(`${obj.queryName}`, String(obj.value)));
          
      !obj.value &&
        params!.has(`${obj.queryName}`) &&
        params!.delete(`${obj.queryName}`);
    });
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  }, values);
};
