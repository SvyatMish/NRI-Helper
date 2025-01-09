import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";

import { RHInput } from "../../../components/inputs.tsx";

import { saveFile } from "../../../utils/files.ts";

interface Values {
  name?: string;
}

export const HeroForm: React.FC<{ initialValues?: Values }> = ({
  initialValues,
}) => {
  const { control, handleSubmit, watch } = useForm<Values>({
    defaultValues: initialValues,
  });

  const onSubmit = async (data: Values) => {
    if (!data.name) {
      alert("no name retard");
    }
    await saveFile({ fileName: `${data.name}.json`, folder: "heroes", data });
  };

  const name = watch("name");

  return (
    <div>
      <Typography className="mb-" variant="h4">
        {name}
      </Typography>
      <form className="flex items-end w-fit" onSubmit={handleSubmit(onSubmit)}>
        <RHInput name="name" control={control} label="Имя персонажа" />
        <Button type="submit">Сохранить</Button>
      </form>
    </div>
  );
};
