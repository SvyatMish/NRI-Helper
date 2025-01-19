import { Control, Controller } from "react-hook-form";
import { TextField, TextFieldProps, Select, SelectProps } from "@mui/material";
import React from "react";

type RHInputProps = TextFieldProps & { control: Control<any> };
type RHSelectProps = SelectProps & { control: Control<any> };

export const RHInput: React.FC<RHInputProps> = ({ control, ...rest }) => {
  return (
    <Controller
      name={rest.name || ""}
      control={control}
      render={({ field }) => (
        <TextField variant="standard" {...rest} {...field} />
      )}
    />
  );
};

export const RHSelect: React.FC<RHSelectProps> = ({ control, ...rest }) => {
  return (
    <Controller
      name={rest.name || ""}
      control={control}
      render={({ field }) => <Select {...rest} {...field} />}
    />
  );
};
