import { ReactNode, VFC } from "react";

type Props = {
  children?: ReactNode;
  isTablet?: boolean;
};

const PropertyContainer: VFC<Props> = ({
  children = null,
  isTablet = false,
}) => {
  return (
    <div
      className={`"relative grid items-center w-full ${
        isTablet ? "grid-cols-3" : "grid-rows-3 gap-y-2"
      } justify-items-center"`}
    >
      {children}
    </div>
  );
};

export default PropertyContainer;
