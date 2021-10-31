export const sumOfObjectValues = (counters: Record<string, number>) => {
  return (Object.values(counters) && Object.values(counters).length > 0) ?
    Object.values(counters).reduce((a, b) => a + b)
    : 0;
};
