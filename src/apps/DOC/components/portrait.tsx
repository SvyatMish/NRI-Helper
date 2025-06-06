import { CustomComponent } from "../../../types";

export const Portrait: CustomComponent<{ src: string }> = ({ src }) => {
  return (
    <img
      className="float-right inline max-w-[450px] max-h-[300px]"
      src={src}
      alt="Portrait"
    />
  );
};
