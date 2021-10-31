export const counterStateChanger = (
  counters: Record<string, number>,
  id: string,
  value: number,
  initValue: number
) => {
  return (countersPrev = counters) => ({
    ...countersPrev,
    [id]: value * initValue,
  });
};
