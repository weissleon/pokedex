import React from "react";
import PokeBall from "src/assets/PokeBall";
import { motion } from "framer-motion";
type Props = {};

const LoadingOverlay = (props: Props) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-[7.5rem] h-[7.5rem]"
    >
      <PokeBall color="red" />
    </motion.div>
  );
};

export default LoadingOverlay;
