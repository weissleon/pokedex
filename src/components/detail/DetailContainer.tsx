import React, { ReactNode, VFC } from "react";

type Props = {
  children?: ReactNode;
  isTablet?: boolean;
};

const DetailContainer: VFC<Props> = ({ children = null, isTablet = false }) => {
  return (
    <div
      className={`relative ${
        isTablet ? "min-w-detail-tablet h-80" : "min-w-detail-mobile h-100"
      } flex flex-col items-center w-full bg-white/90 rounded-md gap-y-8 px-4`}
    >
      {children}
    </div>
  );
};

export default DetailContainer;
