import { ThemeOptions } from "@mui/material";
import { STANDARD_HEIGHT } from "../constants";
import { typography } from "./typography";

const shape: ThemeOptions["shape"] = {
  borderRadius: 8,
};

const mixins: ThemeOptions["mixins"] = {
  toolbar: {
    minHeight: STANDARD_HEIGHT,
  },
};

const breakpoints: ThemeOptions["breakpoints"] = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
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

  shape,
  typography,
  breakpoints,
};

export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3F3B6C",
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
      default: "#f8f8f8",
      paper: "#ffffff",
    },
  },
  shape,
  mixins,
  typography,
  breakpoints,
};
