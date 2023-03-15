import { FormControlProps, FormHelperTextProps, FormLabelProps, SelectProps } from "@mui/material";

export interface IDropdownOptionProps {
  defaultChecked: boolean;
  value: string | number;
  label: string;
}

export interface IDropdownProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  title: FormControlProps["title"];
  name: string;
  variant: SelectProps["variant"];
  error: FormControlProps["error"];
  helperText: FormHelperTextProps["children"];
  label: FormLabelProps["children"];
  required: FormControlProps["required"];
  size: SelectProps["size"];
  options: IDropdownOptionProps[];
  useCalcValues: boolean;
  autoWidth: boolean;
  native: boolean;
  multiple: boolean;
  // readOnly:boolean;
  // disabled: boolean;
}
