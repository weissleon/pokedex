import React, { ReactNode, VFC } from "react";

type Props = {
  children?: ReactNode;
  isTablet?: boolean;
};

const LayoutContainer: VFC<Props> = ({ children = null, isTablet = false }) => {
  return (
    <div
      className={`relative min-w-min max-w-7xl h-full grid ${
        isTablet ? "grid-cols-card-tablet" : "grid-cols-card-mobile"
      } gap-x-8 content-center items-center`}
    >
      {children}
    </div>
  );
};

export default LayoutContainer;
