import { DocPage } from "./components/doc-page";

import { Hr } from "../../components/hr";
import { changeFavicon } from "../../utils";
import { useEffect } from "react";

const setupHeader = () => {
  document.title = "DOC helper";
  changeFavicon("/Dice_d20.svg");
};

export const DocApp = () => {
  useEffect(() => {
    setupHeader();
  }, []);
  return (
    <>
      <DocPage>
        123123 Здарова Бродяга
        <Hr></Hr>
      </DocPage>
      <DocPage> 123123 Здарова Бродяга</DocPage>
      <DocPage> 123123 Здарова Бродяга</DocPage>
    </>
  );
};
