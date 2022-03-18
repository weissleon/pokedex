import { VFC, useState, useCallback } from "react";
import { useQuery } from "react-query";
import useSWR from "swr";

import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

function getPokemon(index: number) {
  const call = axios.create({
    baseURL: `https://pokeapi.co/api/v2/pokemon/${index}`,
  });

  call.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.data) {
        err.message = err.response.data;
      }
      return Promise.reject(err);
    }
  );
  return call
    .get(`https://pokeapi.co/api/v2/pokemon/${index}`)
    .then((res) => res.data);
}

async function getImage(url: string) {
  return fetch(url)
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob));
}

type Props = { index: number };
const PokemonCard: VFC<Props> = ({ index }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const fetchPokemon = () => getPokemon(index);
  // let { data } = useQuery([`pokemon`, index], fetchPokemon);
  let { data } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${index}`,
    fetchPokemon,
    { suspense: true }
  );

  const fetchFrontImage = () =>
    getImage(
      data.sprites["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ]
    );
  const fetchBackImage = () =>
    getImage(
      data.sprites["versions"]["generation-v"]["black-white"]["animated"][
        "back_default"
      ]
    );

  const { data: frontImage } = useQuery(
    [`pokemon`, index, "front"],
    fetchFrontImage
  );

  const { data: backImage } = useQuery(
    [`pokemon`, index, "back"],
    fetchBackImage
  );

  function handleOnMouseEnter() {
    setIsHover(true);
  }

  function handleOnMouseLeave() {
    setIsHover(false);
  }

  return (
    <motion.div
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-w-[120px] min-h-[148px] p-4 bg-white shadow-sm rounded-lg"
    >
      <AnimatePresence>
        <motion.div
          className="absolute inset-0 flex flex-col  justify-center items-center"
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-[100px] h-[100px] flex justify-center items-center">
            {!isHover ? (
              <img
                src={frontImage}
                style={{ maxWidth: 100, maxHeight: 100, objectFit: "contain" }}
                alt="pokemon-front"
              />
            ) : (
              <img
                src={backImage}
                style={{ maxWidth: 100, maxHeight: 100, objectFit: "contain" }}
                alt="pokemon-front"
              />
            )}
          </div>
          <p>{data.name}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default PokemonCard;
