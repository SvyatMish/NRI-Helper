import React from "react";
import { Button } from "@mui/material";

import { RHInput } from "../../../components/inputs";
import {
  Attribute,
  Skill,
  Character,
  SetCharValue,
  CharControl,
} from "../types";
import { translationMap, attributesSkillMap } from "../maps";
import { getBonusString, getAttributeBonus } from "../utils";

interface AttributeProps {
  control: CharControl;
  name: Attribute;
  value: number;
  skillsCompetent: Character["skillsCompetent"];
  skillsProficient: Character["skillsProficient"];
  savingThrowsProfficient: Character["savingThrowsProfficient"];
  proficiencyBonus: number;
  setValue: SetCharValue;
}

const CompetentIcon = () => <>&#9733;</>;
const ProficientIcon = () => <>&#9737;</>;
const NotProficientIcon = () => <>&#9744;</>;

interface SkillProps
  extends Omit<
    AttributeProps,
    "name" | "control" | "value" | "savingThrowsProfficient"
  > {
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
    <CompetentIcon />
  ) : isProficient ? (
    <ProficientIcon />
  ) : (
    <NotProficientIcon />
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
  const isSvaingThrowProficient = props.savingThrowsProfficient.includes(
    props.name
  );
  const onClickSavingThrow = () => {
    if (isSvaingThrowProficient) {
      props.setValue(
        "savingThrowsProfficient",
        props.savingThrowsProfficient.filter((item) => item !== props.name)
      );
    } else {
      props.setValue("savingThrowsProfficient", [
        ...props.savingThrowsProfficient,
        props.name,
      ]);
    }
  };
  const savingThrowBonus = isSvaingThrowProficient
    ? rollBonus + props.proficiencyBonus
    : rollBonus;
  return (
    <div className="flex space-x-1 items-center p-3 border border-[#3b3534]">
      <div className="space-y-2">
        <div className="flex w-full justify-between items-end">
          <RHInput
            className="max-w-24"
            type="number"
            name={`attributes.${props.name}`}
            control={props.control}
            label={translationMap[props.name]}
          />
          <div>{getBonusString(rollBonus)}</div>
        </div>

        <div className="flex justify-between w-full">
          <Button className="p-0 w-3" onClick={onClickSavingThrow}>
            {isSvaingThrowProficient ? (
              <ProficientIcon />
            ) : (
              <NotProficientIcon />
            )}
          </Button>
          Спасбросок: {getBonusString(savingThrowBonus)}
        </div>
      </div>

      <div className="flex space-x-3 items-center">
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
