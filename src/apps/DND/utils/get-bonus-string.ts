export const getAttributeBonus = (attrValue: number) => {
  return Math.floor((attrValue - 10) * 0.5);
};

export const getBonusString = (bonus: number) => {
  return `${bonus > 0 ? "+" : ""}${Math.floor(bonus)}`;
};
