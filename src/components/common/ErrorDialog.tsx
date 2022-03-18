import React from "react";

type Props = {};

const ErrorDialog = (props: Props) => {
  return (
    <div className="bg-white rounded-lg p-4 w-80 h-40 flex justify-center items-center">
      {"Oops... Something went wrong"}
    </div>
  );
};

export default ErrorDialog;
