import React from "react";
import { Casino } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";

import {
  RollResultType,
  RollResultRendererProps,
  RollFormValues,
} from "../types";

const successTextClass = "text-lime-500";
const failTextClass = "text-red-700";

const ResultContainer: React.FC<{
  children: React.ReactNode;
  reroll: VoidFunction;
}> = ({ children, reroll }) => {
  return (
    <div className="p-2 pl-0 border-b-2 border-solid border-[rgb(229, 231, 235)]">
      {children}
      <div className="mt-2">
        <Button onClick={reroll}>Reroll</Button>
      </div>
    </div>
  );
};

export const RollResult: React.FC<{ result: RollResultType }> = ({
  result,
}) => {
  return (
    <>
      <div>Количество бросков: {result.rolls.length}</div>
      <div>Сложность: {result.difficulty}</div>
      <div className="flex space-x-1 overflow-x-auto">
        <Casino />
        {result.rolls.map((roll) => {
          if (roll.isCriticalFail) {
            return <span className={failTextClass}>{roll.number}</span>;
          } else if (roll.isCancelledSuccess) {
            return (
              <span className="text-amber-400 line-through">{roll.number}</span>
            );
          } else if (roll.isSuccess) {
            return <span className={successTextClass}>{roll.number}</span>;
          } else {
            return <span>{roll.number}</span>;
          }
        })}
      </div>
      {result.isCriticalFailure && (
        <div className={failTextClass}>Провал! &#128128;</div>
      )}
      {result.isSuccess && (
        <div className="flex space-x-1">
          <div>Успехов</div>:
          <span className={successTextClass}>{result.finalSuccesses}</span>
        </div>
      )}
      {!result.isSuccess && !result.isCriticalFailure && (
        <div className={failTextClass}>Неудача</div>
      )}
    </>
  );
};
type RerollFunc = (data: RollFormValues) => void;
export const RollResultRenderer: React.FC<
  RollResultRendererProps & {
    rerollNormal: RerollFunc;
    rerollAgainst: RerollFunc;
    rerollAttack: RerollFunc;
  }
> = ({
  normalRoll,
  rollAgainstRoll,
  attackRoll,
  formValues,
  rerollAgainst,
  rerollAttack,
  rerollNormal,
}) => {
  if (attackRoll) {
    const finalDamage = Math.max(
      (attackRoll.damage?.finalSuccesses || 0) -
        (attackRoll.def?.finalSuccesses || 0),
      0,
    );
    const halved = Math.floor(finalDamage / 2);
    return (
      <ResultContainer
        reroll={() => {
          rerollAttack(formValues);
        }}
      >
        {formValues.rollName && (
          <Typography variant="h4">{formValues.rollName}</Typography>
        )}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Typography variant="h6">Атака</Typography>
            <RollResult result={attackRoll.attack} />
          </div>
          <div>
            {attackRoll.dodge && (
              <>
                <Typography variant="h6">Уворот</Typography>
                <RollResult result={attackRoll.dodge} />
              </>
            )}
          </div>
        </div>
        {!attackRoll.damage && (
          <div className={failTextClass}>
            <Typography variant="h6">Промах</Typography>
          </div>
        )}
        {attackRoll.damage && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Typography variant="h6">Урон</Typography>
                <RollResult result={attackRoll.damage} />
              </div>
              <div>
                {attackRoll.def && (
                  <>
                    <Typography variant="h6">Защита</Typography>
                    <RollResult result={attackRoll.def} />
                  </>
                )}
              </div>
            </div>
            <Typography variant="h6">Летальный урон: {finalDamage}</Typography>
            <Typography variant="h6">Ударный урон: {halved}</Typography>
          </>
        )}
      </ResultContainer>
    );
  }
  if (rollAgainstRoll) {
    const finalResult =
      rollAgainstRoll.roll.finalSuccesses -
      rollAgainstRoll.against.finalSuccesses;
    const isSuccess = finalResult > 0;
    return (
      <ResultContainer
        reroll={() => {
          rerollAgainst(formValues);
        }}
      >
        {formValues.rollName && (
          <Typography variant="h4">{formValues.rollName}</Typography>
        )}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Typography variant="h6">Бросок 1</Typography>
            <RollResult result={rollAgainstRoll.roll} />
          </div>
          <div>
            <Typography variant="h6">Бросок 2</Typography>
            <RollResult result={rollAgainstRoll.against} />
          </div>
        </div>
        <div
          className={
            rollAgainstRoll.roll.finalSuccesses >
            rollAgainstRoll.against.finalSuccesses
              ? successTextClass
              : failTextClass
          }
        >
          <div className={isSuccess ? successTextClass : failTextClass}>
            <Typography variant="h6">
              Результат: {isSuccess ? finalResult : "Провал"}
            </Typography>
          </div>
        </div>
      </ResultContainer>
    );
  }
  if (normalRoll) {
    return (
      <ResultContainer
        reroll={() => {
          rerollNormal(formValues);
        }}
      >
        {formValues.rollName && (
          <Typography variant="h4">{formValues.rollName}</Typography>
        )}
        <RollResult result={normalRoll} />
      </ResultContainer>
    );
  }
  return null;
};
