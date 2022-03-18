import React, { VFC, ReactNode, useRef, useEffect, forwardRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

type Props = { children?: ReactNode; onEndReached?: () => void };
const Container = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children = null, onEndReached = () => {} } = props;

  return (
    <SimpleBar
      style={{
        maxHeight: "100vh",
      }}
      scrollableNodeProps={{ ref: ref }}
    >
      <div className="flex flex-col py-4 pl-2 pr-8 gap-y-2">{children}</div>
    </SimpleBar>
  );
});

Container.displayName = "Container";
export default Container;
