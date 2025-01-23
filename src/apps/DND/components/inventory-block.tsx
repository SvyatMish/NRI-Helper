import React from "react";
import { Button, Typography } from "@mui/material";
import { useFieldArray } from "react-hook-form";

import { Character, CharControl } from "../types";
import { RHInput } from "../../../components/inputs";
import { poundsToKg } from "../utils";
import { MaxWeight } from "./max-weight";

export const InventoryBlock: React.FC<{
  strength: number;
  inventory: Character["inventory"];
  control: CharControl;
}> = ({ strength, control, inventory }) => {
  const { fields, append, remove } = useFieldArray<Character>({
    name: "inventory",
    control,
  });
  const add = () => {
    append({ name: "Новый предмет", weightInPounds: undefined });
  };

  return (
    <div className="p-3 border h-fit space-y-2">
      <Typography variant="h4">Инвентарь</Typography>
      <MaxWeight strength={strength} />
      {fields.map((attack, index) => {
        const name = `inventory.${index}`;
        return (
          <div
            key={attack.name}
            className="grid grid-cols-[300px_100px_150px_64px] items-end"
          >
            <RHInput label="Название" control={control} name={`${name}.name`} />
            <RHInput
              label="Вес в фунтах"
              control={control}
              name={`${name}.weightInPounds`}
            />
            <div className="mr-2 ml-2">
              кг:{poundsToKg(inventory[index].weightInPounds)}
            </div>

            <Button
              onClick={() => {
                remove(index);
              }}
            >
              -
            </Button>
          </div>
        );
      })}
      <div className="flex justify-end">
        <Button className="justify-self-end" onClick={add}>
          +
        </Button>
      </div>
    </div>
  );
};
