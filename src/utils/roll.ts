import type { RollResultType, RollType } from "../types";

export const rollMultiple = (rollAmount: number): number[] => {
  if (rollAmount < 1) {
    return [];
  }
  let random = Math.random().toString();
  const startingIndex = 2;
  const result: number[] = [];
  let currentIndex = startingIndex;
  for (let i = 0; i < rollAmount; i++) {
    if (!random[currentIndex]) {
      random = Math.random().toString();
      currentIndex = startingIndex;
    }
    const number = Number(random[currentIndex]) + 1;
    result.push(number);
    currentIndex++;
  }
  return result;
};

export const checkRollResult = (rawResult: number[], difficulty = 6): RollResultType => {
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
    isCriticalFailure: !successes.length && Boolean(criticalFails),
    difficulty
  };
};

export const roll = (diceAmount: number, difficulty = 6): RollResultType => {
  return checkRollResult(rollMultiple(diceAmount), difficulty);
};