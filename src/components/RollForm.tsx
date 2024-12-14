import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";

import { RHInput } from "./inputs.tsx";
import React, { useState } from "react";
import { RollResultType } from "../types";
import { RollResult } from "./RollResult.tsx";
import { roll } from "../utils";

interface Values {
  rollAmount?: number;
  difficulty?: number;
}

export const RollForm: React.FC<{ initialValues?: Values }> = ({
  initialValues,
}) => {
  const [results, setResults] = useState<RollResultType[]>([]);
  const { control, handleSubmit } = useForm<Values>({
    defaultValues: initialValues,
  });

  const onSubmit = (data: Values) => {
    if (!data.rollAmount || !data.difficulty) {
      return;
    }
    setResults((prev) => [roll(data.rollAmount!, data.difficulty), ...prev]);
  };

  const onClear = () => {
    setResults([]);
  };

  return (
    <div className="min-w-full p-6 box-border h-screen overflow-hidden flex flex-col">
      <Typography className="mb-10" variant="h3">
        Роличная
      </Typography>
      <form className="flex items-end w-fit" onSubmit={handleSubmit(onSubmit)}>
        <RHInput name="rollAmount" control={control} label="Сколько роллить" />
        <RHInput name="difficulty" control={control} label="Сложность" />
        <Button type="submit">Ролл</Button>
        <Button onClick={onClear}>Очистить результат</Button>
      </form>
      <div className="flex-1 overflow-auto max-w-[640px]">
        {results.map((result, index) => (
          <RollResult result={result} key={index} />
        ))}
      </div>
    </div>
  );
};
