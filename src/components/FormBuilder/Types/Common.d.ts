import { ICheckboxProps } from "./Checkbox";
import { IDropdownProps } from "./Dropdown";
import { IRadioProps } from "./Radio";
import { ITextProps } from "./Text";
import { IComboboxProps } from "./Combobox";
import { ISliderProps } from "./Slider";

//string | number | number[] | boolean | null
export interface IFieldPropertiesChangeFunc {
  (path: string, value: any): void;
}

export interface ISelectableOptionProps {
  defaultChecked: boolean;
  value: string | number;
  label: string;
}

export type FieldProps =
  | ITextProps
  | IRadioProps
  | ICheckboxProps
  | IDropdownProps
  | IComboboxProps
  | ISliderProps;
