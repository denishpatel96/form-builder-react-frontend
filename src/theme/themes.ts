import { ThemeOptions } from "@mui/material";
import { STANDARD_HEIGHT } from "../constants";

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

const FONT_PRIMARY = "'Open Sans', sans-serif";

const typography: ThemeOptions["typography"] = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 300,
  fontWeightMedium: 400,
  fontWeightBold: 500,
  h1: {
    fontWeight: 400,
    fontSize: "2.5rem",
  },
  h2: {
    fontWeight: 400,
    fontSize: "2.25rem",
  },
  h3: {
    fontWeight: 400,
    fontSize: "2rem",
  },
  h4: {
    fontWeight: 400,
    fontSize: "1.75rem",
  },
  h5: {
    fontWeight: 400,
    fontSize: "1.5rem",
  },
  h6: {
    fontWeight: 400,
    fontSize: "1.375rem",
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.375,
    fontSize: "1rem",
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 1.375,
    fontSize: "1rem",
  },
  body1: {
    fontWeight: 400,
    lineHeight: 1.25,
    fontSize: "0.875rem",
  },
  body2: {
    fontWeight: 300,
    lineHeight: 1.25,
    fontSize: "0.875rem",
  },
  caption: {
    fontWeight: 300,
    lineHeight: 1.5,
    fontSize: "0.75rem",
  },
  overline: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: "0.875rem",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: "0.875rem",
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
  mixins,
  typography,
  breakpoints,
};
