import { useEffect, useState } from "react";

import { getFiles } from "../../utils";

export const DNDapp = () => {
  const [heroes, setHeroes] = useState<{ name: string; data: any }[]>([]);
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
          <div>
            Имя: {hero.name}, Инфа: {JSON.stringify(hero.data)}
          </div>
        );
      })}
    </div>
  );
};
