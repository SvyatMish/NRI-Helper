export const getBonusString = (bonus: number) => {
  return `${bonus > 0 ? "+" : ""}${Math.floor(bonus)}`;
};
