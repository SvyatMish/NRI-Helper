import { TextField, Typography } from "@mui/material";
import { useState } from "react";

import { formulas } from "../data";
import { Formula } from "./Formula.tsx";

export const FormulaList = () => {
  const [search, setSearch] = useState("");
  return <div>
    <Typography variant="h3" className="mb-10">Библиотека</Typography>
    <TextField label="Поиск" variant="standard" onChange={(e) => {
      setSearch(e.target.value);
    }} value={search} name="search" />
    <div>
      {formulas.map((formula) => (<Formula formula={formula} key={formula.name} />))}
    </div>
  </div>;
};