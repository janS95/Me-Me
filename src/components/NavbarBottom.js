import React from "react";
import { useTheme } from "@material-ui/core/styles";

import "../style/NavbarBottom.css";

const NavbarBottom = () => {
  const theme = useTheme();

  return (
    <div style={{ height: "100%", borderTop: "1px solid #3D3D3D" }}>
      <div class="mobile-app-icon-bar">
        <i
          style={{ color: theme.palette.secondary.main }}
          class="material-icons"
          aria-hidden="true"
        >
          add
        </i>
      </div>
      <div class="mobile-app-icon-bar">
        <i
          style={{ color: theme.palette.secondary.main }}
          class="material-icons"
          aria-hidden="true"
        >
          people
        </i>
      </div>
      <div
        class="mobile-app-icon-bar"
        onClick={() => {
          window.location = "/";
        }}
      >
        <i
          style={{ color: theme.palette.secondary.main }}
          class="material-icons"
          aria-hidden="true"
        >
          local_see
        </i>
      </div>
      <div class="mobile-app-icon-bar">
        <i
          style={{ color: theme.palette.secondary.main }}
          class="material-icons"
          aria-hidden="true"
        >
          search
        </i>
      </div>
      <div
        class="mobile-app-icon-bar material-icons"
        onClick={() => {
          window.location = "/settings";
        }}
      >
        <i
          style={{ color: theme.palette.secondary.main }}
          class="material-icons"
          aria-hidden="true"
        >
          sentiment_very_dissatisfied
        </i>
      </div>
    </div>
  );
};

export default NavbarBottom;
