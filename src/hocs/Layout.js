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
      <div style={{ height: "7vh", background: "#1F1F1F" }}>
        <NavbarTop />
      </div>
      <div style={{ height: "86vh", background: "#1F1F1F" }}>{children}</div>
      <div style={{ height: "7vh", background: "#1F1F1F" }}>
        <NavbarBottom />
      </div>
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
