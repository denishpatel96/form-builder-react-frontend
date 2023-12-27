// import { ICheckboxProps } from "./Checkbox";
// import { IDropdownProps } from "./Dropdown";
// import { IRadioProps } from "./Radio";
// import { IShortTextProps } from "./ShortText";
// import { IComboboxProps } from "./Combobox";
// import { ISliderProps } from "./Slider";
// import { ILongTextProps } from "./LongText";
// import { ICheckboxGroupProps } from "./CheckboxGroup";
// import { IHeadingProps } from "./Heading";

export interface ISelectableOptionProps {
  defaultChecked: boolean;
  value: string | number;
  label: string;
}

export interface IFieldProps {
  fieldType: string | number;
  id: string;
  name: string;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  label: string;
}

// export type IFieldProps =
//   | IHeadingProps
//   | IShortTextProps
//   | ILongTextProps
//   | IRadioProps
//   | ICheckboxProps
//   | ICheckboxGroupProps
//   | IDropdownProps
//   | IComboboxProps
//   | ISliderProps;
