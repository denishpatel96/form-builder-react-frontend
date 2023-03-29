import { FormControlProps, SelectProps } from "@mui/material";
import { ISelectableOptionProps } from "./Common";

export interface IDropdownProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  title: string;
  name: string;
  variant: SelectProps["variant"];
  error: FormControlProps["error"];
  helperText: string;
  label: string;
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
