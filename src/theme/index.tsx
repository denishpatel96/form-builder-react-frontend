import React, { ReactNode } from "react";
import { CssBaseline, PaletteOptions } from "@mui/material";
import { ThemeProvider, createTheme, StyledEngineProvider, Theme } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./themes";
import { componentsOverride } from "./componentsOverride";
import { merge } from "lodash";
import { useAppSelector } from "../store/hooks";

export const getTheme = (mode?: "dark" | "light"): Theme => {
  const theme = mode === "dark" ? createTheme(darkTheme) : createTheme(lightTheme);
  theme.components = componentsOverride(theme);
  return theme;
};

export const getCustomTheme = (customPalette: PaletteOptions): Theme => {
  let themeOptions = customPalette.mode === "dark" ? darkTheme : lightTheme;
  themeOptions.palette = merge(themeOptions.palette, customPalette);
  const customTheme = createTheme(themeOptions);
  customTheme.components = componentsOverride(customTheme);
  return customTheme;
};

export default function ThemeConfig({ children }: { children: ReactNode }) {
  const themeMode = useAppSelector((state) => state.signal.themeMode);

  React.useEffect(() => {
    console.log("theme mode changed", themeMode);
  }, [themeMode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
