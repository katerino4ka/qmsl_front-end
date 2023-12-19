import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from './Routes/App'
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme , responsiveFontSizes} from "@mui/material/styles";

let themeDark = createTheme( {
  palette: {
    background: {
      default: "#E3E3E3"
    },
    text: {
      primary: "#5B5D6E",

    },
    primary: {
      main: '#5DBAE1',
    }
  },
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    button: {
      fontWeight: 600,
      color: 'white',
    },
  
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        title: {
        },
      },
    },
    MuiButton:{
      styleOverrides:{
        contained:{
          color: 'white',
          margin: '5%'
        }
      }
    }
    ,
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: 'white'
        },
      }
    },
    MuiIconButton:{
      styleOverrides:{
        root:{
        }
      }
    },
    MuiPaper:{
      styleOverrides: {
        root: {
          borderRadius: '18px',
          background: 'whitesmoke'
        },
    },
  },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '18px'
        },
      },
      components: {
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: 'grey'
            },
          }
        }
      },
    },
  }
});

themeDark = responsiveFontSizes(themeDark);
createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={themeDark}>
    <CssBaseline />
    <App />

  </ThemeProvider>
);