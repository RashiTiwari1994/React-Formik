import React from "react";

const TextError = (props) => {
  return <div className="error text-red-500">{props.children}</div>;
};

export default TextError;
