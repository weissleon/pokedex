import DetailSection from "../components/detail/DetailSection";
import ListSection from "../components/list/ListSection";
import { MouseEvent, useEffect, useCallback, useRef } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useStore } from "../stores/Store";
import { usePokemonData } from "src/hooks/usePokemonData";
import DrawerToggle from "src/components/common/DrawerToggle";
import { useNavigate, useSearchParams } from "react-router-dom";
import gsap from "gsap";

const threshold = 5;

type Props = {};
const PokedexPage = (props: Props) => {
  const curIndex = useStore((state) => state.currentIndex);
  const updateIndex = useStore((state) => state.updateIndex);
  const matches = useMediaQuery("(min-width: 1240px)");
  const drawerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  let isDrawerOpen = params.get("drawer") && params.get("drawer") === "true";

  const { pokemons, hasNextPage, fetchNextPage, lastIndex, isFetching } =
    usePokemonData();

  async function handleOnNextClick(event: MouseEvent) {
    if (curIndex === lastIndex) return;
    if (
      pokemons.length - curIndex - 1 < threshold &&
      hasNextPage &&
      !isFetching
    )
      await fetchNextPage();
    if (pokemons.length - 1 !== curIndex) updateIndex(curIndex + 1);
  }

  function handleOnPrevClick(event: MouseEvent) {
    if (curIndex - 1 < 0) return;
    updateIndex(curIndex - 1);
  }

  const handleOnItemClick = useCallback(
    (index: number) => {
      if (isDrawerOpen && !matches) {
        const drawer = drawerRef.current!.firstElementChild;
        if (!drawer) return;
        gsap.to(drawerRef.current, { x: drawer.clientWidth * -1 });
        navigate(-1);
      }
      updateIndex(index);
    },
    [updateIndex, navigate, isDrawerOpen, matches]
  );

  useEffect(() => {
    if (!isDrawerOpen && !matches) {
      const drawer = drawerRef.current!.firstElementChild;
      if (!drawer) return;
      gsap.to(drawerRef.current, { x: drawer.clientWidth * -1 });
    }

    if (isDrawerOpen && !matches) {
      const drawer = drawerRef.current!.firstElementChild;
      if (!drawer) return;
      gsap.to(drawerRef.current, { x: 0 });
    }

    if (matches) {
      const drawer = drawerRef.current!.firstElementChild;
      if (!drawer) return;
      gsap.to(drawerRef.current, { x: 0 });
    }
    return () => {};
  }, [matches, navigate, isDrawerOpen]);

  const handleOnToggleClick = useCallback(() => {
    if (!drawerRef.current) return;
    if (!isDrawerOpen) {
      gsap.to(drawerRef.current, { x: 0 });
      navigate(`?drawer=true`);
    }
    if (isDrawerOpen) {
      const drawer = drawerRef.current.firstElementChild;
      if (!drawer) return;
      gsap.to(drawerRef.current, { x: drawer.clientWidth * -1 });
      navigate(-1);
    }
  }, [isDrawerOpen, navigate]);

  const handleOnEndReached = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div
      className={`absolute inset-0 grid grid-flow-row overflow-hidden bg-gradient-to-tl from-lime-200 to-teal-200 ${
        matches ? "grid-cols-tablet" : "grid-cols-mobile "
      }`}
    >
      <div
        ref={drawerRef}
        className={`${
          !matches ? "absolute z-20 pr-10" : "relative col-start-1 col-end-2"
        }  flex items-start min-w-[300px] w-full max-w-[488px] h-full`}
      >
        <ListSection
          isTablet={matches}
          currentIndex={curIndex}
          pokemons={pokemons}
          onItemClick={handleOnItemClick}
          onEndReached={handleOnEndReached}
        />

        {!matches && <DrawerToggle onClick={handleOnToggleClick} />}
      </div>

      <DetailSection
        pokemon={pokemons[curIndex]}
        onNextClick={handleOnNextClick}
        onPrevClick={handleOnPrevClick}
      />
    </div>
  );
};

export default PokedexPage;
