import React, { ReactNode, VFC } from "react";

type Props = {
  children?: ReactNode;
};

const LayoutContainer: VFC<Props> = ({ children = null }) => {
  return (
    <div className="relative min-w-min max-w-7xl h-full grid grid-cols-[auto_1fr_auto] gap-x-8 content-center items-center">
      {children}
    </div>
  );
};

export default LayoutContainer;
