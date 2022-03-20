import React from "react";

type Props = {};

const Background = (props: Props) => {
  return (
    <div
      className="absolute inset-0 bg-white/20 rounded-r-lg"
      style={{
        boxShadow: "inset -4px 2px 20px 0px #ffffff22",
      }}
    />
  );
};

export default Background;
