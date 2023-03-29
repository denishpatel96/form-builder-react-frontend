import { lighten } from "@mui/material";

const PRIMARY = {
  main: "#ddd",
  contrastText: "#111",
};
const SECONDARY = {
  main: lighten("#d34f9b", 0.25),
  contrastText: "#000",
};

const paletteDark = {
  mode: "dark",
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  background: { default: lighten("#333", 0.15), paper: "#333" },
};

export default paletteDark;
