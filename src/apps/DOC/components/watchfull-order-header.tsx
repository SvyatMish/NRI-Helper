import { Hr } from "../../../components/hr";

export const WatchfullOrderHeader = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-5">
      <div className="mb-2 mt-4 flex items-center justify-center w-[70%]">
        <img className="h-[100px] mr-9" src="wizard-order.png" alt="" />
        <div className="text-4xl font-bold">
          Бдительный Орден Волшебников и Защитников
        </div>
      </div>
      <Hr className="w-[70%]" />
    </div>
  );
};
