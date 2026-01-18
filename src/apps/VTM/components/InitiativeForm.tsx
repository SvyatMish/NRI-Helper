import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { RHInput } from "../../../components/inputs.tsx";
import { rollMultiple } from "../utils/roll.ts";

interface Actor {
  name: string;
  bonus: number;
  initiative: number;
  roll?: number;
}

interface NewActorFormValues {
  newName: string;
}

const NewActorForm: React.FC<{
  onSubmit(data: NewActorFormValues): void;
}> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<NewActorFormValues>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex space-x-2 items-baseline"
    >
      <RHInput control={control} name="newName" />
      <Button type="submit">Add actor</Button>
    </form>
  );
};

interface FormValues {
  [key: string]: Actor;
}

export const InitiativeForm = () => {
  const { control, handleSubmit } = useForm<FormValues>();

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

  const handleNewActor = ({ newName }: NewActorFormValues) => {
    if (newName && !actors.find((i) => i.name === newName)) {
      setActors((actors) => [
        { name: newName, bonus: 0, initiative: 0 },
        ...actors,
      ]);
    }
  };
  return (
    <div>
      <NewActorForm onSubmit={handleNewActor} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full py-5 items-center justify-center">
          <Button className="w-full" size="large" type="submit">
            Roll!
          </Button>
        </div>
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
