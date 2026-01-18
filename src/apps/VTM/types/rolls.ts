export interface RollFormValues {
  rollAmount?: number;
  difficulty?: number;
  rollAmountAgainst?: number;
  difficultyAgainst?: number;
  damageAmount?: number;
  damageDifficulty?: number;
  defAmount?: number;
  defDifficulty?: number;
}

export interface RollType {
  number: number;
  isSuccess: boolean;
  isCriticalFail: boolean;
  isCancelledSuccess: boolean;
}

export interface RollResultType {
  rolls: RollType[];
  finalSuccesses: number;
  isSuccess: boolean;
  isCriticalFailure: boolean;
  difficulty: number;
}

export interface RollResultRendererProps {
  normalRoll?: RollResultType;
  rollAgainstRoll?: {
    roll: RollResultType;
    against: RollResultType;
  };
  attackRoll?: {
    attack: RollResultType;
    dodge?: RollResultType;
    damage?: RollResultType;
    def?: RollResultType;
  };
  formValues: RollFormValues;
}
