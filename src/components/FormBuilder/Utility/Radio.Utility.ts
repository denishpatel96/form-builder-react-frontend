import { IRadioProps } from "../Types";

export const getRadioProps: Function = (
  elementId: string | number,
  elementCount: number
): IRadioProps => {
  return {
    fieldType: elementId,
    colSpan: 12,
    hidden: false,
    id: `input_radio_${elementCount}`,
    title: "",
    name: `input_radio_${elementCount}`,
    error: false,
    helperText: "",
    row: false,
    defaultValue: "",
    label: `Radio Group ${elementCount}`,
    required: false,
    useCalcValues: false,
    size: "medium", // 'medium','small'
    options: ["option 1", "option 2", "option 3", "option 4"].map((o) => ({
      value: "",
      label: o,
    })),
  };
};
