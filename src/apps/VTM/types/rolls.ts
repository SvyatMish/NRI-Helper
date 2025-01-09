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
