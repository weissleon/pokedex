import React, { VFC, useMemo, useRef, useEffect } from "react";
import { useColor } from "src/hooks/useColor";
import { Pokemon } from "src/types/Pokemon";

type Props = {
  pokemon: Pokemon;
  onClick?: (index: number) => void;
  isSelected?: boolean;
};

const Item: VFC<Props> = ({
  pokemon,
  onClick = () => {},
  isSelected = false,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  function handleOnClick() {
    onClick(pokemon.index - 1);
  }

  useEffect(() => {
    if (!itemRef.current) return;
    if (isSelected)
      itemRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    return () => {};
  }, [isSelected]);

  const nameText = useMemo(() => {
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }, [pokemon]);

  const color = useColor(
    pokemon.types.length > 1 ? pokemon.types : pokemon.types[0],
    pokemon.types.length > 1
  );

  return (
    <div
      ref={itemRef}
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

      <div className="relative px-4 py-4 w-full grid grid-cols-[auto auto 1fr auto] justify-items-center items-center">
        <span className="col-start-1 col-end-2 font-bold text-teal-800/80">
          {pokemon.index}
        </span>
        <img
          className="col-start-2 col-end-3 "
          src={pokemon.sprites.icon}
          style={{
            maxWidth: 60,
            maxHeight: 60,
            imageRendering: "pixelated",
          }}
          alt="icon"
        />
        <span className="col-start-3 col-end-4 font-bold text-teal-800/80">
          {nameText}
        </span>
        <span
          className={`col-start-4 col-end-5 w-4 h-4 ${color} rounded-full`}
        ></span>
      </div>
    </div>
  );
};

export default Item;
