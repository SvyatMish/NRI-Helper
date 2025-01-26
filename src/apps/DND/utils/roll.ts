export function rollDice(min = 1, max = 20) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
