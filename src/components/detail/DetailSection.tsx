import React, { VFC, useMemo, MouseEvent } from "react";
import { Pokemon } from "src/types/Pokemon";
import Arrow from "./Arrow";
import Background from "./Background";
import DetailContainer from "./DetailContainer";
import Chip from "../common/Chip";
import LayoutContainer from "./LayoutContainer";
import Sprite from "./Sprite";

type Props = {
  pokemon: Pokemon;
  onNextClick?: (event: MouseEvent) => void;
  onPrevClick?: (event: MouseEvent) => void;
};

const DetailSection: VFC<Props> = ({
  pokemon,
  onNextClick = () => {},
  onPrevClick = () => {},
}) => {
  const nameText = useMemo(() => {
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }, [pokemon]);
  const heightText = `${pokemon.height / 10}m`;
  const weightText = `${pokemon.weight / 10}kg`;

  return (
    <div className="relative w-full h-full flex justify-center">
      <Background />
      <LayoutContainer>
        <Arrow direction={"left"} onClick={onPrevClick} />
        <div className="relative w-full flex flex-col bg-white rounded-md h-80 gap-y-8 items-center">
          <Sprite url={pokemon.sprites.portrait} />
          <div className="mt-24 font-bold text-4xl text-teal-800/80 p-4">
            {nameText}
          </div>
          <div className="relative w-full grid grid-cols-3 justify-items-center items-center">
            <div className="flex flex-col items-center">
              <div className="font-bold text-xl text-teal-800/80">
                {weightText}
              </div>
              <div className="text-black/20 font-bold">WEIGHT</div>
            </div>
            <div className="border-l border-r gap-2 w-full h-full flex justify-center items-center">
              {pokemon.types.map((type, index) => (
                <Chip key={`${pokemon}-type-${index}`}>{type}</Chip>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-xl text-teal-800/80">
                {heightText}
              </div>
              <div className="text-black/20 font-bold">HEIGHT</div>
            </div>
          </div>
        </div>
        <Arrow direction={"right"} onClick={onNextClick} />
      </LayoutContainer>
    </div>
  );
};

export default DetailSection;
