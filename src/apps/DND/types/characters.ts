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
}

export type Attribute = keyof Character["attributes"];
