import { FORM_ELEMENTS } from "../../../constants";
import { ICheckboxProps } from "../Types";

export const getCheckboxProps: Function = (elementCount: number): ICheckboxProps => {
  return {
    fieldType: FORM_ELEMENTS.CHECKBOX,
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
