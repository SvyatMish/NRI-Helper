import { DocPage } from "./doc-page";
import { WaterdeepLogo } from "./waterdeep-logo";
import { WatchfullOrderHeader } from "./watchfull-order-header";

export const FourCoinsReport = () => {
  return (
    <>
      <DocPage>
        <WatchfullOrderHeader />
        <div className="h-full flex flex-col items-center justify-center space-y-3">
          <div className="text-center text-5xl">
            Доклад о ходе расследования
          </div>
          <div className="italic bold font-bold text-4xl">
            &laquo;Четыре медяка&raquo;
          </div>
          <div className="text-2xl">Ваджре Сафар от Барнибуса Бластвайнда</div>
          <div className="text-right">1-ое Алтуриака 1492</div>
        </div>
        <div className="h-200px flex flex-col items-center justify-center">
          <WaterdeepLogo />
        </div>
      </DocPage>
    </>
  );
};
