import { FormControlProps, TextFieldProps } from "@mui/material";
import { ISelectableOptionProps } from "./Common";

export interface IComboboxProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  title: string;
  name: string;
  variant: TextFieldProps["variant"];
  error: FormControlProps["error"];
  helperText: string;
  label: string;
  required: FormControlProps["required"];
  size: TextFieldProps["size"];
  options: ISelectableOptionProps[];
  useCalcValues: boolean;
  multiple: boolean;
  // readOnly:boolean;
  // disabled: boolean;
}
