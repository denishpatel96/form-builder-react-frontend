import React, { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import shape from "./shape";
import palette, { paletteDark } from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import mixins from "./mixins";
import { cloneDeep, merge } from "lodash";

export const getTheme = (customThemeOptions: ThemeOptions = {}): Theme => {
  const defaultPalette =
    customThemeOptions.palette?.mode === "dark" ? cloneDeep(paletteDark) : cloneDeep(palette);
  const themeOptions: ThemeOptions = {
    palette: merge(defaultPalette, customThemeOptions?.palette),
    shape,
    typography,
    mixins,
  };

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  return theme;
};

export default function ThemeConfig({ children }: { children: ReactNode }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
