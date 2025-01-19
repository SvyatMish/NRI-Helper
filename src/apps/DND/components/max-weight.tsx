import { poundsToKg } from "../utils";

export const MaxWeight: React.FC<{ strength: number }> = ({ strength }) => {
  const inPouns = 15 * strength;
  const inKg = Math.floor(poundsToKg(inPouns));
  return (
    <div>
      Макс. вес: {inKg}(кг), {inPouns}(фунты)
    </div>
  );
};
