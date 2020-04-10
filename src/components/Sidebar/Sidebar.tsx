import React from "react";
import s from "./Sidebar.module.scss";
import SortBy from "../../containers/SortBy/SortBy";
import FilterByGenre from "../../containers/FilterByGenre/FilterByGenre";
import UserScore from "../../containers/UserScore/UserScore";

const Sidebar = () => {
  return (
    <aside className={s.sidebar}>
      <SortBy />
      <FilterByGenre />
      <UserScore />
    </aside>
  );
};

export default Sidebar;
