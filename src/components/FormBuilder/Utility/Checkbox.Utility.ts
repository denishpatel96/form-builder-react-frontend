import { ICheckboxProps } from "../Types";

export const getCheckboxProps: Function = (
  elementId: string | number,
  elementCount: number
): ICheckboxProps => {
  return {
    fieldType: elementId,
    colSpan: 12,
    hidden: false,
    id: `cb_${elementCount}`,
    title: "",
    name: `cb_${elementCount}`,
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
