import { IComboboxProps } from "../Types";

export const getComboboxProps: Function = (
  elementId: string | number,
  elementCount: number
): IComboboxProps => {
  return {
    fieldType: elementId,
    colSpan: 12,
    hidden: false,
    variant: "outlined",
    id: `combo_${elementCount}`,
    title: "",
    name: `combo_${elementCount}`,
    error: false,
    helperText: "",
    label: `Combobox ${elementCount}`,
    required: false,
    useCalcValues: false,
    size: "medium", // 'medium','small'
    options: ["option 1", "option 2", "option 3", "option 4"].map((o) => ({
      defaultChecked: false,
      value: "",
      label: o,
    })),
    multiple: false,
  };
};
