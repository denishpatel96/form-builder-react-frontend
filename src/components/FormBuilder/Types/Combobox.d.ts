import {
  FormControlProps,
  FormHelperTextProps,
  FormLabelProps,
  TextFieldProps,
} from "@mui/material";

export interface IComboboxOptionProps {
  defaultChecked: boolean;
  value: string | number;
  label: string;
}

export interface IComboboxProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  title: FormControlProps["title"];
  name: string;
  variant: TextFieldProps["variant"];
  error: FormControlProps["error"];
  helperText: FormHelperTextProps["children"];
  label: FormLabelProps["children"];
  required: FormControlProps["required"];
  size: TextFieldProps["size"];
  options: IComboboxOptionProps[];
  useCalcValues: boolean;
  multiple: boolean;
  // readOnly:boolean;
  // disabled: boolean;
}
