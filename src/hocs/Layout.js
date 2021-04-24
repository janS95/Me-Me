import React, { useEffect } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../actions/auth";
import { useTheme } from "@material-ui/core/styles";

const Layout = ({ checkAuthenticated, load_user, children }) => {
  const theme = useTheme();

  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ height: "7vh", background: theme.palette.primary.main }}>
        <NavbarTop />
      </div>
      <div style={{ height: "86vh", background: theme.palette.primary.main }}>
        {children}
      </div>
      <div style={{ height: "7vh", background: theme.palette.primary.main }}>
        <NavbarBottom />
      </div>
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
