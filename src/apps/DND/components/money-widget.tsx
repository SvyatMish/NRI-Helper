import { UseFormSetValue, useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { Character } from "../types";
import { RHInput } from "../../../components/inputs";

interface MoneyValues {
  gold?: number;
  silver?: number;
  bronze?: number;
}

export const MoneyWidget: React.FC<{
  amount: number;
  setMainValue: UseFormSetValue<Character>;
}> = ({ amount, setMainValue }) => {
  const { control, getValues } = useForm<MoneyValues>({
    defaultValues: {
      gold: undefined,
      silver: undefined,
      bronze: undefined,
    },
  });
  const gold = Math.floor(amount / 100);
  const goldRemainder = amount % 100;
  const silverArray = (goldRemainder / 10).toString().split(".");
  const silver = silverArray[0] || 0;
  const bronze = silverArray[1] || 0;

  const getAmount = () => {
    const values = getValues();
    const gold = +(values.gold || 0) * 100;
    const silver = +(values.silver || 0) * 10;
    return gold + silver + +(values.bronze || 0);
  };
  const add = () => {
    const money = +getAmount();
    setMainValue("money", amount + money);
  };
  const remove = () => {
    const money = +getAmount();
    const finalAmount = amount - money;
    if (finalAmount < 0) {
      alert("Нет денег бомж");
      return;
    }
    setMainValue("money", finalAmount);
  };
  return (
    <div>
      Золото: {gold}, Серебро: {silver}, Бронза: {bronze}
      <form className="grid grid-cols-[90px_90px_90px_90px] items-end">
        <RHInput type="number" name="gold" control={control} label="Золото" />
        <RHInput
          type="number"
          name="silver"
          control={control}
          label="Серебро"
          value={control._formValues.silver}
        />
        <RHInput type="number" name="bronze" control={control} label="Бронза" />
        <div className="space-y-1 flex flex-col">
          <Button type="button" onClick={add} size="small">
            Добавить
          </Button>
          <Button type="button" onClick={remove} size="small">
            Убрать
          </Button>
        </div>
      </form>
    </div>
  );
};
