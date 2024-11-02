import React from "react";
import {Typography} from "@mui/material";

import { FormulaType } from "../types";

export const Formula: React.FC<{ formula: FormulaType }> = ({formula})=>{
  return <div className="py-4">
    <Typography variant="h6">{formula.name}</Typography>
    <Typography variant="body2">{formula.text}</Typography>
  </div>
}