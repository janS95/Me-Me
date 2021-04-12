import React, { Component } from "react";
import "../style/NavbarBottom.css";
class NavbarBottom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: "100%", borderTop: "1px solid #3D3D3D" }}>
        <div class="mobile-app-icon-bar">
          <i class="material-icons" aria-hidden="true">
            add
          </i>
        </div>
        <div class="mobile-app-icon-bar">
          <i class="material-icons" aria-hidden="true">
            people
          </i>
        </div>
        <div class="mobile-app-icon-bar">
          <i class="material-icons" aria-hidden="true">
            local_see
          </i>
        </div>
        <div class="mobile-app-icon-bar">
          <i class="material-icons" aria-hidden="true">
            search
          </i>
        </div>
        <div class="mobile-app-icon-bar material-icons">
          <i class="material-icons" aria-hidden="true">
            sentiment_very_dissatisfied
          </i>
        </div>
      </div>
    );
  }
}
export default NavbarBottom;
