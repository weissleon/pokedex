import DetailSection from "../components/detail/DetailSection";
import ListSection from "../components/list/ListSection";
import React, { MouseEvent, useEffect } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useInfiniteQuery, useQuery } from "react-query";
import axios from "axios";
import { Pokemon } from "../types/Pokemon";
import { useMemo } from "react";
import { useStore } from "../stores/Store";

type Props = {};

const limit = 500;
const initialOffset = 0;
const threshold = 5;
const lastIndex = 897;
const fetchPokemons = async ({
  pageParam = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${initialOffset}`,
}) => {
  const res = await axios.get(pageParam);
  const promiseArray = res.data.results.map((result: any) => {
    return axios
      .get(result.url)
      .then((res) => res.data)
      .then((data) => {
        const pokemon: Pokemon = {
          index: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          sprites: {
            icon: data.sprites["versions"]["generation-viii"]["icons"][
              "front_default"
            ],
            portrait:
              data.sprites["other"]["official-artwork"]["front_default"],
          },
          types: data.types.map((type: any) => type["type"].name),
        };
        return pokemon;
      });
  });
  const results = await Promise.all(promiseArray);
  return { next: res.data.next, results: results };
};

const PokedexPage = (props: Props) => {
  const curIndex = useStore((state) => state.currentIndex);
  const updateIndex = useStore((state) => state.updateIndex);
  const matches = useMediaQuery("(min-width: 900px)");

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["pokemons"],
    fetchPokemons,
    {
      getNextPageParam: (lastPage, pages) => {
        const startIndex = lastPage.next.indexOf("offset=") + "offset=".length;
        const endIndex = lastPage.next.indexOf("&");
        const nextOffset = parseInt(
          lastPage.next.substring(startIndex, endIndex)
        );

        if (nextOffset > lastIndex) return undefined;

        if (nextOffset + limit > lastIndex) {
          const newNext = lastPage.next.replace(
            /limit=\d+/,
            `limit=${lastIndex - nextOffset + 1}`
          );
          return newNext;
        }

        return lastPage.next;
      },
      staleTime: Infinity,
    }
  );

  const pokemons = useMemo(() => {
    const pokemons: Pokemon[] = [];
    data?.pages.forEach((page) => {
      pokemons.push(...(page.results as Pokemon[]));
    });
    return pokemons;
  }, [data]);

  async function handleOnNextClick(event: MouseEvent) {
    event.preventDefault();
    if (curIndex === lastIndex) return;
    if (pokemons.length - curIndex - 1 < threshold && hasNextPage)
      await fetchNextPage();
    updateIndex(curIndex + 1);
  }

  function handleOnPrevClick(event: MouseEvent) {
    event.preventDefault();
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
      className={`absolute inset-0 grid grid-flow-row ${
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
