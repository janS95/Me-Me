import { createMuiTheme } from "@material-ui/core";

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#1F1F1F",
    },
    secondary: {
      main: "#957FEF",
    },
    font: {
      main: "#CFCBCA",
    },
    highlight: {
      main: "#68A4D9",
    },
    active: {
      main: "#303030",
    },
    border: {
      main: "#3d3d3d",
    },
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#F6F6F6",
    },
    secondary: {
      main: "#7180AC",
    },
    font: {
      main: "#433633",
    },
    highlight: {
      main: "#FF934F",
    },
    active: {
      main: "#e5e5e5",
    },
    border: {
      main: "#d4d4d4",
    },
  },
});
