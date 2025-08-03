import { CheckboxProps, FormControlProps } from "@mui/material";
import { IFieldProps } from "./Common";

export interface ICheckboxProps extends IFieldProps {
  title: string;
  helperText: string;
  required: FormControlProps["required"];
  size: CheckboxProps["size"];
  defaultChecked: CheckboxProps["defaultChecked"];
}
