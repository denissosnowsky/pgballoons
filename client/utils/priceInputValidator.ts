export const priceInputValidator = (value: number): number | undefined => {
  return value > 0 ? value : undefined;
};
