import React from "react";
import s from "./Main.module.scss";

const Main: React.FC = (props): JSX.Element => {
  return <main className={s.main}>{props.children}</main>;
};

export default Main;
