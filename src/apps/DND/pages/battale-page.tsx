import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";

import { getFiles } from "../../../utils";
import { HeroForm } from "../components/hero-form";
import { NewCharacterButton } from "../components/new-character-button";
import { roll } from "../utils";
import { getAttributeBonus } from "../utils";
import { Character } from "../types";

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

interface BattleHero {
  fileName: string;
  data: Character;
  folder: "heroes" | "npc";
  initiative?: number;
}

export const BattalePage: React.FC = () => {
  const [heroes, setHeroes] = useState<{ fileName: string; data: any }[]>([]);
  const [npc, setNpc] = useState<{ fileName: string; data: any }[]>([]);
  const [battle, setBattle] = useState<BattleHero[]>([]);

  const toBattle = (data: BattleHero) => {
    setBattle((current) => [
      ...current,
      {
        ...data,
        initiative: roll() + getAttributeBonus(data.data.attributes?.dexterity),
      },
    ]);
  };

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
            <div className="flex items-center">
              <HeroForm
                folder="heroes"
                minified
                key={hero.fileName}
                id={hero.fileName}
                initialValues={hero.data}
              />
              <Button
                onClick={() => {
                  toBattle({ ...hero, folder: "heroes" });
                }}
              >
                {"->"}
              </Button>
            </div>
          );
        })}
        <NewCharacterButton folder="heroes" />
      </CollumnContainer>
      <CollumnContainer classname="space-y-2">
        <Typography variant="h4">Бой</Typography>
        {battle
          .sort((el1, el2) => (el2.initiative || 0) - (el1.initiative || 0))
          .map((hero) => {
            return (
              <div className="flex items-center">
                <div>{hero.initiative}</div>
                <HeroForm
                  folder={hero.folder}
                  minified
                  key={hero.fileName}
                  id={hero.fileName}
                  initialValues={hero.data}
                />
              </div>
            );
          })}
      </CollumnContainer>
      <CollumnContainer classname="space-y-2">
        <Typography variant="h4">Нипы</Typography>
        {npc.map((hero) => {
          return (
            <div className="flex items-center">
              <Button
                onClick={() => {
                  toBattle({ ...hero, folder: "npc" });
                }}
              >
                {"<-"}
              </Button>
              <HeroForm
                folder="npc"
                minified
                key={hero.fileName}
                id={hero.fileName}
                initialValues={hero.data}
              />
            </div>
          );
        })}
        <NewCharacterButton folder="npc" />
      </CollumnContainer>
    </div>
  );
};
