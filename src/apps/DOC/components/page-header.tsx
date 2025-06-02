import { CustomComponent } from "../../../types";

export const PageHeader: CustomComponent = ({ children }) => {
  return (
    <div className="mb-6 mt-6">
      <div className="text-4xl font-bold">{children}</div>
    </div>
  );
};
