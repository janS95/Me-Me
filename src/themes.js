import { ThemeOptions, createMuiTheme } from '@material-ui/core';

export const lightTheme =createMuiTheme({
  palette: {
    primary: {
      light: '#dd0000',
      main: '#dd0000',
      dark: '#008fcc'
    },
    secondary: {
      light: '#FF1476',
      main: '#CC137A',
      dark: '#B3116B'
    }
}
   
});

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#01FFFF',
      main: '#00ff00',
      dark: '#000D80'
    },
    secondary: {
      light: '#FF61BE',
      main: '#00ff00',
      dark: '#EF0888'
    },
   
  },
});