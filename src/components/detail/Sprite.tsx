import React, { VFC } from "react";
import { useImageRes } from "src/hooks/useImageRes";
import { motion, Variants } from "framer-motion";
type Props = {
  url?: string;
};

const placeholderURL = "./placeholder.png";

const mainVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

const Sprite: VFC<Props> = ({ url = placeholderURL }) => {
  const artworkImage = useImageRes(url);

  return (
    <motion.div
      variants={mainVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute -translate-y-40"
    >
      <img
        style={{ maxWidth: 240, maxHeight: 240, objectFit: "contain" }}
        src={artworkImage}
        alt="pokemon artwork"
      />
    </motion.div>
  );
};

export default Sprite;
