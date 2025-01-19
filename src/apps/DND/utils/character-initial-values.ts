import { Character } from "../types";

export const getCharacterInitialValues = (
  initial: Partial<Character>
): Character => {
  const { strength, dexterity, intelligence, wisdom, charisma, constitution } =
    initial.attributes || {};
  return {
    name: initial.name || "",
    level: initial.level || 1,
    attributes: {
      strength: strength || 10,
      dexterity: dexterity || 10,
      intelligence: intelligence || 10,
      wisdom: wisdom || 10,
      charisma: charisma || 10,
      constitution: constitution || 10,
    },
    skillsCompetent: initial.skillsCompetent || [],
    skillsProficient: initial.skillsProficient || [],
    spellAttribute: initial.spellAttribute || "intelligence",
    attackAttribute: initial.attackAttribute || "strength",
  };
};
