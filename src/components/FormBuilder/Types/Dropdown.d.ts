import { FormControlProps, SelectProps } from "@mui/material";
import { IFieldProps, ISelectableOptionProps } from "./Common";

export interface IDropdownProps extends IFieldProps {
  title: string;
  variant: "top" | "standard" | "outlined" | "filled";
  error: FormControlProps["error"];
  helperText: string;
  required: FormControlProps["required"];
  size: SelectProps["size"];
  options: ISelectableOptionProps[];
  useCalcValues: boolean;
  autoWidth: boolean;
  native: boolean;
  multiple: boolean;
  // readOnly:boolean;
  // disabled: boolean;
}
