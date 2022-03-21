import { VFC, useCallback } from "react";

type Props = {
  onClick?: () => void;
};

const DrawerToggle: VFC<Props> = ({ onClick = () => {} }) => {
  const drawerText = "LIST";

  const handleOnClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div
      style={{
        writingMode: "vertical-lr",
        textOrientation: "sideways",
      }}
      onClick={handleOnClick}
      className="mt-4 flex justify-center items-center z-20 w-12 h-16 shadow-sm font-extrabold text-primary bg-white/50 backdrop-blur-md rounded-r-lg"
    >
      {drawerText}
    </div>
  );
};

export default DrawerToggle;
