export type Pokemon = {
  index: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    icon: string;
    portrait: string;
  };
  types: string[];
};
