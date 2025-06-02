import { CustomComponent } from "../../../types";

export const PageParagraph: CustomComponent = ({ children }) => {
  return <div className="indent-8 text-xl">{children}</div>;
};
