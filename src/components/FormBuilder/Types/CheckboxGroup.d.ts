import { CheckboxProps, FormControlProps, FormGroupProps } from "@mui/material";
import { IFieldProps, ISelectableOptionProps } from "./Common";

export interface ICheckboxGroupProps extends IFieldProps {
  title: string;
  error: FormControlProps["error"];
  helperText: string;
  row: FormGroupProps["row"];
  required: FormControlProps["required"];
  size: CheckboxProps["size"];
  options: ISelectableOptionProps[];
  useCalcValues: boolean;
}
