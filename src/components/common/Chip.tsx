import React, { ReactNode, VFC } from "react";
import { useColor } from "../../hooks/useColor";

type Props = {
  children?: ReactNode;
};

const Chip: VFC<Props> = ({ children }) => {
  const color = useColor(children as string);

  return (
    <div
      className={`relative w-12 h-8 px-11 py-5 ${color} rounded-full flex justify-center items-center text-white font-bold`}
    >
      {children}
    </div>
  );
};

export default Chip;
