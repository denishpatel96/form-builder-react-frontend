import {
  CheckboxProps,
  FormControlProps,
  FormGroupProps,
  FormHelperTextProps,
  FormLabelProps,
} from "@mui/material";

export interface ICheckboxOptionProps {
  defaultChecked: boolean;
  value: string | number;
  label: string;
}

export interface ICheckboxProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  title: FormControlProps["title"];
  name: string;
  error: FormControlProps["error"];
  helperText: FormHelperTextProps["children"];
  row: FormGroupProps["row"];
  label: FormLabelProps["children"];
  required: FormControlProps["required"];
  size: CheckboxProps["size"];
  options: ICheckboxOptionProps[];
  useCalcValues: boolean;
}
