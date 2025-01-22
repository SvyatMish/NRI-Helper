import React from "react";
import { MenuItem, InputLabel } from "@mui/material";

import { Attribute, CharControl } from "../types";
import { RHSelect } from "../../../components/inputs";
import { getCharacterInitialValues } from "../utils";
import { translationMap } from "../maps";

const allAtrributes = Object.keys(getCharacterInitialValues({}).attributes);

export const AttributeSelect: React.FC<{
  control: CharControl;
  name: string;
  label: string;
}> = ({ control, name, label }) => {
  const labelId = `label-${name}`;
  return (
    <div>
      <InputLabel id={labelId}>{label}</InputLabel>
      <RHSelect
        variant="standard"
        name={name}
        control={control}
        labelId={labelId}
      >
        {allAtrributes.map((attr) => (
          <MenuItem key={attr} value={attr}>
            {translationMap[attr as Attribute]}
          </MenuItem>
        ))}
      </RHSelect>
    </div>
  );
};
