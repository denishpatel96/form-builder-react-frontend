import { IDropdownProps } from "../Types";

export const getDropdownProps: Function = (
  elementId: string | number,
  elementCount: number
): IDropdownProps => {
  return {
    fieldType: elementId,
    colSpan: 12,
    hidden: false,
    variant: "outlined",
    id: `select_${elementCount}`,
    title: "",
    name: `select_${elementCount}`,
    error: false,
    helperText: "",
    label: `Dropdown ${elementCount}`,
    required: false,
    useCalcValues: false,
    size: "medium", // 'medium','small'
    options: ["option 1", "option 2", "option 3", "option 4"].map((o) => ({
      defaultChecked: false,
      value: "",
      label: o,
    })),
    native: false,
    multiple: false,
    autoWidth: false,
  };
};
