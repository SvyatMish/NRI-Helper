import { poundsToKg } from "../utils";

export const MaxWeight: React.FC<{ strength: number }> = ({ strength }) => {
  const inPouns = 15 * strength;
  const inKg = poundsToKg(inPouns);
  return (
    <div>
      Макс. вес: {inKg}(кг), {inPouns}(фунты)
    </div>
  );
};
