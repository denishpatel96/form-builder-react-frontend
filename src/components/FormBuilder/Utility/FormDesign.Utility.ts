import { IFormDesignProps } from "../Types";

export const getFormDesignProps: Function = (): IFormDesignProps => {
  return {
    // Form Styles
    formWidth: 700,
    verticalPadding: 2,
    horizontalPadding: 2,
    horizontalSpacing: 2,
    verticalSpacing: 2,
    // Label Style
    labelFontWeight: "normal",
    labelColor: "blue",
    // Color Scheme
    pageColor: "black",
    formColor: "grey",
    fontColor: "black",
    inputBackgroundColor: "white",
    // Background Images
    pageImage: null,
    formImage: null,
    // Font Options
    fontFamily: "inherit",
    fontSize: 16,
  };
};
