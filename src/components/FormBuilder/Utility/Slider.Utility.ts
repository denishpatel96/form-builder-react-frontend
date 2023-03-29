import { ISliderProps } from "../Types";

export const getSliderProps: Function = (
  elementId: string | number,
  elementCount: number
): ISliderProps => {
  return {
    fieldType: elementId,
    colSpan: 12,
    hidden: false,
    id: `slider_${elementCount}`,
    title: "",
    name: `slider_${elementCount}`,
    helperText: "",
    label: `Slider ${elementCount}`,
    size: "medium", // 'medium','small',
    min: 0,
    max: 100,
    step: 10,
    showMarks: true,
    showCustomMarks: false,
    customMarks: [],
    defaultValue: [10, 25],
    valueLabelDisplay: "auto",
    track: "normal",
    valueLabelFormat: {
      prefix: "",
      suffix: "",
    },
  };
};
