import { useEffect, useState } from "react";

import { getFiles } from "../../utils";
import { HeroForm } from "./components/hero-form";

export const DNDapp = () => {
  const [heroes, setHeroes] = useState<{ fileName: string; data: any }[]>([]);
  const getHeroes = async () => {
    const response = await getFiles("heroes");
    setHeroes(response);
  };
  useEffect(() => {
    getHeroes();
  }, []);
  return (
    <div>
      {heroes.map((hero) => {
        return (
          <HeroForm
            key={hero.fileName}
            initialValues={{ name: hero.data.name }}
          />
        );
      })}
    </div>
  );
};
