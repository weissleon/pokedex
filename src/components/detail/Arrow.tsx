import React, { VFC, MouseEvent } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
type Props = {
  direction?: "left" | "right";
  onClick?: (event: MouseEvent) => void;
};

const Arrow: VFC<Props> = ({ direction = "left", onClick = () => {} }) => {
  const Element = direction === "left" ? IoChevronBack : IoChevronForward;

  function handleOnClick(event: MouseEvent) {
    onClick(event);
  }

  return (
    <Element
      className="cursor-pointer text-gray-800/50"
      onClick={handleOnClick}
      size={60}
    />
  );
};

export default Arrow;
