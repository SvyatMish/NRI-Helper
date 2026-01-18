import { useForm } from "react-hook-form";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

import { RHInput } from "../../../components/inputs.tsx";
import React, { useState } from "react";
import {
  RollResultType,
  RollResultRendererProps,
  RollFormValues,
} from "../types/index.ts";
import { RollResultRenderer } from "./RollResult.tsx";
import { roll } from "../utils/roll.ts";

export const RollForm: React.FC<{ initialValues?: RollFormValues }> = ({
  initialValues,
}) => {
  const [results, setResults] = useState<RollResultRendererProps[]>([]);
  const [isAgainst, setIsAgainst] = useState(false);
  const [isAttack, setIsAttack] = useState(false);
  const { control, handleSubmit, setValue } = useForm<RollFormValues>({
    defaultValues: initialValues,
  });

  const handleAttackRoll = (data: RollFormValues) => {
    if (data.damageAmount && data.rollAmount) {
      const attackResult: RollResultType = roll(
        data.rollAmount,
        data.difficulty,
      );
      const dodgeResult: RollResultType = roll(
        data.rollAmountAgainst || 0,
        data.difficultyAgainst,
      );
      const finalResult: RollResultRendererProps["attackRoll"] = {
        attack: attackResult,
        dodge: dodgeResult.rolls.length > 0 ? dodgeResult : undefined,
      };
      const attackRoll =
        +attackResult.finalSuccesses - +dodgeResult.finalSuccesses;
      if (attackRoll >= 1) {
        const damageResult: RollResultType = roll(
          +data.damageAmount + +attackRoll - 1,
          data.damageDifficulty,
        );
        const defResult: RollResultType = roll(
          data.defAmount || 0,
          data.defDifficulty,
        );
        finalResult.damage = damageResult;
        if (defResult.rolls.length > 0) {
          finalResult.def = defResult;
        }
      }
      setResults((prev) => [
        { attackRoll: finalResult, formValues: data },
        ...prev,
      ]);
    }
  };

  const handleAgainstRoll = (data: RollFormValues) => {
    if (data.rollAmountAgainst && data.rollAmount) {
      const result: RollResultType = roll(data.rollAmount, data.difficulty);
      const resultAgainst = roll(
        data.rollAmountAgainst,
        data.difficultyAgainst,
      );
      setResults((prev) => [
        {
          rollAgainstRoll: { roll: result, against: resultAgainst },
          formValues: data,
        },
        ...prev,
      ]);
    }
  };

  const handleNormalRoll = (data: RollFormValues) => {
    if (data.rollAmount) {
      setResults((prev) => [
        {
          normalRoll: roll(data.rollAmount!, data.difficulty),
          formValues: data,
        },
        ...prev,
      ]);
    }
  };

  const onSubmit = (data: RollFormValues) => {
    if (isAttack) {
      handleAttackRoll(data);
    } else if (isAgainst && !isAttack) {
      handleAgainstRoll(data);
    } else {
      handleNormalRoll(data);
    }
    setValue("rollName", "");
  };

  const onClear = () => {
    setResults([]);
  };

  return (
    <>
      <div className="flex">
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => {
                setIsAgainst((v) => !v);
              }}
              value={isAgainst}
            />
          }
          label="Ролл против"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => {
                setIsAttack((v) => !v);
              }}
              value={isAttack}
            />
          }
          label="Атака"
        />
        <Button onClick={onClear}>Очистить результат</Button>
      </div>
      {isAttack && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHInput name="rollName" control={control} label="Название ролла" />
          <div className="flex items-end w-fit">
            <div>
              <RHInput name="rollAmount" control={control} label="Атака" />
              <RHInput name="difficulty" control={control} label="Сложность" />
            </div>
            <div>
              <RHInput
                name="rollAmountAgainst"
                control={control}
                label="Уклонение"
              />
              <RHInput
                name="difficultyAgainst"
                control={control}
                label="Сложность"
              />
            </div>
            <div>
              <RHInput name="damageAmount" control={control} label="Урон" />
              <RHInput
                name="damageDifficulty"
                control={control}
                label="Сложность"
              />
            </div>
            <div>
              <RHInput name="defAmount" control={control} label="Защита" />
              <RHInput
                name="defDifficulty"
                control={control}
                label="Сложность"
              />
            </div>
            <Button type="submit">Ролл</Button>
          </div>
        </form>
      )}
      {isAgainst && !isAttack && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHInput name="rollName" control={control} label="Название ролла" />
          <div className="flex items-end w-fit">
            <div>
              <RHInput
                name="rollAmount"
                control={control}
                label="Сколько роллить"
              />
              <RHInput name="difficulty" control={control} label="Сложность" />
            </div>
            <div>
              <RHInput
                name="rollAmountAgainst"
                control={control}
                label="Против"
              />
              <RHInput
                name="difficultyAgainst"
                control={control}
                label="Сложность"
              />
            </div>
            <Button type="submit">Ролл</Button>
          </div>
        </form>
      )}
      {!isAgainst && !isAttack && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHInput name="rollName" control={control} label="Название ролла" />
          <div className="flex items-end w-fit">
            <RHInput
              name="rollAmount"
              control={control}
              label="Сколько роллить"
            />
            <RHInput name="difficulty" control={control} label="Сложность" />
            <Button type="submit">Ролл</Button>
          </div>
        </form>
      )}
      <div className="flex-1 overflow-auto max-w-[640px]">
        {results.map((result, index) => (
          <RollResultRenderer
            rerollAgainst={handleAgainstRoll}
            rerollAttack={handleAttackRoll}
            rerollNormal={handleNormalRoll}
            {...result}
            key={index}
          />
        ))}
      </div>
    </>
  );
};
