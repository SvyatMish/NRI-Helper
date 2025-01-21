import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { Character, Attribute } from "../types/characters.ts";
import { RHInput } from "../../../components/inputs.tsx";
import { saveFile } from "../../../utils/files.ts";
import { AttributeInput } from "./attribute-input.tsx";
import { AttributeSelect } from "./attribute-select.tsx";
import { AttackBonus, SpellDifficulty } from "./bonus-components.tsx";
import { getProficiencyBonus } from "../utils/proficiency-bonus.ts";
import { getCharacterInitialValues } from "../utils";
import { MaxWeight } from "./max-weight.tsx";
import { MoneyWidget } from "./money-widget.tsx";

export const HeroForm: React.FC<{ initialValues?: Character; id: string }> = ({
  initialValues,
  id,
}) => {
  const { control, handleSubmit, watch, setValue } = useForm<Character>({
    defaultValues: getCharacterInitialValues(initialValues || {}),
  });

  const onSubmit = async (data: Character) => {
    if (!data.name) {
      alert("no name retard");
    }
    await saveFile({ fileName: id, folder: "heroes", data });
  };

  const attributes = watch("attributes");
  const level = watch("level");
  const skillsProficient = watch("skillsProficient");
  const skillsCompetent = watch("skillsCompetent");
  const attackAttribute = watch("attackAttribute");
  const spellAttribute = watch("spellAttribute");
  const hp = watch("hp");
  const money = watch("money");
  const savingThrowsProfficient = watch("savingThrowsProfficient");

  const proficiencyBonus = getProficiencyBonus(level);

  const allHp = +hp.currentHp + +hp.tempHp;

  return (
    <div>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-1 items-center">
          <RHInput name="name" control={control} label="Имя персонажа" />
          <RHInput name="level" control={control} label="Уровень" />
          <div>Бонус владения: +{proficiencyBonus}</div>
        </div>
        <div className="grid grid-cols-[60px_60px_60px_60px_60px] items-center">
          <RHInput
            type="number"
            name="hp.currentHp"
            control={control}
            label="ОЗ"
          />
          <RHInput
            type="number"
            name="hp.tempHp"
            control={control}
            label="Врем. ОЗ"
          />
          <RHInput
            type="number"
            name="hp.maxHp"
            control={control}
            label="Макс. ОЗ"
          />
          {allHp}/{hp.maxHp}
          <RHInput type="number" name="AC" control={control} label="КБ" />
        </div>
        <div className="flex space-x-3">
          <div className="w-fit">
            {Object.entries(attributes).map(([key, value]) => (
              <AttributeInput
                key={key}
                name={key as Attribute}
                control={control}
                value={value}
                proficiencyBonus={proficiencyBonus}
                setValue={setValue}
                skillsCompetent={skillsCompetent}
                skillsProficient={skillsProficient}
                savingThrowsProfficient={savingThrowsProfficient}
              />
            ))}
          </div>
          <div className="w-fit space-y-4">
            <MoneyWidget amount={money} setMainValue={setValue} />
            <RHInput
              type="number"
              name="speed"
              control={control}
              label="Скорость"
            />
            <div className="flex items-end space-x-2">
              <AttributeSelect
                label="Хар. атаки"
                name="attackAttribute"
                control={control}
              />
              <AttackBonus
                mainAttribute={attackAttribute}
                allAttributes={attributes}
                proficiencyBonus={proficiencyBonus}
              />
            </div>
            <div className="flex items-end space-x-2">
              <AttributeSelect
                label="Хар. заклианий"
                name="spellAttribute"
                control={control}
              />
              <SpellDifficulty
                mainAttribute={spellAttribute}
                allAttributes={attributes}
                proficiencyBonus={proficiencyBonus}
              />
            </div>
            <MaxWeight strength={attributes.strength} />
          </div>
        </div>
        <Button type="submit">Сохранить</Button>
      </form>
    </div>
  );
};
