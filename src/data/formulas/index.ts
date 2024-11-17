import { FormulaType } from "../../types";

import { physicalActions } from "./physical.ts";
import { battleActions } from "./battle.ts";
import { bloodActions } from "./blood.ts";
import { mentalActions } from "./mental.ts";
import { socialActions } from "./social.ts";

export const ALL_FORMULAS: Record<string, FormulaType[]> = {
  "Действия с кровью": bloodActions,
  "Действия в бою": battleActions,
  "Физические действия": physicalActions,
  "Ментальные действия": mentalActions,
  "Социальные действия": socialActions
};

export type AllFormulasType = typeof ALL_FORMULAS