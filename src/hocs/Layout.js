import React, { useEffect } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../actions/auth";

const Layout = ({ checkAuthenticated, load_user, children }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ height: "5vh", background: "blue" }}>
        <NavbarTop />
      </div>
      <div style={{ height: "85vh", background: "green" }}>{children}</div>
      <div style={{ height: "10vh", background: "red" }}>
        <NavbarBottom />
      </div>
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
