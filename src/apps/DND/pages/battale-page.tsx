import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import { getFiles } from "../../../utils";
import { HeroForm } from "../components/hero-form";
import { NewCharacterButton } from "../components/new-character-button";

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
  const [npc, setNpc] = useState<{ fileName: string; data: any }[]>([]);

  const getHeroes = async () => {
    const response = await getFiles("heroes");
    setHeroes(response);
  };
  const getNpc = async () => {
    const response = await getFiles("npc");
    setNpc(response);
  };
  useEffect(() => {
    getHeroes();
    getNpc();
  }, []);
  return (
    <div className="grid w-full gap-4 grid-cols-3 max-h-screen h-screen p-1">
      <CollumnContainer classname="space-y-2">
        <Typography variant="h4">Герои</Typography>
        {heroes.map((hero) => {
          return (
            <HeroForm
              folder="heroes"
              minified
              key={hero.fileName}
              id={hero.fileName}
              initialValues={hero.data}
            />
          );
        })}
        <NewCharacterButton folder="heroes" />
      </CollumnContainer>
      <CollumnContainer>
        <Typography variant="h4">Бой</Typography>
      </CollumnContainer>
      <CollumnContainer classname="space-y-2">
        <Typography variant="h4">Нипы</Typography>
        {npc.map((hero) => {
          return (
            <HeroForm
              folder="npc"
              minified
              key={hero.fileName}
              id={hero.fileName}
              initialValues={hero.data}
            />
          );
        })}
        <NewCharacterButton folder="npc" />
      </CollumnContainer>
    </div>
  );
};
