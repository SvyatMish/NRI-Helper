import React, { useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { useFieldArray } from "react-hook-form";

import { Character, CharControl, SetCharValue } from "../types";
import { RHInput } from "../../../components/inputs";
import { poundsToKg } from "../utils";
import { MoneyWidget } from "./money-widget";

export const InventoryBlock: React.FC<{
  strength: number;
  inventory: Character["inventory"];
  control: CharControl;
  money: Character["money"];
  setValue: SetCharValue;
}> = ({ strength, control, inventory, setValue, money }) => {
  const { fields, append, remove } = useFieldArray<Character>({
    name: "inventory",
    control,
  });
  const add = () => {
    append({ name: "", weightInPounds: undefined });
  };

  const gold = Math.floor(money / 100);
  const goldRemainder = money % 100;
  const silverArray = (goldRemainder / 10).toString().split(".");
  const silver = silverArray[0] || 0;
  const bronze = silverArray[1] || 0;

  const maxWeight = useMemo(() => {
    const inPounds = 15 * strength;
    return {
      punds: inPounds,
      kg: poundsToKg(inPounds),
    };
  }, [strength]);

  const allWeight = useMemo(() => {
    const coins = +gold + +silver + +bronze;
    const coinsWeight = Math.floor(coins / 50);
    const itemsWeigh = inventory.reduce(
      (accumulator, currentValue) =>
        accumulator + +(currentValue.weightInPounds || 0),
      0
    );
    const allWeight = itemsWeigh + coinsWeight;
    return {
      punds: allWeight,
      kg: poundsToKg(allWeight),
    };
  }, [money, JSON.stringify(inventory), gold, silver, bronze]);

  return (
    <div className="p-3 border h-fit space-y-2">
      <Typography variant="h4">Инвентарь</Typography>
      <div>
        Макс вес: {maxWeight.kg} кг, {maxWeight.punds} фунты
      </div>
      <div>
        Текущий вес: {allWeight.kg} кг, {allWeight.punds} фунты
      </div>
      <Typography variant="h5">Деньги</Typography>
      Золото: {gold}, Серебро: {silver}, Бронза: {bronze}
      <MoneyWidget setMainValue={setValue} amount={money} />
      <Typography variant="h5">Предметы</Typography>
      {fields.map((attack, index) => {
        const name = `inventory.${index}`;
        return (
          <div
            key={attack.name}
            className="grid grid-cols-[300px_100px_150px_64px] items-end"
          >
            <RHInput label="Название" control={control} name={`${name}.name`} />
            <RHInput
              type="number"
              label="Вес в фунтах"
              control={control}
              name={`${name}.weightInPounds`}
            />
            <div className="mr-2 ml-2">
              кг:{poundsToKg(inventory[index]?.weightInPounds)}
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
