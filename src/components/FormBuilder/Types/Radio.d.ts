import {
  FormControlProps,
  FormHelperTextProps,
  FormLabelProps,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";

export interface IRadioOptionProps {
  value: string | number;
  label: string;
}

export interface IRadioProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  title: RadioGroupProps["title"];
  name: string;
  error: FormControlProps["error"];
  helperText: FormHelperTextProps["children"];
  row: RadioGroupProps["row"];
  defaultValue?: RadioGroupProps["defaultValue"];
  value?: RadioGroupProps["value"];
  label: FormLabelProps["children"];
  required: FormControlProps["required"];
  size: RadioProps["size"];
  options: IRadioOptionProps[];
  useCalcValues: boolean;
}
