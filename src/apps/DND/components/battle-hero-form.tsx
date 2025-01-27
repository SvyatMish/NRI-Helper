import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { HeroFormProps, HeroForm } from "./hero-form";
import { RHInput } from "../../../components/inputs";

interface Props extends HeroFormProps {
  onChangeInitiative(_: number): void;
  initiative?: number;
}

interface Values {
  initiative?: number;
}

export const BattleHeroForm: React.FC<Props> = ({
  onChangeInitiative,
  ...props
}) => {
  const { handleSubmit, control } = useForm<Values>({
    defaultValues: { initiative: props.initiative },
  });
  const onSubmit = (v: Values) => {
    onChangeInitiative(v.initiative || 0);
  };
  return (
    <div>
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <RHInput
          control={control}
          name="initiative"
          label="Инициатива"
          type="number"
        />
        <Button type="submit">Поменять</Button>
      </form>
      {/*@ts-expect-error because ts is stupid */}
      <HeroForm minified {...props} />
    </div>
  );
};
