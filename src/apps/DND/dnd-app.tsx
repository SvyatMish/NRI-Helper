import { useEffect } from "react";

import { changeFavicon } from "../../utils";
import { BattalePage } from "./pages/battale-page";

const setupHeader = () => {
  document.title = "DND helper";
  changeFavicon("/Dice_d20.svg");
};

export const DNDapp = () => {
  useEffect(() => {
    setupHeader();
  }, []);
  return <BattalePage />;
};
