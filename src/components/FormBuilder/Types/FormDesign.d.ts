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
  pageColor: CSSProperties["backgroundColor"];
  formColor: CSSProperties["backgroundColor"];
  fontColor: CSSProperties["color"];
  inputBackgroundColor: CSSProperties["backgroundColor"];
  // Background Images
  pageImage: string | undefined | null;
  formImage: string | undefined | null;
  // Font Options
  fontFamily: CSSProperties["fontFamily"];
  fontSize: CSSProperties["fontSize"];
}
