import { UseFormSetValue, Control } from "react-hook-form";

export type Skill =
  | "acrobatics"
  | "animal handling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleight of hand"
  | "stealth"
  | "survival";

export interface Attack {
  name: string;
  damage: string;
  attribute: Attribute;
}

export interface InventoryItem {
  name: string;
  weightInPounds?: number;
}
export interface Character {
  name: string;
  level: number;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  skillsProficient: Skill[];
  skillsCompetent: Skill[];
  spellAttribute: Attribute;
  attackAttribute: Attribute;
  savingThrowsProfficient: Attribute[];
  hp: {
    currentHp: number;
    maxHp: number;
    tempHp: number;
  };
  speed: number;
  AC: number;
  money: number;
  attacks: Attack[];
  inventory: InventoryItem[];
}

export type Attribute = keyof Character["attributes"];
export type SetCharValue = UseFormSetValue<Character>;
export type CharControl = Control<Character>;
