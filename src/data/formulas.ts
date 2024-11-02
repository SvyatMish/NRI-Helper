import { FormulaType } from "../types";


export const physicalActions: FormulaType[] = [
  {
    name: "Карабканье",
    text: "Ловкость + Атлетика",
  }
];

export const fightActions: FormulaType[] = [
  {
    name: "Инициатива",
    text: "Ловкость + Сообразительность (не броски а просто показатели) + 1d10"
  },
  {
    name: "Рукопашная атака",
    text: "Ловкость + Рукопашный бой"
  },
  {
    name: "Атака холодным оружием",
    text: "Ловкость + Холодное оружие"
  }, {
    name: "Атака огнетсрельным оружием",
    text: "Ловкость + Огнестрельное оружие"
  }, {
    name: "Атака метательным оружием",
    text: "Ловкость + Атлетика"
  }
];

export const ALL_FORMULAS: Record<string, FormulaType[]> = {
  "Действия в бою": fightActions,
  "Физические действия": physicalActions
};