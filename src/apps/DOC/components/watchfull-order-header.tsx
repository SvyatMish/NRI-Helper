import { Hr } from "../../../components/hr";

export const WatchfullOrderHeader = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-5">
      <div className="mb-9 mt-4 flex items-center justify-center w-[70%]">
        <img
          className="h-[100px] mr-9"
          src="https://lh4.googleusercontent.com/6FvKaHlLzL1pwoKhY0LnRhALsSDcVFjq48RjYSmREzTOOEqJl5_oV_6j9pypIeKLY_lTzOlsiFa7FLukeY4IGV8vvgrOlWp8H-doUHzzGztMWolQoN3qsmO7UOLoy60CfJg9kbsUpWsd2W_3q1gutF0"
          alt=""
        />
        <div className="text-4xl font-bold">
          Бдительный Орден Волшебников и Защитников
        </div>
      </div>
      <Hr className="w-[70%]" />
    </div>
  );
};
