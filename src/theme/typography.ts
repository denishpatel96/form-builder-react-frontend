// ----------------------------------------------------------------------

import { ThemeOptions } from "@mui/material";

function pxToRem(value: number) {
  return `${value / 16}rem`;
}

const FONT_PRIMARY = "'Open Sans', sans-serif";

export const typography: ThemeOptions["typography"] = {
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
    fontSize: pxToRem(10),
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: "0.875rem",
    textTransform: "none",
  },
};
