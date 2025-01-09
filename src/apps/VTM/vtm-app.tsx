import { RollForm } from "./components/RollForm";
import { FormulaList } from "./components/FormulaList";

export const VTMapp = () => {
  return (
    <main className="box-border grid grid-cols-[1fr_1fr] gap-8">
      <RollForm initialValues={{ difficulty: 6 }} />
      <FormulaList />
    </main>
  );
};
