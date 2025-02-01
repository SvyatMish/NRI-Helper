import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import { getFiles } from "../../../utils";
import { HeroForm } from "../components/hero-form";
import { BattleHeroForm } from "../components/battle-hero-form";
import { NewCharacterButton } from "../components/new-character-button";
import { BattleCharacter, ListCharacter } from "../types";

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
  const [heroes, setHeroes] = useState<ListCharacter[]>([]);
  const [npc, setNpc] = useState<ListCharacter[]>([]);
  const [battle, setBattle] = useState<BattleCharacter[]>([]);

  const toBattle = (data: BattleCharacter) => {
    setBattle((current) => [...current, { ...data }]);
  };

  const getHeroes = async () => {
    const response = await getFiles("heroes");
    setHeroes(response);
  };
  const getNpc = async () => {
    const response = await getFiles("npc");
    setNpc(response);
  };
  const handleChangeInitiative = (index: number, newInitiative: number) => {
    setBattle((current) => {
      const newitem = current[index];
      newitem.initiative = +newInitiative;
      current.splice(index, 1, newitem);
      return [...current];
    });
  };
  useEffect(() => {
    getHeroes();
    getNpc();
  }, []);
  return (
    <div className="grid w-full gap-4 grid-cols-3 max-h-screen h-screen p-1">
      <CollumnContainer classname="space-y-2">
        <Typography variant="h4">Герои</Typography>
        {heroes.map((hero, index) => {
          return (
            <div key={hero.fileName + index} className="flex items-center">
              <HeroForm
                folder="heroes"
                minified
                id={hero.fileName}
                initialValues={hero.data}
                toBattle={toBattle}
              />
            </div>
          );
        })}
        <NewCharacterButton folder="heroes" />
      </CollumnContainer>
      <CollumnContainer classname="space-y-2">
        <Typography variant="h4">Бой</Typography>
        {battle
          .sort((el1, el2) => (el2.initiative || 0) - (el1.initiative || 0))
          .map((hero, index) => {
            return (
              <BattleHeroForm
                key={hero.fileName + index}
                onChangeInitiative={(newInitiative) => {
                  handleChangeInitiative(index, newInitiative);
                }}
                initiative={hero.initiative}
                folder={hero.folder}
                minified
                id={hero.fileName}
                initialValues={hero.data}
              />
            );
          })}
      </CollumnContainer>
      <CollumnContainer classname="space-y-2">
        <Typography variant="h4">Нипы</Typography>
        {npc.map((hero, index) => {
          return (
            <div key={hero.fileName + index} className="flex items-center">
              <HeroForm
                folder="npc"
                minified
                id={hero.fileName}
                initialValues={hero.data}
                toBattle={toBattle}
              />
            </div>
          );
        })}
        <NewCharacterButton folder="npc" />
      </CollumnContainer>
    </div>
  );
};
