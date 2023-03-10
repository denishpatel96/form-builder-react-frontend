import { ICheckboxProps } from "../Types";

export const getCheckboxProps: Function = (
  elementId: string | number,
  elementCount: number
): ICheckboxProps => {
  return {
    fieldType: elementId,
    colSpan: 12,
    hidden: false,
    id: `input_checkbox_${elementCount}`,
    title: "",
    name: `input_checkbox_${elementCount}`,
    error: false,
    helperText: "",
    row: false,
    label: `Checkbox Group ${elementCount}`,
    required: false,
    useCalcValues: false,
    size: "medium", // 'medium','small'
    options: ["option 1", "option 2", "option 3", "option 4"].map((o) => ({
      defaultChecked: false,
      value: "",
      label: o,
    })),
  };
};
