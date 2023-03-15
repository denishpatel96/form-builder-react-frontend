import { ICheckboxProps } from "./Checkbox";
import { IDropdownProps } from "./Dropdown";
import { IRadioProps } from "./Radio";
import { ITextProps } from "./Text";

//string | number | number[] | boolean | null
export interface IFieldPropertiesChangeFunc {
  (path: string, value: any): void;
}

export type FieldProps = ITextProps | IRadioProps | ICheckboxProps | IDropdownProps;
