import { RHInput } from "../../../components/inputs";
import { CharControl } from "../types";

export const HpBlock: React.FC<{
  control: CharControl;
  allHp: number;
  maxHp: number;
}> = ({ control, allHp, maxHp }) => {
  return (
    <div className="grid grid-cols-[60px_60px_60px_60px_60px] items-center">
      <RHInput type="number" name="hp.currentHp" control={control} label="ОЗ" />
      <RHInput
        type="number"
        name="hp.tempHp"
        control={control}
        label="Врем. ОЗ"
      />
      <RHInput
        type="number"
        name="hp.maxHp"
        control={control}
        label="Макс. ОЗ"
      />
      {allHp}/{maxHp}
      <RHInput type="number" name="AC" control={control} label="КБ" />
    </div>
  );
};
