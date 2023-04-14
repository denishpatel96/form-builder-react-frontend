import { IFormDesignProps } from "../Types";

export const getFormDesignProps: Function = (): IFormDesignProps => {
  return {
    // Form Styles
    formWidth: 700,
    verticalPadding: 24,
    horizontalPadding: 24,
    horizontalSpacing: 24,
    verticalSpacing: 24,
    // Label Style
    labelFontWeight: "normal",
    labelColor: "blue",
    // Background Images
    pageImage: "",
    formImage: "",
    // Font Options
    fontFamily: "inherit",
    fontSize: 16,
  };
};
