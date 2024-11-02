import { TextField, Typography } from "@mui/material";
import { useState } from "react";

import { ALL_FORMULAS } from "../data";
import { Formula } from "./Formula.tsx";
import { SimpleCollapse } from "./Collapse.tsx";

export const FormulaList = () => {
  const [search, setSearch] = useState("");
  return <div>
    <Typography variant="h3" className="mb-10">Библиотека</Typography>
    <TextField label="Поиск" variant="standard" onChange={(e) => {
      setSearch(e.target.value);
    }} value={search} name="search" />
    <div>
      {Object.entries(ALL_FORMULAS).map(([key, formulas]) => (<SimpleCollapse key={key} title={key}>
        {formulas.map((formula) => (<Formula formula={formula} key={formula.name} />))}
      </SimpleCollapse>))}
    </div>
  </div>;
};