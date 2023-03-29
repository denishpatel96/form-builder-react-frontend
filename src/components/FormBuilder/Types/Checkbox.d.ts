import { CheckboxProps, FormControlProps, FormGroupProps } from "@mui/material";
import { ISelectableOptionProps } from "./Common";

export interface ICheckboxProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  title: string;
  name: string;
  error: FormControlProps["error"];
  helperText: string;
  row: FormGroupProps["row"];
  label: string;
  required: FormControlProps["required"];
  size: CheckboxProps["size"];
  options: ISelectableOptionProps[];
  useCalcValues: boolean;
}
