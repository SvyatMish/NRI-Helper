import { Control, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type RHInputProps = TextFieldProps & { control: Control<any> };

export const RHInput: React.FC<RHInputProps> = ({ control, ...rest }) => {
  return <Controller
    name={rest.name || ""}
    control={control}
    render={({ field }) => <TextField {...rest} {...field} />}
  />;

};