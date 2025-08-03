import { TextFieldProps } from "@mui/material";
import { IFieldProps } from "./Common";

export interface ILongTextProps extends IFieldProps {
  defaultValue: string;
  value?: string;
  title?: string;
  helperText?: string;
  placeholder?: string;
  minRows: TextFieldProps["minRows"];
  maxRows: TextFieldProps["maxRows"];
  margin: TextFieldProps["margin"];
  size: TextFieldProps["size"];
  type: TextFieldProps["type"];
  variant: "top" | "standard" | "outlined" | "filled";
  required: TextFieldProps["required"];
  // Length Validation
  validateLength: boolean;
  minLength: number;
  maxLength: number;
  msgLength: string;
}
