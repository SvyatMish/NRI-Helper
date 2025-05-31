import { FC } from "react";

import { ParchmentContainer } from "../../../components/ParchmentContainer";
import { CustomComponent } from "../../../types";

export const DocPage: FC<CustomComponent> = ({ children, className }) => {
  return (
    <ParchmentContainer
      className={`h-[297mm] w-[210mm] ml-auto mr-auto kereru ${className}`}
    >
      {children}
    </ParchmentContainer>
  );
};
