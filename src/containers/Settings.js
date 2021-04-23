import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";

import { lightTheme, darkTheme } from "../themes";
import { useTheme } from "@material-ui/core/styles";
const Settings = () => {

  const theme = useTheme();
  const [isDark, setDark] = useState(true);
  return (
    <>
      <Avatar
        style={{ float: "left", width: "10vw", height: "10vw" }}
        src="https://www.stuttgarter-zeitung.de/media.media.54ec38cb-61d6-407d-98f3-be2003eb33c5.original1024.jpg"
      ></Avatar>
      <div
        style={{
          display: "flex",
          width: "90vw",
          height: "10vw",
          color: theme.palette.font.main,
          alignItems: "center",
          fontSize: "calc(3.5vh + 1.5vw)",
        }}
      >
        Kitty
      </div>
      <div style={{ height: "10%", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
            height: "100%",
            float: "left",
            color: theme.palette.font.main,
            fontSize: "calc(3.5vh + 1.5vw)",
          }}
          class="material-icons"
        >
          search
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            float: "left",
            width: "80%",
            height: "100%",
            color: theme.palette.font.main,
          }}
        >
          Account
        </div>
        <button
          onClick={() => {
            if (localStorage.getItem("theme") === "darkTheme") {
              localStorage.setItem("theme", "lightTheme");
              setDark(false);
              window.location.reload();
            } else {
              localStorage.setItem("theme", "darkTheme");
              setDark(true);
              window.location.reload();
            }
          }}
        >
          CLICK ME
        </button>
      </div>
    </>
  );
};

export default Settings;
