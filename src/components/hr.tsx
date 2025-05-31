import { FC } from "react";

import { CustomComponent } from "../types";

export const Hr: FC<CustomComponent> = ({ className }) => {
  return <img className={className} src="/svg/horizontal-rule.svg" alt="" />;
};
