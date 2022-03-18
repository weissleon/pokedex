import { VFC } from "react";
import { Pokemon } from "../..//types/Pokemon";
import Background from "./Background";
import Container from "./Container";
import Item from "./Item";

type Props = {
  pokemons: Pokemon[];
  onItemClick?: (index: number) => void;
  onEndReached?: () => void;
  currentIndex: number;
};

const ListSection: VFC<Props> = ({
  pokemons,
  onItemClick = () => {},
  onEndReached = () => {},
  currentIndex,
}) => {
  function handleOnItemClick(index: number) {
    onItemClick(index);
  }

  return (
    <div className="relative w-full h-full">
      <Background />
      <Container onEndReached={onEndReached}>
        {pokemons.map((pokemon, index) => (
          <Item
            key={pokemon.index}
            pokemon={pokemon}
            onClick={handleOnItemClick}
            isSelected={currentIndex === index}
          />
        ))}
      </Container>
    </div>
  );
};

export default ListSection;
