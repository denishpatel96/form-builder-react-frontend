import { FORM_ELEMENTS } from "../../../constants";
import { IDropdownProps } from "../Types";

export const getDropdownProps: Function = (elementCount: number): IDropdownProps => {
  return {
    fieldType: FORM_ELEMENTS.DROPDOWN,
    colSpan: 12,
    hidden: false,
    variant: "outlined",
    id: `q${elementCount}`,
    title: "",
    name: `q${elementCount}`,
    error: false,
    helperText: "",
    label: `Dropdown label`,
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
