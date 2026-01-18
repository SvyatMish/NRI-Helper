import React from "react";
import { Typography } from "@mui/material";
import { RollForm } from "../components/RollForm";
import { InitiativeForm } from "../components/InitiativeForm";

export const RollPage: React.FC = () => {
  return (
    <div className="box-border grid grid-cols-[1fr_1fr]">
      <div className="min-w-full p-6 box-border h-screen overflow-hidden flex flex-col">
        <Typography className="mb-10" variant="h3">
          Роличная
        </Typography>
        <RollForm
          initialValues={{
            difficulty: 6,
            difficultyAgainst: 6,
            damageDifficulty: 6,
            defDifficulty: 6,
          }}
        />
      </div>
      <div className="min-w-full p-6 box-border h-screen overflow-hidden flex flex-col">
        <Typography className="mb-10" variant="h3">
          Инициатива
        </Typography>
        <InitiativeForm />
      </div>
    </div>
  );
};
