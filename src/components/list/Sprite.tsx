import { VFC } from "react";
import { useImageRes } from "src/hooks/useImageRes";

type Props = { url?: string };

const placeholderURL = "./placeholder.png";

const Sprite: VFC<Props> = ({ url = placeholderURL }) => {
  const iconImage = useImageRes(url);

  return (
    <img
      src={iconImage}
      style={{
        maxWidth: 60,
        maxHeight: 60,
        imageRendering: "pixelated",
      }}
      alt="icon"
    />
  );
};

export default Sprite;
