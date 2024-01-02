import { ThemeOptions } from "@mui/material";
import { STANDARD_HEIGHT } from "../constants";

const mixins: ThemeOptions["mixins"] = {
  toolbar: {
    minHeight: STANDARD_HEIGHT,
  },
};

const typography: ThemeOptions["typography"] = {
  fontFamily: "'Noto Sans', sans-serif",
  button: {
    textTransform: "none",
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#b9b6d9",
      contrastText: "#000000",
    },
    secondary: {
      main: "#e3a3c8",
      contrastText: "#000000",
    },
    background: {
      default: "#444444",
      paper: "#333333",
    },
  },
  mixins,
  typography,
};

export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#484b6a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#d34f9b",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#333333",
      disabled: "#555555",
    },
    background: {
      default: "#e4e5f1",
      paper: "#f5f5f5",
    },
  },
  mixins,
  typography,
};
