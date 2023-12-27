import { FormControlProps, TextFieldProps } from "@mui/material";
import { IFieldProps, ISelectableOptionProps } from "./Common";

export interface IComboboxProps extends IFieldProps {
  title: string;
  variant: TextFieldProps["variant"];
  error: FormControlProps["error"];
  helperText: string;
  required: FormControlProps["required"];
  size: TextFieldProps["size"];
  options: ISelectableOptionProps[];
  useCalcValues: boolean;
  multiple: boolean;
  // readOnly:boolean;
  // disabled: boolean;
}
