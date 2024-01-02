import React, { ReactNode } from "react";
import { CssBaseline, PaletteOptions } from "@mui/material";
import { ThemeProvider, createTheme, StyledEngineProvider, Theme } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./themes";
import { componentsOverride } from "./componentsOverride";
import { cloneDeep, merge } from "lodash";

export const getCustomTheme = (customPalette: PaletteOptions): Theme => {
  let themeOptions = customPalette.mode === "dark" ? cloneDeep(darkTheme) : cloneDeep(lightTheme);
  themeOptions.palette = merge(themeOptions.palette, customPalette);
  const customTheme = createTheme(themeOptions);
  customTheme.components = componentsOverride(customTheme);
  return customTheme;
};

export default function ThemeConfig({ children }: { children: ReactNode }) {
  const theme = createTheme(lightTheme);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
