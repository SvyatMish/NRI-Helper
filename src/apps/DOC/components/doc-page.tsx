import { ParchmentContainer } from "../../../components/ParchmentContainer";
import { CustomComponent } from "../../../types";

export const DocPage: CustomComponent = ({ children, className }) => {
  return (
    <ParchmentContainer
      className={`flex flex-col h-[297mm] max-h-[297mm] w-[210mm] max-w-[210mm] ml-auto mr-auto kereru p-5 ${className}`}
    >
      {children}
    </ParchmentContainer>
  );
};
