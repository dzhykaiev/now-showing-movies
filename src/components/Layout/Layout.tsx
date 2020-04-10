import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Cards from "../Cards/Cards";
import Title from "../Title/Title";

const Layout: React.FC = (): JSX.Element => {
  return (
    <>
      <Header>Header</Header>

      <div className="container">
        <Title />
        <div className="content">
          <Sidebar />
          <Main>
            <Cards />
          </Main>
        </div>
      </div>

      <Footer>Footer</Footer>
    </>
  );
};

export default Layout;
