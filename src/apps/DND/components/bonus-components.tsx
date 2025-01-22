import React from "react";

import { Attribute, Character } from "../types";
import { getAttributeBonus } from "../utils";

interface BonusComponentProps {
  proficiencyBonus: number;
  mainAttribute?: Attribute;
  allAttributes: Character["attributes"];
}

export const SpellDifficulty: React.FC<BonusComponentProps> = ({
  proficiencyBonus,
  mainAttribute,
  allAttributes,
}) => {
  const attrStat = mainAttribute ? allAttributes[mainAttribute] : 10;
  const attrBonus = getAttributeBonus(attrStat);

  return <div>Сложность заклинаний: {8 + proficiencyBonus + attrBonus}</div>;
};
