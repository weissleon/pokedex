import React from "react";
import PokeBall from "src/assets/PokeBall";

type Props = {};

const LoadingOverlay = (props: Props) => {
  return (
    <div className="absolute w-40 h-40 -translate-y-20">
      <PokeBall color="red" />
    </div>
  );
};

export default LoadingOverlay;
