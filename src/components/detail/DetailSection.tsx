import React, { VFC, useMemo, MouseEvent, Suspense } from "react";
import { Pokemon } from "src/types/Pokemon";
import Arrow from "./Arrow";
import Background from "./Background";
import Chip from "../common/Chip";
import LayoutContainer from "./LayoutContainer";
import Sprite from "./Sprite";
import LoadingOverlay from "../common/LoadingOverlay";

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
    <div className="relative flex justify-center w-full h-full">
      <Background />
      <LayoutContainer>
        <Arrow direction={"left"} onClick={onPrevClick} />
        <div className="relative flex flex-col items-center w-full bg-white rounded-md h-80 gap-y-8">
          <Suspense fallback={<LoadingOverlay />}>
            <Sprite key={pokemon.index} url={pokemon.sprites.portrait} />
          </Suspense>
          <div className="p-4 mt-24 text-4xl font-bold text-primary">
            {nameText}
          </div>
          <div className="relative grid items-center w-full grid-cols-3 justify-items-center">
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-primary">{weightText}</div>
              <div className="font-bold text-black/20">WEIGHT</div>
            </div>
            <div className="flex items-center justify-center w-full h-full gap-2 border-l border-r">
              {pokemon.types.map((type, index) => (
                <Chip key={`${pokemon}-type-${index}`}>{type}</Chip>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-primary">{heightText}</div>
              <div className="font-bold text-black/20">HEIGHT</div>
            </div>
          </div>
        </div>
        <Arrow direction={"right"} onClick={onNextClick} />
      </LayoutContainer>
    </div>
  );
};

export default DetailSection;
