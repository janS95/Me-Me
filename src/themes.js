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
  },
});
