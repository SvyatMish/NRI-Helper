import type { RollResultType, RollType } from "../types";

//only 1d10 for now
export const rollOnce = () => {
  return Number(Math.random().toString()[2]) + 1;
};

export const rollMultiple = (rollAmount: number): number[] => {
  if (rollAmount < 1) {
    return [];
  }
  let result = [];
  for (let i = 1; i <= rollAmount; i++) {
    result.push(rollOnce());
  }
  return result;
};

export const checkRollResult = (rawResult: number[], difficulty = 6): RollResultType => {
  rawResult.sort((a, b) => a - b);
  const rolls: RollType[] = rawResult.map((i) => {
    return {
      number: i,
      isSuccess: i >= difficulty,
      isCriticalFail: i === 1,
      isCancelledSuccess: false
    };
  });
  const criticalFails = rolls.filter(i => i.isCriticalFail).length;
  const successes = rolls.filter((i) => i.isSuccess);
  // successes.sort((a, b) => a.number - b.number);
  if (criticalFails > 0) {
    let successesToCancel = criticalFails;
    for (let i = 0; i < successes.length; i++) {
      if (successesToCancel < 1) {
        break;
      }
      const current = successes[i];
      current.isCancelledSuccess = true;
      successesToCancel--;
    }
  }
  const finalSuccesses = rolls.filter((i) => i.isSuccess && !i.isCancelledSuccess).length;
  return {
    rolls,
    finalSuccesses,
    isSuccess: finalSuccesses > 0,
    //not a single success (not even cancelled one) and has at least one critical failure
    isCriticalFailure: !Boolean(successes.length) && Boolean(criticalFails),
    difficulty
  };
};

export const roll = (diceAmount: number, difficulty = 6): RollResultType => {
  return checkRollResult(rollMultiple(diceAmount), difficulty);
};