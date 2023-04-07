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
  labelFontWeight: "normal" | "bold" | "bolder";
  labelColor: CSSProperties["color"];
  // Color Scheme
  palette?: PaletteOptions;
  // Background Images
  pageImage: string | undefined | null;
  formImage: string | undefined | null;
  // Font Options
  fontFamily: CSSProperties["fontFamily"];
  fontSize: CSSProperties["fontSize"];
}
