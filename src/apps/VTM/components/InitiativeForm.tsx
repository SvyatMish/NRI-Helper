import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { RHInput } from "../../../components/inputs.tsx";
import { rollMultiple } from "../utils/roll.ts";

interface Actor {
  name: string;
  bonus: number;
  initiative: number;
  roll?: number;
}

interface FormValues {
  [key: string]: Actor;
}

export const InitiativeForm = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const [newName, setNewName] = useState<string>("");

  const [actors, setActors] = useState<Actor[]>([]);

  const onSubmit = (data: FormValues) => {
    const newActors = Object.keys(data).map((name) => {
      const bonus = data[name].bonus || 0;
      const roll = rollMultiple(1)[0];
      const initiative = +roll + +bonus;
      return { name, bonus, initiative, roll };
    });
    const sorted = newActors.sort((a, b) => a.initiative - b.initiative);
    const filtered = sorted.filter(
      (i) => !!actors.find((a) => a.name === i.name),
    );
    setActors(filtered);
  };
  return (
    <div>
      <div className="flex space-x-2 items-baseline">
        <TextField
          variant="standard"
          name="newName"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <Button
          type="button"
          onClick={() => {
            if (newName && !actors.find((i) => i.name === newName)) {
              setActors((actors) => [
                { name: newName, bonus: 0, initiative: 0 },
                ...actors,
              ]);
            }
          }}
        >
          Add actor
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit">Roll!</Button>
        {actors.map((actor, index) => {
          return (
            <div
              className="flex justify-between items-center border p-2 rounded"
              key={actor.name + index + actor.bonus}
            >
              <div className="flex items-baseline space-x-2">
                <Typography variant="h6">{actor.name}</Typography>
                <RHInput
                  label="Бонус"
                  control={control}
                  name={`${actor.name}.bonus`}
                />
                {actor.roll && <div>ролл: {actor.roll}</div>}
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-8">{actor.initiative.toString()}</div>
                <Button
                  onClick={() => {
                    setActors((actors) =>
                      actors.filter((i) => i.name !== actor.name),
                    );
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
};
