import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import Avatar from "@material-ui/core/Avatar";
import { lightTheme, darkTheme } from "../themes";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "../style/Settings.css";

const Settings = () => {
  const { setTheme } = useContext(ThemeContext);
  const [isDark, setIsDark] = useState(false);
  const theme = useTheme();
  const useStyles = makeStyles({
    active: {
      "&:active": {
        backgroundColor: theme.palette.active.main,
      },
    },
  });
  const classes = useStyles();
  useEffect(() => {
    if (localStorage.getItem("theme") === "darkTheme") {
      setIsDark(true);
    }
  });

  const handleChange = () => {
    if (isDark) {
      localStorage.setItem("theme", "lightTheme");
      setTheme(lightTheme);
      setIsDark(false);
    } else {
      localStorage.setItem("theme", "darkTheme");
      setTheme(darkTheme);
      setIsDark(true);
    }
  };

  return (
    <>
      <div
        style={{
          paddingTop: "5vh",
          marginBottom: "10vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            float: "left",
            width: "10vh",
            height: "10vh",
            marginLeft: "15vw",
          }}
          src="https://www.stuttgarter-zeitung.de/media.media.54ec38cb-61d6-407d-98f3-be2003eb33c5.original1024.jpg"
        ></Avatar>
        <div
          style={{
            display: "flex",
            width: "60vw",
            height: "10vh",
            paddingLeft: "5vw",
            color: theme.palette.font.main,
            alignItems: "center",
            fontSize: "calc(3.5vh + 1.5vw)",
          }}
        >
          Kitty
        </div>
      </div>
      <div className={`settings-container ${classes.active}`}>
        <div
          className="material-icons settings-inner-icon"
          style={{
            color: theme.palette.font.main,
          }}
        >
          person
        </div>
        <div
          className="settings-inner-text"
          style={{ color: theme.palette.font.main }}
        >
          Account
        </div>
        <div
          className="settings-inner-caption"
          style={{ color: theme.palette.font.main }}
        >
          Profil, Datenschutz, Sicherheit
        </div>
      </div>
      <div className={`settings-container ${classes.active}`}>
        <div
          className="material-icons settings-inner-icon"
          style={{ color: theme.palette.font.main }}
        >
          notifications
        </div>
        <div
          className="settings-inner-text"
          style={{ color: theme.palette.font.main }}
        >
          Benachrichtigungen
        </div>
        <div
          className="settings-inner-caption"
          style={{ color: theme.palette.font.main }}
        >
          Lorem, ipsum dolor.
        </div>
      </div>
      <div className={`settings-container ${classes.active}`}>
        <div
          className="material-icons settings-inner-icon"
          style={{ color: theme.palette.font.main }}
        >
          info
        </div>
        <div
          className="settings-inner-text"
          style={{ color: theme.palette.font.main }}
        >
          Info
        </div>
        <div
          className="settings-inner-caption"
          style={{ color: theme.palette.font.main }}
        >
          Hilfe, Version, Kontaktiere uns
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: theme.palette.border.main,
          paddingLeft: "15vw",
          width: "100vw",
          height: "10vh",
          marginTop: "10vh",
        }}
      >
        <div style={{ width: "10vw", height: "100%", float: "left" }}>
          <FormControlLabel
            style={{
              justifyContent: "left",
              width: "10vw",
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
            control={
              <Switch
                checked={isDark}
                onChange={handleChange}
                name="checkedA"
              />
            }
          />
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            float: "left",
            alignItems: "center",
            paddingLeft: "10vw",
            color: theme.palette.font.main,
          }}
        >
          Dark Mode
        </div>
      </div>
    </>
  );
};

export default Settings;
