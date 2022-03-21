import React, { VFC } from "react";

type Props = {
  isTablet?: boolean;
};

const Background: VFC<Props> = ({ isTablet = false }) => {
  return (
    <div
      className={`absolute inset-0 ${
        isTablet ? "bg-white/20" : "bg-white/50"
      } rounded-r-lg backdrop-blur-md`}
      style={{
        boxShadow: "inset -4px 2px 20px 0px #ffffff22",
      }}
    />
  );
};

export default Background;
