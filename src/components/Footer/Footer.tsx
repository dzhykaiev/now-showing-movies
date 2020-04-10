import React from "react";
import Logo from "../../assets/logo.svg";
import s from "./Footer.module.scss";

const Footer: React.FC = (props): JSX.Element => {
  return (
    <footer className={s.footer}>
      <img src={Logo} alt="themoviedb_logo" />
    </footer>
  );
};

export default Footer;
