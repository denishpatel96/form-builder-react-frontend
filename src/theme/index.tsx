import React, { ReactNode, useMemo } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
import shape from "./shape";
import palette from "./palette";
import paletteDark from "./paletteDark";
import typography from "./typography";
import componentsOverride from "./overrides";
import { shadows, shadowsDark, customShadows, customShadowsDark } from "./shadows";
import mixins from "./mixins";
import { THEME } from "../constants";

export default function ThemeConfig({ children }: { children: ReactNode }) {
  let mode = THEME.LIGHT;

  const themeOptions = useMemo(
    () => ({
      palette: mode && mode === THEME.DARK ? paletteDark : palette,
      shape,
      typography,
      shadows: mode && mode === THEME.DARK ? shadowsDark : shadows,
      customShadows: mode && mode === THEME.DARK ? customShadowsDark : customShadows,
      mixins,
    }),
    [mode]
  );

  const theme = createTheme(themeOptions);
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
