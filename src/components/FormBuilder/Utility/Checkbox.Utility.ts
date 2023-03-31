import { ICheckboxProps } from "../Types";

export const getCheckboxProps: Function = (
  elementId: string | number,
  elementCount: number
): ICheckboxProps => {
  return {
    fieldType: elementId,
    colSpan: 12,
    hidden: false,
    id: `q${elementCount}`,
    title: "",
    name: `q${elementCount}`,
    label: `Checkbox label`,
    required: false,
    size: "medium", // 'medium','small'
    defaultChecked: false,
    helperText: "",
  };
};
