import { RollForm } from "./components/RollForm";
import { FormulaList } from "./components/FormulaList";
import { useEffect } from "react";

import { changeFavicon } from "../../utils";

const setupHeader = () => {
  document.title = "VtM helper";
  changeFavicon("/Camarilla_Logo.svg");
};

export const VTMapp = () => {
  useEffect(() => {
    setupHeader();
  }, []);
  return (
    <main className="box-border grid grid-cols-[1fr_1fr] gap-8">
      <RollForm initialValues={{ difficulty: 6 }} />
      <FormulaList />
    </main>
  );
};
