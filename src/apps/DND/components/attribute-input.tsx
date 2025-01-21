import React from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { Button } from "@mui/material";

import { RHInput } from "../../../components/inputs";
import { Attribute, Skill, Character } from "../types";
import { translationMap, attributesSkillMap } from "../maps";
import { getBonusString, getAttributeBonus } from "../utils";

interface AttributeProps {
  control: Control<Character>;
  name: Attribute;
  value: number;
  skillsCompetent: Skill[];
  skillsProficient: Skill[];
  proficiencyBonus: number;
  setValue: UseFormSetValue<Character>;
}

interface SkillProps
  extends Omit<AttributeProps, "name" | "control" | "value"> {
  name: Skill;
  attributeBonus: number;
}

const SkillInput: React.FC<SkillProps> = ({
  skillsCompetent,
  skillsProficient,
  name,
  attributeBonus,
  proficiencyBonus,
  setValue,
}) => {
  const isProficient = skillsProficient.includes(name);
  const isCompetent = skillsCompetent.includes(name);
  const rollBonus =
    (isCompetent ? proficiencyBonus * 2 : isProficient ? proficiencyBonus : 0) +
    attributeBonus;
  const proficiencySymbol = isCompetent ? (
    <>&#9733;</>
  ) : isProficient ? (
    <>&#9737;</>
  ) : (
    <>&#9744;</>
  );
  const onClick = () => {
    if (isCompetent) {
      setValue(
        "skillsCompetent",
        skillsCompetent.filter((i) => i !== name)
      );
      setValue(
        "skillsProficient",
        skillsProficient.filter((i) => i !== name)
      );
      return;
    }
    if (isProficient) {
      setValue("skillsCompetent", [...skillsCompetent, name]);
      return;
    }
    setValue("skillsProficient", [...skillsProficient, name]);
  };
  return (
    <div>
      <Button onClick={onClick}>{proficiencySymbol}</Button>
      {translationMap[name]} {getBonusString(rollBonus)}
    </div>
  );
};

export const AttributeInput: React.FC<AttributeProps> = (props) => {
  const rollBonus = getAttributeBonus(props.value);
  return (
    <div className="flex space-x-1 items-center p-3 border">
      <RHInput
        className="max-w-24"
        type="number"
        name={`attributes.${props.name}`}
        control={props.control}
        label={translationMap[props.name]}
      />
      <div className="flex space-x-3 items-center">
        <div>{getBonusString(rollBonus)}</div>
        <div className="space-y-1">
          {attributesSkillMap[props.name].map((item) => (
            <SkillInput
              {...props}
              key={item}
              name={item}
              attributeBonus={rollBonus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
