import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import { getFiles } from "../../../utils";
import { HeroForm } from "../components/hero-form";

const CollumnContainer: React.FC<{
  children: React.ReactNode;
  classname?: string;
}> = ({ children, classname }) => {
  return (
    <div
      className={`p-3 border rounded h-full w-full overflow-auto ${classname} border-[#3b3534]`}
    >
      {children}
    </div>
  );
};

export const BattalePage: React.FC = () => {
  const [heroes, setHeroes] = useState<{ fileName: string; data: any }[]>([]);
  const getHeroes = async () => {
    const response = await getFiles("heroes");
    setHeroes(response);
  };
  useEffect(() => {
    getHeroes();
  }, []);
  return (
    <div className="grid w-full gap-4 grid-cols-3 max-h-screen h-screen p-1">
      <CollumnContainer classname="space-y-2">
        <Typography variant="h4">Герои</Typography>
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
      </CollumnContainer>
    </div>
  );
};
