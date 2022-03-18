import React, { VFC } from "react";
type Props = {
  url?: string;
};

const placeholderURL = "./placeholder.png";

const Sprite: VFC<Props> = ({ url = placeholderURL }) => {
  return (
    <div className="absolute -translate-y-40">
      <img
        style={{ maxWidth: 240, maxHeight: 240, objectFit: "contain" }}
        src={url}
        alt="pokemon artwork"
      />
    </div>
  );
};

export default Sprite;
