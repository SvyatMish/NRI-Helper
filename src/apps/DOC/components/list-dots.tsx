import { CustomComponent } from "../../../types";

export const ListDots: CustomComponent = ({ children, className }) => {
  return <ul className={`list-disc list-inside ${className}`}>{children}</ul>;
};
