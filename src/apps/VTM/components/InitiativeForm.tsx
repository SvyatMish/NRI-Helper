import { useState } from "react";
import { Button, Typography, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { RHInput, RHSelect } from "../../../components/inputs.tsx";
import { rollMultiple } from "../utils/roll.ts";

type HpType =
  | "Здоров"
  | "Пустяк"
  | "Боль (-1)"
  | "Легкие травмы (-1)"
  | "Средние травмы (-2)"
  | "Тяжелые травмы (-2)"
  | "Увечья (-5)"
  | "Нокаут";

const hpTypes: HpType[] = [
  "Здоров",
  "Пустяк",
  "Боль (-1)",
  "Легкие травмы (-1)",
  "Средние травмы (-2)",
  "Тяжелые травмы (-2)",
  "Увечья (-5)",
  "Нокаут",
];

interface Actor {
  name: string;
  bonus: number;
  initiative: number;
  roll?: number;
  hp: HpType;
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
  const { control, handleSubmit, setValue } = useForm<FormValues>();

  const [actors, setActors] = useState<Actor[]>([]);

  const onSubmit = (data: FormValues) => {
    const newActors = Object.keys(data).map((name) => {
      const actor = data[name];
      const bonus = actor.bonus || 0;
      const roll = rollMultiple(1)[0];
      const initiative = +roll + +bonus;
      return { name, bonus, initiative, roll, hp: actor.hp };
    });
    const sorted = newActors.sort((a, b) => b.initiative - a.initiative);
    const filtered = sorted.filter(
      (i) => !!actors.find((a) => a.name === i.name),
    );
    setActors(filtered);
  };

  const handleNewActor = ({ newName }: NewActorFormValues) => {
    if (newName && !actors.find((i) => i.name === newName)) {
      const newActor: Actor = {
        name: newName,
        bonus: 0,
        initiative: 0,
        hp: "Здоров",
      };
      setActors((actors) => [{ ...newActor }, ...actors]);
      setValue(newName, { ...newActor });
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
              <div className="flex items-end space-x-2">
                <Typography variant="h6">{actor.name}</Typography>
                <div className="max-w-[40px]">
                  <RHInput
                    label="Бонус"
                    control={control}
                    name={`${actor.name}.bonus`}
                  />
                </div>
                <div className="">
                  <RHSelect
                    variant="standard"
                    name={`${actor.name}.hp`}
                    control={control}
                    labelId={actor.name + "Здоровье"}
                  >
                    {hpTypes.map((hp) => (
                      <MenuItem key={hp} value={hp}>
                        {hp}
                      </MenuItem>
                    ))}
                  </RHSelect>
                </div>
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
