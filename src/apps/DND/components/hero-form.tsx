import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { Character, Attribute } from "../types/characters.ts";
import { RHInput } from "../../../components/inputs.tsx";
import { saveFile } from "../../../utils/files.ts";
import { AttributeInput } from "./attribute-input.tsx";
import { getProficiencyBonus } from "../utils/proficiency-bonus.ts";
import { getCharacterInitialValues } from "../utils";

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

  const proficiencyBonus = getProficiencyBonus(level);

  return (
    <div>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-1 items-center">
          <RHInput name="name" control={control} label="Имя персонажа" />
          <RHInput name="level" control={control} label="Уровень" />
          <div>Бонус владения: +{proficiencyBonus}</div>
        </div>
        <div className="w-fit">
          {Object.entries(attributes).map(([key, value]) => (
            <AttributeInput
              setValue={setValue}
              skillsCompetent={skillsCompetent}
              skillsProficient={skillsProficient}
              key={key}
              name={key as Attribute}
              control={control}
              value={value}
              proficiencyBonus={proficiencyBonus}
            />
          ))}
        </div>

        <Button type="submit">Сохранить</Button>
      </form>
    </div>
  );
};
