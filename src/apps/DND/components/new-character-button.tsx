import { useState } from "react";
import { Button } from "@mui/material";

import { HeroForm } from "./hero-form";

export const NewCharacterButton: React.FC<{
  folder: "heroes" | "npc";
}> = ({ folder }) => {
  const [isCreation, setIsCreation] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setIsCreation((bool) => !bool);
        }}
      >
        Создать нового
      </Button>
      {isCreation && <HeroForm folder={folder} minified={false} />}
    </div>
  );
};
