import React, { ReactNode, useMemo } from "react";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import { shadows, customShadows, ICustomShadows } from "./shadows";
import mixins from "./mixins";
import { Shape } from "@mui/system";

interface IShape extends Shape {
  borderRadiusMd: number;
  borderRadiusSm: number;
}
export interface ITheme extends Theme {
  customShadows: ICustomShadows;
  shape: IShape;
}

export interface IThemeOptions extends ThemeOptions {
  customShadows: ICustomShadows;
  shape: IShape;
}

export default function ThemeConfig({ children }: { children: ReactNode }) {
  const themeOptions: IThemeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
      mixins,
    }),
    []
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
