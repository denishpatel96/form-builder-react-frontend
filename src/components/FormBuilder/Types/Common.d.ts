import { ICheckboxProps } from "./Checkbox";
import { IDropdownProps } from "./Dropdown";
import { IRadioProps } from "./Radio";
import { IShortTextProps } from "./ShortText";
import { IComboboxProps } from "./Combobox";
import { ISliderProps } from "./Slider";
import { ILongTextProps } from "./LongText";
import { ICheckboxGroupProps } from "./CheckboxGroup";

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
  | IShortTextProps
  | ILongTextProps
  | IRadioProps
  | ICheckboxProps
  | ICheckboxGroupProps
  | IDropdownProps
  | IComboboxProps
  | ISliderProps;
