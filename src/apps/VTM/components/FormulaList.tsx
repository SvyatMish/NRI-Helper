import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useCallback, useState } from "react";

import { ALL_FORMULAS, AllFormulasType } from "../data/index.ts";
import { Formula } from "./Formula.tsx";
import { SimpleCollapse } from "../../../components/Collapse.tsx";

const List: React.FC<{ formulasObject: AllFormulasType }> = ({
  formulasObject,
}) => {
  return (
    <div className="flex-1 overflow-auto">
      {Object.entries(formulasObject).map(([key, formulas]) => (
        <SimpleCollapse key={key} title={key} initialOpen>
          {formulas.map((formula) => (
            <Formula formula={formula} key={formula.name} />
          ))}
        </SimpleCollapse>
      ))}
    </div>
  );
};

export const FormulaList = () => {
  const [filtered, setFiltered] = useState<AllFormulasType | undefined>();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (!query) {
      setFiltered(undefined);
    }
    const newFiltered: AllFormulasType = {};
    Object.keys(ALL_FORMULAS).forEach((key) => {
      const filteredItems = ALL_FORMULAS[key].filter((i) =>
        i.name.toLowerCase().trim().includes(query.trim().toLowerCase())
      );
      if (filteredItems.length) {
        newFiltered[key] = filteredItems;
      }
    });
    setFiltered(newFiltered);
  }, []);

  return (
    <div className="p-6 box-border h-screen overflow-hidden flex flex-col">
      <div>
        <Typography variant="h3" className="mb-10">
          Библиотека
        </Typography>
        <TextField
          label="Поиск"
          variant="standard"
          onChange={handleChange}
          name="search"
        />
      </div>
      <List formulasObject={filtered || ALL_FORMULAS} />
    </div>
  );
};
