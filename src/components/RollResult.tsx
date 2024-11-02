import React from "react";
import { Casino } from "@mui/icons-material";

import { RollResultType } from "../types";


const successTextClass = "text-lime-500";
const failTextClass = "text-red-700";

export const RollResult: React.FC<{ result: RollResultType; }> = ({ result }) => {
  return <div className="p-2 pl-0 border-b-2 border-solid border-[rgb(229, 231, 235)]">
    <div>Количество бросков: {result.rolls.length}</div>
    <div>Сложность: {result.difficulty}</div>
    <div className="flex space-x-1 overflow-x-auto">
      <Casino />
      {result.rolls.map((roll) => {
        if (roll.isCriticalFail) {
          return <span className={failTextClass}>{roll.number}</span>;
        } else if (roll.isCancelledSuccess) {
          return <span className="text-amber-400 line-through">{roll.number}</span>;
        } else if (roll.isSuccess) {
          return <span className={successTextClass}>{roll.number}</span>;
        } else {
          return <span>{roll.number}</span>;
        }
      })}
    </div>
    {result.isCriticalFailure && <div className={failTextClass}>Провал! &#128128;</div>}
    {result.isSuccess && <div className="flex space-x-1">
      <div>
        Успехов
      </div>
      :<span className={successTextClass}>{result.finalSuccesses}</span>
    </div>}
    {!result.isSuccess && !result.isCriticalFailure && <div className={failTextClass}>Неудача</div>}
  </div>;

};