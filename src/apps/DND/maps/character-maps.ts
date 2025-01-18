import { Skill, Attribute } from "../types";

export const attributesSkillMap: Record<Attribute, Skill[]> = {
  strength: ["athletics"],
  dexterity: ["acrobatics", "sleight of hand", "stealth"],
  constitution: [],
  intelligence: ["arcana", "history", "investigation", "religion", "nature"],
  wisdom: ["animal handling", "insight", "medicine", "perception", "survival"],
  charisma: ["deception", "intimidation", "persuasion", "performance"],
};

type ShitToTranslate = Attribute | Skill;

export const translationMap: Record<ShitToTranslate, string> = {
  strength: "Сила",
  dexterity: "Ловкость",
  constitution: "Выносливость",
  intelligence: "Интеллект",
  wisdom: "Мудрость",
  charisma: "Харизма",
  athletics: "Атлетика",
  acrobatics: "Акробатика",
  "sleight of hand": "Ловкость рук",
  stealth: "Скрытность",
  arcana: "Магия",
  history: "История",
  investigation: "Анализ",
  religion: "Религия",
  nature: "Природа",
  "animal handling": "Обращение с животными",
  insight: "Проницательность",
  medicine: "Медицина",
  perception: "Внимательность",
  survival: "Выживание",
  deception: "Обман",
  intimidation: "Запугивание",
  performance: "Исполнение",
  persuasion: "Убеждение",
};
