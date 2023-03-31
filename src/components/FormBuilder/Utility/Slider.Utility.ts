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
    step: undefined,
    showMarks: true,
    showCustomMarks: true,
    customMarks: [0, 25, 50, 75, 100].map((v) => ({ value: v, label: `${v}` })),
    defaultValue: [10, 30],
    valueLabelDisplay: "auto",
    track: "normal",
    valueLabelFormat: {
      prefix: "",
      suffix: "",
    },
  };
};
