export const poundsToKg = (pounds?: number) => {
  if (!pounds) {
    return 0;
  }
  return Math.floor(pounds / 2.2046);
};
