import { CustomComponent } from "../types";

export const Hr: CustomComponent = ({ className }) => {
  return <img className={className} src="/svg/horizontal-rule.svg" alt="" />;
};
