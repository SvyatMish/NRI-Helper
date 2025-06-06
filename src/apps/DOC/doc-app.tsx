import { changeFavicon } from "../../utils";
import { useEffect } from "react";
// import { FourCoinsReport } from "./docs/four-coins-report";
import { FourCoinsReportNew } from "./docs/four-coins-report-new";

const setupHeader = () => {
  document.title = "DOC helper";
  changeFavicon("/Dice_d20.svg");
};

export const DocApp = () => {
  useEffect(() => {
    setupHeader();
  }, []);
  return <FourCoinsReportNew />;
};
