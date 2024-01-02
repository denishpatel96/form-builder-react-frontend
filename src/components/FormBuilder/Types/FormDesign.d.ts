import { PaletteOptions } from "@mui/material";
import { CSSProperties } from "react";

export interface IFormDesignProps {
  // Form Styles
  formWidth: number;
  verticalPadding: number;
  horizontalPadding: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  // Label Style
  labelFontWeight?: "normal" | "bold" | "bolder";
  labelColor?: CSSProperties["color"];
  // Color Scheme
  palette?: PaletteOptions;
  // Background Images
  pageBgImage?: string;
  pageBgColor?: CSSProperties["color"];
  formBgImage?: string;
  formBgColor?: CSSProperties["color"];
  // Font Options
  fontFamily?: CSSProperties["fontFamily"];
  fontSize?: CSSProperties["fontSize"];
}
