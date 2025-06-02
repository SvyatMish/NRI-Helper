import { changeFavicon } from "../../utils";
import { useEffect } from "react";
import { FourCoinsReport } from "./docs/four-coins-report";

const setupHeader = () => {
  document.title = "DOC helper";
  changeFavicon("/Dice_d20.svg");
};

export const DocApp = () => {
  useEffect(() => {
    setupHeader();
  }, []);
  return <FourCoinsReport />;
};
