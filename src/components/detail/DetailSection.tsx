import { VFC, useMemo, MouseEvent, Suspense } from "react";
import { Pokemon } from "src/types/Pokemon";
import Arrow from "./Arrow";
import Background from "./Background";
import Chip from "../common/Chip";
import LayoutContainer from "./LayoutContainer";
import Sprite from "./Sprite";
import LoadingOverlay from "../common/LoadingOverlay";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { ErrorBoundary } from "react-error-boundary";
import DetailContainer from "./DetailContainer";
import PropertyContainer from "./PropertyContainer";

// TODO 태그 정리 중

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
  // Texts
  const nameText = useMemo(() => {
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }, [pokemon]);
  const heightText = `${pokemon.height / 10}m`;
  const weightText = `${pokemon.weight / 10}kg`;

  // Media Query
  const isTablet = useMediaQuery("(min-width: 860px)");

  // Arrow components
  const [leftArrow, rightArrow] = useMemo(() => {
    return [
      <Arrow direction={"left"} onClick={onPrevClick} />,
      <Arrow direction={"right"} onClick={onNextClick} />,
    ];
  }, [onNextClick, onPrevClick]);

  return (
    <div className="relative flex justify-center w-full h-full overflow-hidden pt-12">
      <Background />
      <LayoutContainer isTablet={isTablet}>
        {/* Tablet Left Arrow */}
        {isTablet && leftArrow}

        <DetailContainer isTablet={isTablet}>
          {/* Arrows for mobile */}
          {!isTablet && (
            <div className="absolute flex gap-x-40 -bottom-20">
              {leftArrow}
              {rightArrow}
            </div>
          )}

          {/* Sprite */}
          <ErrorBoundary fallback={<div>Error occurred</div>}>
            <Suspense
              fallback={
                <div className="absolute -top-20">
                  <LoadingOverlay />
                </div>
              }
            >
              <Sprite key={pokemon.index} url={pokemon.sprites.portrait} />
            </Suspense>
          </ErrorBoundary>

          {/* Name */}
          <div className="p-4 mt-24 text-4xl font-bold text-primary">
            {nameText}
          </div>

          {/* Properties */}
          <PropertyContainer isTablet={isTablet}>
            <div
              className={`flex flex-col items-center ${
                isTablet ? "col-start-1 col-end-2" : "row-start-2 row-end-3"
              }`}
            >
              <div className="text-xl font-bold text-primary">{weightText}</div>
              <div className="font-bold text-black/20">WEIGHT</div>
            </div>
            <div
              className={`flex items-center justify-center w-full h-full gap-2   ${
                isTablet
                  ? "col-start-2 col-end-3 border-l border-r px-4"
                  : "row-start-1 row-end-2  pb-4"
              }`}
            >
              {pokemon.types.map((type, index) => (
                <Chip key={`${pokemon}-type-${index}`}>{type}</Chip>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-primary">{heightText}</div>
              <div className="font-bold text-black/20">HEIGHT</div>
            </div>
          </PropertyContainer>
        </DetailContainer>
        {/* Tablet Right Arrow */}
        {isTablet && rightArrow}
      </LayoutContainer>
    </div>
  );
};

export default DetailSection;
