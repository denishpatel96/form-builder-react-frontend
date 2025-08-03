import { FORM_ELEMENTS } from "../../../constants";
import { ISliderProps } from "../Types";

export const getSliderProps: Function = (elementCount: number): ISliderProps => {
  return {
    fieldType: FORM_ELEMENTS.SLIDER,
    colSpan: 12,
    hidden: false,
    id: `q${elementCount}`,
    title: "",
    name: `q${elementCount}`,
    helperText: "",
    label: `Slider label`,
    size: "medium", // 'medium','small',
    min: 0,
    max: 100,
    step: undefined,
    showMarks: true,
    showCustomMarks: true,
    customMarks: [0, 25, 50, 75, 100].map((v) => ({ value: v, label: `${v}` })),
    defaultValue: 25,
    valueLabelDisplay: "auto",
    track: "normal",
    valueLabelFormat: {
      prefix: "",
      suffix: "",
    },
  };
};
