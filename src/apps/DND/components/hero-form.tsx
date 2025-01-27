import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography, Modal } from "@mui/material";

import { Character, Attribute, BattleCharacter } from "../types/characters.ts";
import { RHInput } from "../../../components/inputs.tsx";
import { saveFile } from "../../../utils/files.ts";
import { AttributeInput } from "./attribute-input.tsx";
import { AttributeSelect } from "./attribute-select.tsx";
import { SpellDifficulty } from "./bonus-components.tsx";
import { getProficiencyBonus } from "../utils/proficiency-bonus.ts";
import { getCharacterInitialValues, getAttributeBonus } from "../utils";
import { AttacksBlock } from "./attacks-block.tsx";
import { InventoryBlock } from "./inventory-block.tsx";
import { HpBlock } from "./hp-block.tsx";
import { rollDice } from "../utils";

export interface HeroFormProps {
  initialValues?: Character;
  id?: string;
  minified: boolean;
  folder: "heroes" | "npc";
  toBattle?(_: BattleCharacter): void;
}

const ToBattleButton: React.FC<{
  onClick: VoidFunction;
  position: "left" | "right";
}> = ({ onClick, position }) => {
  const isRight = position === "right";
  return (
    <Button className={isRight ? "order-10" : "order-[0]"} onClick={onClick}>
      {isRight ? "-->" : "<--"}
    </Button>
  );
};

export const HeroForm: React.FC<HeroFormProps> = ({
  initialValues,
  id,
  minified,
  folder,
  toBattle,
}) => {
  const [isOpen, setIsOpen] = useState(!minified);
  const { control, handleSubmit, watch, setValue, getValues } =
    useForm<Character>({
      defaultValues: getCharacterInitialValues(initialValues || {}),
    });

  const onSubmit = async (data: Character) => {
    if (!data.name) {
      alert("no name retard");
    }
    await saveFile({
      fileName: id || `${data.name}.json`,
      folder,
      data,
    });
  };

  const name = watch("name");
  const attributes = watch("attributes");
  const level = watch("level");
  const skillsProficient = watch("skillsProficient");
  const skillsCompetent = watch("skillsCompetent");
  const attackAttribute = watch("attackAttribute");
  const spellAttribute = watch("spellAttribute");
  const hp = watch("hp");
  const money = watch("money");
  const savingThrowsProfficient = watch("savingThrowsProfficient");
  const attacks = watch("attacks");
  const inventory = watch("inventory");

  const proficiencyBonus = getProficiencyBonus(level);

  const getAttackBonus = (attribute?: Attribute) => {
    if (!attribute) {
      return { attack: 0, damage: 0 };
    }
    const attrValue = attributes[attribute];
    const attrBonus = +getAttributeBonus(attrValue);
    let attackBonus = 0;
    if (attackAttribute === attribute) {
      attackBonus = attrBonus + +proficiencyBonus;
    } else {
      attackBonus = attrBonus;
    }
    return { attack: attackBonus, damage: attrBonus };
  };

  const allHp = +hp.currentHp + +hp.tempHp;
  const handleTobattle = (rollResult: number) => {
    toBattle?.({
      folder,
      data: getValues(),
      fileName: id || "",
      initiative: rollResult + +getAttributeBonus(attributes.dexterity),
    });
  };
  if (!isOpen) {
    return (
      <div className="flex items-center">
        {toBattle && (
          <ToBattleButton
            position={folder === "heroes" ? "right" : "left"}
            onClick={() => {
              handleTobattle(rollDice());
            }}
          />
        )}
        <form
          className="p-3 rounded border w-fit min-w-[400px] space-y-3 border-[#3b3534]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between">
            <Typography variant="h6">{name}</Typography>
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              type="button"
            >
              Рзавенуть
            </Button>
          </div>

          <HpBlock control={control} allHp={allHp} maxHp={hp.maxHp} />
          <AttacksBlock
            attacks={attacks}
            getAttackBonus={getAttackBonus}
            control={control}
            minified
          />
          <div className="flex justify-end">
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <Modal
      open={isOpen}
      style={{ backdropFilter: "blur(5px)" }}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <form
        className="bg-[#dbd6d5] space-y-2 fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] w-[95vw] h-[95vh] overflow-auto p-3 rounded border border-[#3b3534]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-end space-x-5">
          <div className="space-y-4">
            <div className="flex space-x-1 items-center">
              <RHInput name="name" control={control} label="Имя персонажа" />
              <RHInput name="level" control={control} label="Уровень" />
              <div>Бонус владения: +{proficiencyBonus}</div>
            </div>
            <HpBlock control={control} allHp={allHp} maxHp={hp.maxHp} />
          </div>
          <Button type="submit">Сохранить</Button>
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
          <div className="w-fit space-y-4 h-fit">
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
              <div>Атака +{getAttackBonus(attackAttribute).attack}</div>
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
            <AttacksBlock
              attacks={attacks}
              getAttackBonus={getAttackBonus}
              control={control}
              minified={false}
            />
            <InventoryBlock
              setValue={setValue}
              money={money}
              inventory={inventory}
              control={control}
              strength={attributes.strength}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
