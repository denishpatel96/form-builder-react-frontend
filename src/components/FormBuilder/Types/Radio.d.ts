import {
  FormControlProps,
  FormHelperTextProps,
  FormLabelProps,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";
import { IFieldProps } from "./Common";

export interface IRadioOptionProps {
  value: string | number;
  label: string;
}

export interface IRadioProps extends IFieldProps {
  title: string;
  error: FormControlProps["error"];
  helperText: string;
  row: RadioGroupProps["row"];
  defaultValue?: RadioGroupProps["defaultValue"];
  value?: RadioGroupProps["value"];
  required: FormControlProps["required"];
  size: RadioProps["size"];
  options: IRadioOptionProps[];
  useCalcValues: boolean;
}
