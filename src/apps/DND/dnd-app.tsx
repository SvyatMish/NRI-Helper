import { useEffect, useState } from "react";

import { getFiles, changeFavicon } from "../../utils";
import { HeroForm } from "./components/hero-form";

const setupHeader = () => {
  document.title = "DND helper";
  changeFavicon("/Dice_d20.svg");
};

export const DNDapp = () => {
  const [heroes, setHeroes] = useState<{ fileName: string; data: any }[]>([]);
  const getHeroes = async () => {
    const response = await getFiles("heroes");
    setHeroes(response);
  };
  useEffect(() => {
    setupHeader();
    getHeroes();
  }, []);
  return (
    <div>
      {heroes.map((hero) => {
        return (
          <HeroForm
            minified
            key={hero.fileName}
            id={hero.fileName}
            initialValues={hero.data}
          />
        );
      })}
    </div>
  );
};
