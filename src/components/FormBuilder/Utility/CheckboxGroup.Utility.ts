import { FORM_ELEMENTS } from "../../../constants";
import { ICheckboxGroupProps } from "../Types";

export const getCheckboxGroupProps: Function = (elementCount: number): ICheckboxGroupProps => {
  return {
    fieldType: FORM_ELEMENTS.CHECKBOX_GROUP,
    colSpan: 12,
    hidden: false,
    id: `q${elementCount}`,
    title: "",
    name: `q${elementCount}`,
    error: false,
    helperText: "",
    row: true,
    label: `Checkbox group label`,
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
