import { CustomComponent } from "../../../types";

export const Comment: CustomComponent = ({ children, className }) => {
  return <div className={`text-base italic m-5 ${className}`}>{children}</div>;
};
