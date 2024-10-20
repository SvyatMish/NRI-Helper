export interface PhysicalAttributesType {
  strength: number;
  dexterity: number;
  stamina: number;
}

export interface SocialAttributesType {
  charisma: number;
  manipulation: number;
  appearance: number;
}

export interface MentalAttributesType {
  perception: number;
  intelligence: number;
  wits: number;
}

export interface TalentsType {
  alertness: number;
  athletics: number;
  brawl: number;
  evasion: number;
  empathy: number;
  speech: string;
  intimidation: number;
  leadership: number;
  streetwise: number;
  cunning: number;
}

export interface SkillsType {
  understandingAnimals: number;
  crafting: number;
  driving: number;
  etiquette: number;
  firearms: number;
  meleeWeapons: number;
  performance: number;
  security: number;
  stealth: number;
  survival: number;
}

export interface KnowledgeType {
  humanities: number;
  computers: number;
  finance: number;
  investigation: number;
  law: number;
  languages: number;
  medicine: number;
  occultism: number;
  politics: number;
  naturalSciences: number;
}

export interface UnitType {
  blood: number;
  health: number;
  attributes: {
    physical: PhysicalAttributesType;
    social: SocialAttributesType;
    mental: MentalAttributesType;
  };
  talents: TalentsType;
  skills: SkillsType;
  knowledge: KnowledgeType;


}