import React, { useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";

import "../style/NavbarBottom.css";

const NavbarBottom = () => {
  const theme = useTheme();
  useEffect(() => {
    const icons = document.querySelectorAll("div.mobile-app-icon-bar");
    switch (window.location.pathname) {
      case "/":
        icons.forEach(
          (icon) => (icon.firstChild.style.color = theme.palette.secondary.main)
        );
        icons[2].firstChild.style.color = theme.palette.highlight.main;
        icons[2].style.pointerEvents = "none";
        break;
      case "/settings":
        icons.forEach(
          (icon) => (icon.firstChild.style.color = theme.palette.secondary.main)
        );
        icons[4].firstChild.style.color = theme.palette.highlight.main;
        icons[4].style.pointerEvents = "none";
        break;
      default:
        break;
    }
  });

  return (
    <div
      style={{
        height: "100%",
        borderTop: "1px solid",
        borderColor: theme.palette.border.main,
      }}
    >
      <div className="mobile-app-icon-bar">
        <i
          style={{ color: theme.palette.secondary.main }}
          className="material-icons"
          aria-hidden="true"
        >
          add
        </i>
      </div>
      <div className="mobile-app-icon-bar">
        <i
          style={{ color: theme.palette.secondary.main }}
          className="material-icons"
          aria-hidden="true"
        >
          people
        </i>
      </div>
      <div
        className="mobile-app-icon-bar"
        onClick={() => {
          window.location = "/";
        }}
      >
        <i
          style={{ color: theme.palette.secondary.main }}
          className="material-icons"
          aria-hidden="true"
        >
          local_see
        </i>
      </div>
      <div className="mobile-app-icon-bar">
        <i
          style={{ color: theme.palette.secondary.main }}
          className="material-icons"
          aria-hidden="true"
        >
          search
        </i>
      </div>
      <div
        className="mobile-app-icon-bar material-icons"
        onClick={() => {
          window.location = "/settings";
        }}
      >
        <i
          style={{ color: theme.palette.secondary.main }}
          className="material-icons"
          aria-hidden="true"
        >
          sentiment_very_dissatisfied
        </i>
      </div>
    </div>
  );
};

export default NavbarBottom;
