import { useRef, VFC, useEffect, Suspense } from "react";
import { Pokemon } from "../..//types/Pokemon";
import Background from "./Background";
import Container from "./Container";
import Item from "./Item";

const offset = 16;

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
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!selectedItemRef.current) return;

    const container = containerRef.current;
    const selectedItem = selectedItemRef.current;

    const { y: itemY, height: itemH } = selectedItem.getBoundingClientRect();
    const { y: containerY, height: containerH } =
      container.getBoundingClientRect();

    const isAbove = itemY - containerY < 0;
    const isBelow = itemY + itemH > containerH;

    if (isAbove) {
      container.scrollBy({
        behavior: "smooth",
        top: itemY - containerY - offset,
      });
    }

    if (isBelow) {
      container.scrollBy({
        behavior: "smooth",
        top: offset + (itemY + itemH) - containerH,
      });
    }
    return () => {};
  }, [currentIndex]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!endRef.current) return;

    let callback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) onEndReached();
    };

    let options: IntersectionObserverInit = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(endRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  function handleOnItemClick(index: number) {
    onItemClick(index);
  }

  const itemList = pokemons.map((pokemon, index) => (
    <Item
      ref={index === currentIndex ? selectedItemRef : null}
      key={pokemon.index}
      pokemon={pokemon}
      onClick={handleOnItemClick}
      isSelected={currentIndex === index}
    />
  ));

  return (
    <div className="relative w-full h-full ">
      <Background />
      <Container ref={containerRef} onEndReached={onEndReached}>
        {itemList}
        <span ref={endRef} />
      </Container>
    </div>
  );
};

export default ListSection;
