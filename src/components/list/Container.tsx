import React, { VFC, ReactNode, useRef, useEffect } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

type Props = { children?: ReactNode; onEndReached?: () => void };
const Container: VFC<Props> = ({
  children = null,
  onEndReached = () => {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!endRef.current) return;

    let callback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) onEndReached();
    };

    let options: IntersectionObserverInit = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(endRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <SimpleBar
      style={{
        maxHeight: "100vh",
      }}
      scrollableNodeProps={{ ref: containerRef }}
    >
      <div className="flex flex-col gap-y-2 py-4 pl-2 pr-8">{children}</div>
      <span ref={endRef} />
    </SimpleBar>
  );
};

export default Container;
