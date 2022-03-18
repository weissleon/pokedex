import React, { ReactNode, VFC } from "react";

type Props = {
  children?: ReactNode;
};

const DetailContainer: VFC<Props> = ({ children = null }) => {
  return (
    <div className="relative bg-red-400 flex justify-center items-center">
      {children}
    </div>
  );
};

export default DetailContainer;
