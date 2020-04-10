import React from "react";
import Logo from "../../assets/logo.svg";
import s from "./Header.module.scss";

const Header: React.FC = (): JSX.Element => {
  return (
    <header className={s.header}>
      <img src={Logo} alt="themoviedb_logo" />
    </header>
  );
};

export default Header;
