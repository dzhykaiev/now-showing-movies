import React from "react";
interface Props {
  click: () => void;
}
const Button: React.FC<Props> = (props): JSX.Element => {
  const clickHandler = () => {
    props.click();
  };
  return (
    <button className="btn__full" onClick={clickHandler}>
      {props.children}
    </button>
  );
};

export default Button;
