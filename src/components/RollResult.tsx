import React from "react";

import {RollResultType} from "../types";


const successTextClass = "text-lime-500";
const failTextClass = "text-red-700";

export const RollResult: React.FC<{ result: RollResultType; }> = ({result}) => {
    return <div className="flex space-x-2">
        <div className="flex space-x-1">
            <div>Количество бросков: {result.rolls.length}</div>
            <div>Сложность: {result.difficulty}</div>
            <div className="flex space-x-1">
                ({result.rolls.map((roll) => {
                if (roll.isCriticalFail) {
                    return <div className={failTextClass}>{roll.number}</div>
                } else if (roll.isCancelledSuccess) {
                    return <div className="text-amber-400 line-through">{roll.number}</div>
                } else if (roll.isSuccess) {
                    return <div className={successTextClass}>{roll.number}</div>
                } else {
                    return <div>{roll.number}</div>
                }
            })})
            </div>
        </div>
        {result.isCriticalFailure && <div className={failTextClass}>Провал! &#128128;</div>}
        {result.isSuccess && <div className="flex space-x-1">
            <div>
                Успехов
            </div>
            :<span className={successTextClass}>{result.finalSuccesses}</span>
        </div>}
        {!result.isSuccess && !result.isCriticalFailure && <div className={failTextClass}>Неудача</div>}
    </div>

}