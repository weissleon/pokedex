import React, { VFC } from "react";
import { useImageRes } from "src/hooks/useImageRes";
type Props = {
  url?: string;
};

const placeholderURL = "./placeholder.png";

const Sprite: VFC<Props> = ({ url = placeholderURL }) => {
  const artworkImage = useImageRes(url);

  return (
    <div className="absolute -translate-y-40">
      <img
        style={{ maxWidth: 240, maxHeight: 240, objectFit: "contain" }}
        src={artworkImage}
        alt="pokemon artwork"
      />
    </div>
  );
};

export default Sprite;
