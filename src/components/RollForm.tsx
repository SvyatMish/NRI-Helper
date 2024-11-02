import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { RHInput } from "./inputs.tsx";
import { useState } from "react";
import { RollResultType } from "../types";
import { RollResult } from "./RollResult.tsx";
import { roll } from "../utils";

interface Values {
  rollAmount: number;
  difficulty?: number;
}

export const RollForm = () => {
  const [results, setResults] = useState<RollResultType[]>([]);
  const { control, handleSubmit } = useForm<Values>();
  const onSubmit = (data: Values) => {
    setResults((prev) => [roll(data.rollAmount, data.difficulty), ...prev]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHInput variant="filled" name="rollAmount" control={control} label="Сколько роллить" />
        <RHInput variant="filled" name="difficulty" control={control} label="Сложность" />
        <Button type="submit">Ролл</Button>
        <Button>Очистить результат</Button>
      </form>
      {results.map((result, index) => <RollResult result={result} key={index} />)}
    </>

  );
};