import DetailSection from "../components/detail/DetailSection";
import ListSection from "../components/list/ListSection";
import { MouseEvent, useEffect } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useStore } from "../stores/Store";
import { usePokemonData } from "src/hooks/usePokemonData";
import LoadingOverlay from "src/components/common/LoadingOverlay";

const threshold = 5;

type Props = {};
const PokedexPage = (props: Props) => {
  const curIndex = useStore((state) => state.currentIndex);
  const updateIndex = useStore((state) => state.updateIndex);
  const matches = useMediaQuery("(min-width: 900px)");

  const { pokemons, hasNextPage, fetchNextPage, lastIndex, isFetching } =
    usePokemonData();

  async function handleOnNextClick(event: MouseEvent) {
    if (curIndex === lastIndex || isFetching)
      return console.log("Currently Fetching");
    if (pokemons.length - curIndex - 1 < threshold && hasNextPage)
      await fetchNextPage();
    updateIndex(curIndex + 1);
  }

  function handleOnPrevClick(event: MouseEvent) {
    if (curIndex - 1 < 0) return;
    updateIndex(curIndex - 1);
  }

  function handleOnItemClick(index: number) {
    updateIndex(index);
  }

  function handleOnEndReached() {
    if (hasNextPage) fetchNextPage();
  }

  return (
    <div
      className={`absolute inset-0 grid grid-flow-row bg-gradient-to-tl from-lime-200 to-teal-200 ${
        matches ? "grid-cols-tablet" : "grid-cols-mobile"
      }`}
    >
      {matches && (
        <ListSection
          currentIndex={curIndex}
          pokemons={pokemons}
          onItemClick={handleOnItemClick}
          onEndReached={handleOnEndReached}
        />
      )}
      <DetailSection
        pokemon={pokemons[curIndex]}
        onNextClick={handleOnNextClick}
        onPrevClick={handleOnPrevClick}
      />

      {/* <button
        onClick={() => {
          if (hasNextPage) fetchNextPage();
        }}
      >
        Next Page
      </button>
      <p>{hasNextPage ? "Yes" : "No"}</p> */}
    </div>
  );
};

export default PokedexPage;
