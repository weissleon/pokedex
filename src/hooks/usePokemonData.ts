import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useMemo } from "react";
import type { Pokemon } from "src/types/Pokemon";

const limit = 20;
const initialOffset = 0;
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
        const pokemon = {
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

export function usePokemonData() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
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

  return { pokemons, hasNextPage, fetchNextPage, lastIndex, isFetching };
}
