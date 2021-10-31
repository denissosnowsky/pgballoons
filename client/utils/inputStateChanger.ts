export const inputStateChanger = (
  counters: Record<string, number>,
  property: string,
  value: number | string
) => {
  return () => ({
    ...counters,
    [property]: +value,
  });
};
