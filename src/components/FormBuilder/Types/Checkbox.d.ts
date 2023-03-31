import { CheckboxProps, FormControlProps } from "@mui/material";

export interface ICheckboxProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  title: string;
  name: string;
  helperText: string;
  label: string;
  required: FormControlProps["required"];
  size: CheckboxProps["size"];
  defaultChecked: CheckboxProps["defaultChecked"];
}
