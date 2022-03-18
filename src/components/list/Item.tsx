import React, {
  VFC,
  useMemo,
  useRef,
  useEffect,
  forwardRef,
  Suspense,
} from "react";
import { useColor } from "src/hooks/useColor";
import { useImageRes } from "src/hooks/useImageRes";
import { Pokemon } from "src/types/Pokemon";
import Sprite from "./Sprite";

type Props = {
  pokemon: Pokemon;
  onClick?: (index: number) => void;
  isSelected?: boolean;
};

const Item = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { pokemon, onClick = () => {}, isSelected = false } = props;

  function handleOnClick() {
    onClick(pokemon.index - 1);
  }

  const nameText = useMemo(() => {
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }, [pokemon]);

  const color = useColor(
    pokemon.types.length > 1 ? pokemon.types : pokemon.types[0],
    pokemon.types.length > 1
  );

  return (
    <div
      ref={ref}
      onClick={handleOnClick}
      className="relative w-full min-h-[84px] cursor-pointer"
    >
      <div
        className={`absolute inset-0 ${
          isSelected
            ? "bg-lime-400"
            : "bg-gradient-to-r from-white to-slate-100"
        } rounded-full`}
      />

      <div className="relative px-4 py-4 w-full grid grid-flow-col grid-cols-[auto auto 1fr auto] justify-items-center items-center">
        <span className="font-bold text-teal-800/80">{pokemon.index}</span>
        <Suspense fallback={<span>Loading...</span>}>
          <Sprite url={pokemon.sprites.icon} />
        </Suspense>
        <span className="font-bold text-teal-800/80">{nameText}</span>
        <span className={`w-4 h-4 ${color} rounded-full`}></span>
      </div>
    </div>
  );
});

Item.displayName = "Item";
export default Item;
